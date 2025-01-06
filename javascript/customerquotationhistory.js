function showNotification(message, type = 'success') {
    const notification = document.getElementById('customNotification');
    const notificationMessage = document.getElementById('notificationMessage');
    const okButton = document.getElementById('okButton');
  
    notificationMessage.textContent = message;
  
    if (type === 'error') {
      notification.classList.add('error');
    } else {
      notification.classList.remove('error');
    }
  
    notification.style.display = 'block';
    setTimeout(() => {
      notification.style.opacity = '1';
    }, 10);
  
    okButton.addEventListener('click', function () {
      notification.style.opacity = '0';
      setTimeout(() => {
        notification.style.display = 'none';
      }, 500);
    });
  }
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
    document.querySelectorAll('.view').forEach(function (vieweach) {
        vieweach.addEventListener('click', function () {
            window.location.href = '../html/customerquotation.html';
        });
    });
});
document.getElementById('search').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default behavior of the anchor tag
    
    // Retrieve date values
    const fromDateValue = document.getElementById('fromdate').value;
    const toDateValue = document.getElementById('todate').value;

    if (!fromDateValue || !toDateValue) {
        showNotification('Please select both From Date and To Date.');
        return;
    }

    const fromDate = new Date(fromDateValue);
    const toDate = new Date(toDateValue);

    // Ensure valid date range
    if (fromDate > toDate) {
        showNotification('From Date cannot be after To Date. Please select a valid range.');
        return;
    }

    // Get all table rows
    const rows = document.querySelectorAll('.history-table tbody tr');

    let found = false; // To track if any rows match the filter

    rows.forEach(row => {
        const dateCell = row.children[1]?.textContent.trim(); // Safely access the date cell
        if (!dateCell) return; // Skip if the date cell is missing

        // Convert table date to valid format (assuming DD-MM-YYYY)
        const [day, month, year] = dateCell.split('-');
        const rowDate = new Date(`${year}-${month}-${day}`); // Convert to YYYY-MM-DD format

        // Check if rowDate falls within the range
        if (rowDate >= fromDate && rowDate <= toDate) {
            row.style.display = ''; // Show the row
            found = true;
        } else {
            row.style.display = 'none'; // Hide the row
        }
    });

    if (!found) {
        showNotification('No rows match the selected date range.');
    }
});
