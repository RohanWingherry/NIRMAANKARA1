// Function to add a new row to the table
var rowCount = 0;
function addRow() {
    const table = document.getElementById('descriptionTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    rowCount += 1;

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4); // Add a cell for the delete button

    cell1.innerHTML = '<input type="text" id="Item-name" placeholder="enter item">';
    cell2.innerHTML = '<input type="number" id="Enter-price" placeholder="enter price" oninput="updateTotal(this)">';
    cell3.innerHTML = '<input type="number" id="Item-quantity" placeholder="enter qty" oninput="updateTotal(this)">';
    cell4.innerHTML = '₹0';
    cell5.innerHTML = '<button class="delete-row"><i class="fa-solid fa-trash"></i></button>'; // Add delete button

    // Add event listener to the delete button
    cell5.querySelector('.delete-row').addEventListener('click', function() {
        const confirmDelete = confirm("Are you sure you want to delete this row?");
        if (confirmDelete) {
            deleteRow(this);
        }
    });

    updateTotals(); 
}

// Validate table rows
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

// Update total for a specific row
function updateTotal(input) {
    const row = input.parentElement.parentElement;
    const price = parseFloat(row.cells[1].getElementsByTagName('input')[0].value) || 0;
    const qty = parseFloat(row.cells[2].getElementsByTagName('input')[0].value) || 0;
    const total = row.cells[3];

    const totalValue = price * qty;
    total.innerText = `₹${totalValue.toFixed(2)}`;

    updateTotals();
}

// Update overall totals
function updateTotals() {
    const table = document.getElementById('descriptionTable').getElementsByTagName('tbody')[0];
    let subtotal = 0;

    // Calculate subtotal by iterating over each row
    for (let i = 0; i < table.rows.length; i++) {
        const row = table.rows[i];
        const total = parseFloat(row.cells[3].innerText.replace('₹', '')) || 0;
        subtotal += total;
    }

    // Get values from discount, SGST, and CGST inputs
    const discountPercent = parseFloat(document.getElementById('discountPercent').value) || 0;
    const sgstPercent = parseFloat(document.getElementById('sgst').value) || 0;
    const cgstPercent = parseFloat(document.getElementById('cgst').value) || 0;

    // Calculate discounts and taxes
    const discountAmount = subtotal * (discountPercent / 100);
    const sgstAmount = subtotal * (sgstPercent / 100);
    const cgstAmount = subtotal * (cgstPercent / 100);
    
    // Calculate total after applying discount and adding taxes
    const total = subtotal - discountAmount + sgstAmount + cgstAmount;

    // Update totals display
    document.getElementById('subtotal').innerText = `₹${subtotal.toFixed(2)}`;
    document.getElementById('sgstAmount').innerText = `₹${sgstAmount.toFixed(2)}`;
    document.getElementById('cgstAmount').innerText = `₹${cgstAmount.toFixed(2)}`;
    document.getElementById('total').innerText = `₹${total.toFixed(2)}`;
    document.getElementById('dueAmount').innerText = `₹${total.toFixed(2)}`;
}

// Delete a specific row
function deleteRow(button) {
    const row = button.parentElement.parentElement;
    row.remove();
    updateTotals();
    rowCount -= 1;
}

// Authorised signature input handling
document.getElementById('authorisedSignature').addEventListener('input', function(e) {
    let value = this.value;
    value = value.replace(/^\s+/, ''); // Remove leading spaces
    value = value.replace(/[^a-zA-Z\s]/g, ''); // Allow only letters and spaces
    value = value.replace(/\s{2,}/g, ' '); // Replace multiple spaces with a single space
    this.value = value;
});

// Utility to set border red or clear
function setBorder(input, isValid) {
    if (isValid) {
        input.style.border = '';
    } else {
        input.style.border = '1px solid red';
    }
}

// Validate form on submission
document.getElementById('submitBtn').addEventListener('click', function() {
    let isValid = true; // Define isValid variable here
    
    const paymentModeInputs = document.querySelectorAll('input[name="paymentMode"]');
    const paymentError = document.getElementById('paymentError');
    const authorisedSignatureInput = document.getElementById('authorisedSignature');
    const customerIdInput = document.getElementById('customer-id'); // Add customer ID input
    const authSign = /^[A-Za-z\s]+$/; // Regex for validating the signature

    // Payment mode validation
    let paymentSelected = false;
    for (const payment of paymentModeInputs) {
        if (payment.checked) {
            paymentSelected = true;
            break;
        }
    }
    if (!paymentSelected) {
        paymentError.style.display = 'block';
        isValid = false;
    } else {
        paymentError.style.display = 'none';
    }

    // Customer ID validation
    if (!customerIdInput.value.trim()) {
        setBorder(customerIdInput, false);
        isValid = false;
    } else {
        setBorder(customerIdInput, true);
    }

    // Authorized signature validation
    if (!authSign.test(authorisedSignatureInput.value)) {
        setBorder(authorisedSignatureInput, false);
        isValid = false;
    } else {
        setBorder(authorisedSignatureInput, true);
    }

    // Validate table rows
    if (!validateTableRows()) {
        isValid = false;
    }

    // Show alert and submit if valid
    if (isValid && rowCount >= 1) {
        alert('Receipt Submitted');
        // Redirect to the next page
        window.location.href = "../html/contractorreceipthistory.html";
    } else {
        alert('Please fill out all required fields correctly.');
    }
});

// Customer ID fetch details
document.getElementById("fetch-details").addEventListener("click", () => {
    const cust = document.getElementById("customer-id").value;
    if (cust) {
        document.querySelector(".main-client-det").style.display = "block";
    } else {
        alert("Enter the Customer-id");
    }
});

// Set today's date for date input
const dateInput = document.getElementById('dateInput');
const today = new Date().toISOString().split('T')[0]; 
dateInput.value = today;
dateInput.style.textAlign = 'center';
