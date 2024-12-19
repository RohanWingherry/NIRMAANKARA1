

document.addEventListener('DOMContentLoaded', () => {
    function updateSerialNumbers() {
        document.querySelectorAll('.history-table tbody tr').forEach((row, index) => {
            row.querySelector('td').textContent = index + 1;
        });
    }

    let rowsToDelete = []; // Track rows to be deleted

    // Show the custom delete popup
    function showDeletePopup(rows) {
        rowsToDelete = rows; // Save the rows reference
        const popup = document.getElementById('deletePopup');
        popup.style.display = 'block'; // Ensure popup is displayed
        popup.classList.remove('hide'); // Remove hide class
        popup.classList.add('show'); // Add show class
    }

    // Hide the custom delete popup
    function hideDeletePopup() {
        const popup = document.getElementById('deletePopup');
        popup.classList.remove('show'); // Remove show class
        popup.classList.add('hide'); // Add hide class

        // Delay removal to match exit animation duration
        setTimeout(() => {
            popup.style.display = 'none';
        }, 300); // Match CSS animation duration
    }

    // Handle delete button click for each row
    document.querySelectorAll('.delete-row').forEach(function (element) {
        element.addEventListener('click', function () {
            const row = this.closest('tr'); // Get the row to delete
            showDeletePopup([row]); // Pass the row to the popup for deletion
        });
    });

    // Handle delete confirmation
    document.getElementById('confirmDelete').addEventListener('click', function () {
        if (rowsToDelete.length > 0) {
            rowsToDelete.forEach(row => row.remove()); // Remove selected rows
            updateSerialNumbers(); // Update serial numbers
            rowsToDelete = []; // Clear the reference
        }
        hideDeletePopup(); // Hide the popup after action
    });

    // Handle cancel action for delete
    document.getElementById('cancelDelete').addEventListener('click', function () {
        rowsToDelete = []; // Clear the reference
        hideDeletePopup(); // Hide the popup without making changes
    });

    // Multi-delete functionality: delete multiple selected rows
    const multiDeleteBtn = document.getElementById('multiDelete');
    if (multiDeleteBtn) {
        multiDeleteBtn.addEventListener('click', function () {
            const selectedRows = Array.from(document.querySelectorAll('.row-checkbox:checked'))
                .map(checkbox => checkbox.closest('tr')); // Get rows for checked checkboxes

            if (selectedRows.length > 0) {
                showDeletePopup(selectedRows); // Pass selected rows to delete popup
            } else {
                showNotification('Please select rows to delete'); // Notify if no rows are selected
            }
        });
    }

    // Update serial numbers initially
    updateSerialNumbers();

    // Handle "view" button click
    // document.querySelectorAll('.edit-row').forEach(function(element) {
    //     element.addEventListener('click', function() {
    //         window.location.href = "../html/customerinvoice.html";
    //     });
    // });
});


document.querySelectorAll('.edit-row').forEach(function(element) {
    element.addEventListener('click', function() {
        window.location.href="../html/contractorreceiptfilleddata.html";
    });
});
