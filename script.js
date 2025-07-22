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
