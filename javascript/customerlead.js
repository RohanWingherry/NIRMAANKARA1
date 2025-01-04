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

document.getElementById('orgDetailsForm').addEventListener('submit', function (event) {
    let isValid = true;

    const fields = [
        'fullnamelead',
        'mob',
        'constructions',
        'size',
        'address'
    ];

    fields.forEach(field => {
        const input = document.getElementById(field);
        input.classList.remove('error');
    });

    fields.forEach(field => {
        const input = document.getElementById(field);
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        }
    });

    const phoneInput = document.getElementById('mob');
    const phonePattern = /^[6-9]\d{9}$/;
    if (phoneInput.value && !phonePattern.test(phoneInput.value)) {
        phoneInput.classList.add('error');
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault();
        showNotification("Please fill in the required fields correctly.");
    } else {
        event.preventDefault();
        addDataToTable();
        showNotification("Your lead has been generated");
    }
});

// document.querySelectorAll('.delete-row').forEach(button => {
//     button.addEventListener('click', function (event) {
//         const row = event.target.closest('tr');
//         const confirmDelete = confirm("Are you sure you want to delete this lead?");
        
//         if (confirmDelete) {
//             row.remove();
//             updateSerialNumbers();
//         }
//     });
// });

function updateSerialNumbers() {
    const rows = document.querySelectorAll('.history-table tbody tr');
    
    rows.forEach((row, index) => {
        row.querySelector('td:first-child').textContent = index + 1;
    });
}

document.getElementById('constructions').addEventListener('change', function () {
    const otherTypeInput = document.getElementById('other-construction-type');
    if (this.value === 'Other') {
        otherTypeInput.style.display = 'block';
        document.getElementById('other-construction').setAttribute('required', 'required');
    } else {
        otherTypeInput.style.display = 'none';
        document.getElementById('other-construction').removeAttribute('required');
    }
});

// Function to add data to the table
function addDataToTable() {
    const fullnamelead = document.getElementById('fullnamelead').value;
    const mob = document.getElementById('mob').value;
    const constructionType = document.getElementById('constructions').value;
    const size = document.getElementById('size').value;
    const address = document.getElementById('address').value;

    let constructionTypeToDisplay = constructionType;
    if (constructionType === 'Other') {
        const otherConstructionType = document.getElementById('other-construction').value;
        constructionTypeToDisplay = otherConstructionType || constructionType;
    }

    const leadId = `L-${Date.now()}`;

    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedTableDate = `${day}-${month}-${year}`;

    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td></td>
        <td>${formattedTableDate}</td>
        <td>${leadId}</td>
        <td>${fullnamelead}</td>
        <td>${mob}</td>
        <td>${constructionTypeToDisplay}</td>
        <td>${size} SFT</td>
        <td>${address}</td>
        <td id="action">
            <i class="fa-regular fa-trash-can delete-row"></i>
        </td>
    `;

    document.querySelector('.history-table tbody').appendChild(newRow);

    updateSerialNumbers();

    // Reset the form after adding a row
    document.getElementById('orgDetailsForm').reset();
}

// DOMContentLoaded Event Listener
document.addEventListener('DOMContentLoaded', () => {
    let rowsToDelete = []; // Store rows pending deletion

    // Function to update serial numbers dynamically
    function updateSerialNumbers() {
        document.querySelectorAll('.history-table tbody tr').forEach((row, index) => {
            row.querySelector('td').textContent = index + 1;
        });
    }

    // Show delete confirmation popup
    function showDeletePopup(rows) {
        rowsToDelete = rows; // Save reference to rows
        const popup = document.getElementById('deletePopup');
        popup.style.display = 'block';
        popup.classList.remove('hide');
        popup.classList.add('show');
    }

    // Hide delete confirmation popup
    function hideDeletePopup() {
        const popup = document.getElementById('deletePopup');
        popup.classList.remove('show');
        popup.classList.add('hide');

        setTimeout(() => {
            popup.style.display = 'none';
        }, 300); // Match CSS animation duration
    }

    // **Event Delegation for delete button click**
    document.querySelector('.history-table tbody').addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-row')) {
            const row = event.target.closest('tr'); // Get the specific row
            showDeletePopup([row]); // Pass the row to delete popup
        }
    });

    // Confirm Deletion
    document.getElementById('confirmDelete').addEventListener('click', function () {
        if (rowsToDelete.length > 0) {
            rowsToDelete.forEach(row => row.remove()); // Remove rows
            updateSerialNumbers(); // Update serial numbers
            rowsToDelete = []; // Clear reference
        }
        hideDeletePopup(); // Hide popup
    });

    // Cancel Deletion
    document.getElementById('cancelDelete').addEventListener('click', function () {
        rowsToDelete = []; // Clear reference
        hideDeletePopup(); // Hide popup
    });

    // Multi-delete functionality
    const multiDeleteBtn = document.getElementById('multiDelete');
    if (multiDeleteBtn) {
        multiDeleteBtn.addEventListener('click', function () {
            const selectedRows = Array.from(document.querySelectorAll('.row-checkbox:checked'))
                .map(checkbox => checkbox.closest('tr'));

            if (selectedRows.length > 0) {
                showDeletePopup(selectedRows); // Show confirmation popup
            } else {
                showNotification('Please select rows to delete'); // Show notification if no rows selected
            }
        });
    }

    // Update serial numbers on initial load
    updateSerialNumbers();
});
