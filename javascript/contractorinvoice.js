// Function to generate a unique ID based on a counter (1-digit prefix)
let idCounter = 1;

function generateUniqueId() {
    const uniqueId = `row-${idCounter}`;
    idCounter = (idCounter % 9) + 1;  // Keep the prefix between 1 and 9
    return uniqueId;  // Generates a unique ID with a 1-digit prefix
}

let rowToDelete = null;

// Show notification or pop-up
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

// Add a new row to the table
function addRow() {
    const table = document.getElementById('descriptionTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    
    // Generate a unique ID for the row
    const uniqueId = generateUniqueId();

    // Insert row with unique IDs for each input field
    newRow.innerHTML = `
        <td><input type="text" placeholder="enter item" class="enter-item" name="enter-item-${uniqueId}" id="item-${uniqueId}"></td>
        <td><input type="number" placeholder="enter price" class="enter-price" oninput="updateTotal(this)" name="enter-price-${uniqueId}" id="price-${uniqueId}"></td>
        <td><input type="number" placeholder="enter qty" class="enter-qty" oninput="updateTotal(this)" name="enter-qty-${uniqueId}" id="qty-${uniqueId}"></td>
        <td>₹0</td>
        <td><button class="delete-row"><i class="fa-solid fa-trash"></i></button></td>
    `;

    // Set the row's unique ID
    newRow.id = uniqueId;

    newRow.querySelector('.delete-row').addEventListener('click', function () {
        rowToDelete = this.closest('tr'); // Store the row to delete
        showPopup(); // Show the confirmation popup
    });
}

// Popup logic
const popupOverlay = document.querySelector('.popup-overlay');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');

function showPopup() {
    popupOverlay.classList.add('show');
}

function hidePopup() {
    popupOverlay.classList.remove('show');
}

confirmDeleteBtn.addEventListener('click', function () {
    if (rowToDelete) {
        rowToDelete.remove();
        rowToDelete = null;
        hidePopup();
        showNotification("Successfully deleted the row");
    }
});

cancelDeleteBtn.addEventListener('click', hidePopup);

// Function to update the total for each row based on the input values
function updateTotal(input) {
    const row = input.parentElement.parentElement;
    const price = parseFloat(row.cells[1].getElementsByTagName('input')[0].value) || 0;
    const qty = parseFloat(row.cells[2].getElementsByTagName('input')[0].value) || 0;
    const total = row.cells[3];

    const totalValue = price * qty;
    total.innerText = `₹${totalValue.toFixed(2)}`;

    updateTotals();
}

// Function to update the overall totals (subtotal, discount, etc.)
function updateTotals() {
    const table = document.getElementById('descriptionTable').getElementsByTagName('tbody')[0];
    let subtotal = 0;

    for (let i = 0; i < table.rows.length; i++) {
        const row = table.rows[i];
        const total = parseFloat(row.cells[3].innerText.replace('₹', '')) || 0;
        subtotal += total;
    }

    const discountPercent = parseFloat(document.getElementById('discountPercent').value) || 0;
    const sgstPercent = parseFloat(document.getElementById('sgst').value) || 0;
    const cgstPercent = parseFloat(document.getElementById('cgst').value) || 0;

    const discountAmount = subtotal * (discountPercent / 100);
    const sgstAmount = subtotal * (sgstPercent / 100);
    const cgstAmount = subtotal * (cgstPercent / 100);
    const total = subtotal - discountAmount + sgstAmount + cgstAmount;

    document.getElementById('subtotal').innerText = `₹${subtotal.toFixed(2)}`;
    document.getElementById('sgstAmount').innerText = `₹${sgstAmount.toFixed(2)}`;
    document.getElementById('cgstAmount').innerText = `₹${cgstAmount.toFixed(2)}`;
    document.getElementById('total').innerText = `₹${total.toFixed(2)}`;
    document.getElementById('dueAmount').innerText = `₹${total.toFixed(2)}`;
}

// Validate table rows for any missing values
function validateTableRows() {
    const rows = document.querySelectorAll('#descriptionTable tbody tr');
    let isValid = true;

    rows.forEach(row => {
        const itemInput = row.cells[0].querySelector('input');
        const priceInput = row.cells[1].querySelector('input');
        const qtyInput = row.cells[2].querySelector('input');

        if (!itemInput.value.trim() || !priceInput.value.trim() || !qtyInput.value.trim()) {
            itemInput.style.border = '1px solid red';
            priceInput.style.border = '1px solid red';
            qtyInput.style.border = '1px solid red';
            isValid = false;
        } else {
            itemInput.style.border = '';
            priceInput.style.border = '';
            qtyInput.style.border = '';
        }
    });

    return isValid;
}

// Form validation on submit
document.getElementById('submitBtn').addEventListener('click', function () {
    var requiredInputs = document.querySelectorAll('input[required]');
    var allFilled = true;

    const customerID = document.getElementById("customer-id").value.trim();
    const customerDetailsVisible = document.querySelector(".main-client-det").style.display === "block";

    if (!customerID) {
        showNotification("Please enter the Customer ID.");
        allFilled = false;
    } else if (!customerDetailsVisible) {
        showNotification("Please fetch the Customer ID details.");
        allFilled = false;
    }

    requiredInputs.forEach(function (input) {
        var errorMessage = document.getElementById(input.id + 'Error');

        input.style.border = '';
        if (errorMessage) {
            errorMessage.style.display = 'none';
        }

        if (input.value.trim() === '') {
            input.style.border = '1px solid red';
            allFilled = false;
        }

        if (input.id === 'authorisedSignature') {
            var nameRegex = /^[A-Za-z][A-Za-z\s]*$/;
            if (!nameRegex.test(input.value.trim())) {
                input.style.border = '1px solid red';
                allFilled = false;
                if (errorMessage) {
                    errorMessage.textContent = 'Only letters and spaces are allowed.';
                    errorMessage.style.display = 'inline';
                }
            }
        }
    });

    if (!validateTableRows()) {
        allFilled = false;
    }

    if (allFilled) {
        showNotification('Invoice Submitted');
        window.location.href = "../html/contractorinvoicehistory.html";
    } else {
        if (!customerID) {
            showNotification("Please enter the Customer ID.");
        } else if (!customerDetailsVisible) {
            showNotification("Please fetch the Customer ID details.");
        } else {
            showNotification('Please fill out all required fields correctly.');
        }
    }
});

// Event listener for fetching customer details
document.getElementById("fetch-details").addEventListener("click", () => {
    const cust = document.getElementById("customer-id").value.trim();

    if (cust) {
        fetchCustomerDetails(cust);
        document.querySelector(".main-client-det").style.display = "block";
        showNotification("Customer details fetched successfully.");
    } else {
        showNotification("Please enter the Customer ID.");
    }
});

// Function to simulate fetching customer details (you can replace it with actual fetching logic)
function fetchCustomerDetails(customerId) {
    console.log(`Fetching details for customer ID: ${customerId}`);
}

// Format the date input to today's date
const dateInput = document.getElementById('dateInput');
const today = new Date().toISOString().split('T')[0];
dateInput.value = today;
dateInput.style.textAlign = 'center';

// Clean up 'authorisedSignature' input field
document.getElementById('authorisedSignature').addEventListener('input', function () {
    let value = this.value.trimStart();
    value = value.replace(/[^A-Za-z\s]/g, '');
    value = value.replace(/\s{2,}/g, ' ');
    this.value = value;
});
