document.addEventListener('DOMContentLoaded', () => {
    function updateSerialNumbers() {
        document.querySelectorAll('.history-table tbody tr').forEach((row, index) => {
            row.querySelector('td').textContent = index + 1;
        });
    }

    document.querySelectorAll('.delete-row').forEach(function(element) {
        element.addEventListener('click', function() {
            const del = confirm('Are you sure you want to delete this row?');
            if (del) {
                this.closest('tr').remove();
                updateSerialNumbers(); 
            }
            alert('Successfully deleted the row');

        });
    });

    updateSerialNumbers();
});

document.querySelectorAll('.edit-row').forEach(function(element) {
    element.addEventListener('click', function() {
        window.location.href="../html/contractorinvoicefilleddata.html";
    });
});
