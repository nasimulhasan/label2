<script>
  let excelData = [];

  $('#excelFile').on('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      excelData = XLSX.utils.sheet_to_json(sheet, { defval: "" });

      const invoiceSet = new Set();
      excelData.forEach(row => {
        if (row["Invoice"]) invoiceSet.add(String(row["Invoice"]).trim());
      });

      const invoices = Array.from(invoiceSet).sort();
      const startSelect = $('#startInvoice');
      const endSelect = $('#endInvoice');

      startSelect.empty().append('<option value="">Select Start</option>');
      endSelect.empty().append('<option value="">Select End</option>');

      invoices.forEach(inv => {
        startSelect.append(`<option value="${inv}">${inv}</option>`);
        endSelect.append(`<option value="${inv}">${inv}</option>`);
      });

      console.log("✅ Invoice dropdowns populated:", invoices);
    };
    reader.readAsArrayBuffer(file);
  });
</script>

