document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.delete-row').forEach(function(element) {
        element.addEventListener('click', function() {
            const del = confirm('Are you sure you want to delete this row?');
            if (del) {
                this.closest('tr').remove();
                updateSerialNumbers();
                alert("Successfully deleted the row");
            }
        });
    });

    document.querySelectorAll('.edit-row').forEach(function(element) {
        element.addEventListener('click', function() {
            window.location.href = "../html/customerreceipt.html";
        });
    });
});

function updateSerialNumbers() {
    const rows = document.querySelectorAll('.history-table tbody tr');
    rows.forEach((row, index) => {
        row.cells[0].textContent = index + 1;
    });
}
