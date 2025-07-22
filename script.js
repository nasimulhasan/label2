$(document).ready(function () {
  console.log("✅ JavaScript loaded");

  // Toggle between Excel and Manual input sections
  function toggleSections() {
    const mode = $('input[name="mode"]:checked').val();
    $('#excelSection').toggle(mode === 'excel');
    $('#manualSection').toggle(mode === 'manual');
  }

  $('input[name="mode"]').on('change', toggleSections);
  toggleSections(); // Run on load

  // Add new item row in manual form
  $('#addItem').on('click', function () {
    $('#itemList').append(`
      <div class="input-group mb-2">
        <input class="form-control item-name" placeholder="Item name">
        <input class="form-control item-qty" type="number" placeholder="Qty">
        <button class="btn btn-outline-secondary remove-item" type="button">×</button>
      </div>
    `);
  });

  // Remove item row in manual form
  $(document).on('click', '.remove-item', function () {
    $(this).closest('.input-group').remove();
  });
});
$('#excelFile').on('change', function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    const invoices = [...new Set(json.map(row => row["Invoice"]).filter(Boolean))];

    $('#invoiceSelect').empty();
    invoices.forEach(inv => {
      $('#invoiceSelect').append(`<option value="${inv}">${inv}</option>`);
    });

    // Save the full JSON for future use (like label generation)
    window.invoiceData = json;
    console.log("✅ Invoices loaded:", invoices);
  };
  reader.readAsArrayBuffer(file);
});

