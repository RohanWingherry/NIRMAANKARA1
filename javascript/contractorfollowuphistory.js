// notification or pop up
function showNotification(message, type = 'success') {
    const notification = document.getElementById('customNotification');
    const notificationMessage = document.getElementById('notificationMessage');
    const okButton = document.getElementById('okButton');

    notificationMessage.textContent = message;

    // Add error class if the type is 'error'
    if (type === 'error') {
        notification.classList.add('error');
    } else {
        notification.classList.remove('error');
    }

    // Show the notification with a fade-in effect
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.opacity = '1';  // Fade-in effect
    }, 10);

    // When "OK" button is clicked, hide the notification with a fade-out effect
    okButton.addEventListener('click', function () {
        notification.style.opacity = '0';  // Fade-out effect
        setTimeout(() => {
            notification.style.display = 'none';  // Ensure it's hidden after fading out
        }, 500);  // Wait for the transition duration before hiding completely
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
    // document.querySelectorAll('.edit-row').forEach(function(element) {
    //     element.addEventListener('click', function() {
    //         window.location.href = "../html/customerinvoice.html";
    //     });
    // });
});


document.addEventListener("DOMContentLoaded", function () {
    // Event listener for edit buttons
    document.querySelectorAll('.edit-row').forEach((btn, index) => {
        btn.addEventListener('click', function () {
            const row = btn.closest('tr');
            const cells = row.querySelectorAll('td');

            // Get the client status from the table row (assuming it's in the 6th column, index 5)
            const clientStatus = cells[5].innerText.trim();

            // Only allow editing if client status is "Accepted" or "Rescheduled"
            if (clientStatus === "Accepted" || clientStatus === "Rescheduled") {
                const record = {
                    sno: cells[0].innerText,
                    date: cells[1].innerText,
                    customerName: cells[2].innerText,
                    customerMob: cells[3].innerText,
                    contactMethod: cells[4].innerText,
                    clientStatus: clientStatus,
                    status: cells[6].innerText
                };

                // Store record in localStorage and redirect to the update page
                localStorage.setItem('record', JSON.stringify(record));
                window.location.href = '../html/contractorfollowupdate.html';
            } else {
                showNotification('You cannot edit this row as the client status is neither "Accepted" nor "Rescheduled".');
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Check for updated record and update the table row if found
    const updatedRecord = JSON.parse(localStorage.getItem('updatedRecord'));

    if (updatedRecord) {
        const rows = document.querySelectorAll('tbody tr');

        rows.forEach((row) => {
            const cells = row.querySelectorAll('td');
            if (cells[0].innerText === updatedRecord.sno) {
                cells[1].innerText = updatedRecord.date;
                cells[2].innerText = updatedRecord.customerName;
                cells[3].innerText = updatedRecord.customerMob;
                cells[4].innerText = updatedRecord.contactMethod;
                cells[5].innerText = updatedRecord.clientStatus;
                cells[6].innerText = updatedRecord.status;
            }
        });

        // Remove updated record from localStorage after updating
        localStorage.removeItem('updatedRecord');
    }
});
