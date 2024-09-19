// Function to add a new row to the table
var rowCount=0;
function addRow() {
    const table = document.getElementById('descriptionTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    rowCount=rowCount+1;
    
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4); // Add a cell for the delete button

    cell1.innerHTML = '<input type="text" placeholder="enter item">';
    cell2.innerHTML = '<input type="number" placeholder="enter price" oninput="updateTotal(this)">';
    cell3.innerHTML = '<input type="number" placeholder="enter qty" oninput="updateTotal(this)">';
    cell4.innerHTML = '₹0';
    cell5.innerHTML = '<button class="delete-row"><i class="fa-solid fa-trash"></i></button>'; // Add delete button

    // Add event listener to the delete button
    cell5.querySelector('.delete-row').addEventListener('click', function() {
        // Show a confirmation dialog before deletion
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
    rowCount=rowCount-1;
}

// Prevent non-letter characters and manage spaces for Contractor Name input
document.getElementById('receivedFrom').addEventListener('input', function(e) {
    let value = this.value;
    // Remove any non-letter characters except spaces
    value = value.replace(/[^a-zA-Z\s]/g, '');
    // Remove leading spaces and replace multiple spaces with a single space
    value = value.replace(/^\s+/, '');
    value = value.replace(/\s{2,}/g, ' ');
    this.value = value;
});

// Prevent non-letter characters and manage spaces for Customer Name input
document.getElementById('billToName').addEventListener('input', function(e) {
    let value = this.value;
    // Remove any non-letter characters except spaces
    value = value.replace(/[^a-zA-Z\s]/g, '');
    // Remove leading spaces and replace multiple spaces with a single space
    value = value.replace(/^\s+/, '');
    value = value.replace(/\s{2,}/g, ' ');
    this.value = value;
});

// Prevent non-letter characters and manage spaces for Address input
document.getElementById('addressFrom').addEventListener('input', function(e) {
    let value = this.value;
    // Remove leading spaces
    value = value.replace(/^\s+/, '');
    // Allow letters, numbers, special characters, and spaces in between, but not leading spaces
    value = value.replace(/\s{2,}/g, ' '); // Replace multiple spaces with a single space
    this.value = value;
});

document.getElementById('billToAddress').addEventListener('input', function(e) {
    let value = this.value;
    // Remove leading spaces
    value = value.replace(/^\s+/, '');
    // Allow letters, numbers, special characters, and spaces in between, but not leading spaces
    value = value.replace(/\s{2,}/g, ' '); // Replace multiple spaces with a single space
    this.value = value;
});

document.getElementById('gst').addEventListener('input', function(e) {
    let value = this.value;
    // Remove all spaces
    value = value.replace(/\s+/g, '');
    // Allow only uppercase letters and numbers, and remove any other characters
    value = value.replace(/[^a-zA-Z0-9]/g, '');
    // Set the value to uppercase
    this.value = value.toUpperCase();
});
document.getElementById('mobile').addEventListener('input', function(e) {
    let value = this.value;
    // Remove all spaces (leading and in-between)
    value = value.replace(/\s+/g, '');
    // Allow only numbers, and remove any non-digit characters
    value = value.replace(/[^0-9]/g, '');
    this.value = value;
});

document.getElementById('authorisedSignature').addEventListener('input', function(e) {
    let value = this.value;
    // Remove leading spaces
    value = value.replace(/^\s+/, '');
    // Allow only letters and spaces between words, remove numbers and special characters
    value = value.replace(/[^a-zA-Z\s]/g, '');
    // Replace multiple spaces with a single space
    value = value.replace(/\s{2,}/g, ' ');
    this.value = value;
});


// Regex patterns for validation
const tinPattern = /^[0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
const gstPattern = /^[0-9A-Z]{1,}$/;
const textPattern = /^[A-Za-z]+[A-Za-z\s]*$/;
const addressPattern = /^(?!^\s)(?:[A-Za-z0-9]+[\w\s]*[A-Za-z0-9])$/;
const authSign = /^[A-Za-z]+[A-Za-z\s]*$/;
const mobilePattern = /^\d{10}$/;

// Capitalize GST input
document.getElementById('gst').addEventListener('input', function() {
    this.value = this.value.toUpperCase(); // Capitalize input
});

// Allow only numbers for TIN input
document.getElementById('vat').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9-]/g, ''); // Only allow numbers and hyphens
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
    
    const tinInput = document.getElementById('vat');
    const receiptInput = document.getElementById('receipt');
    const contractorNameInput = document.getElementById('receivedFrom');
    const gstInput = document.getElementById('gst');
    const addressFromInput = document.getElementById('addressFrom');
    const customerNameInput = document.getElementById('billToName');
    const mobileInput = document.getElementById('mobile');
    const billToAddressInput = document.getElementById('billToAddress');
    const paymentModeInputs = document.querySelectorAll('input[name="paymentMode"]');
    const paymentError = document.getElementById('paymentError');
    const authorisedSignatureInput = document.getElementById('authorisedSignature');

    // TIN validation
    if (!tinPattern.test(tinInput.value)) {
        setBorder(tinInput, false);
        isValid = false;
    } else {
        setBorder(tinInput, true);
    }

    // Receipt number validation
    if (!receiptInput.value) {
        setBorder(receiptInput, false);
        isValid = false;
    } else {
        setBorder(receiptInput, true);
    }

    // Contractor name validation
    if (!textPattern.test(contractorNameInput.value)) {
        setBorder(contractorNameInput, false);
        isValid = false;
    } else {
        setBorder(contractorNameInput, true);
    }

    // Address From validation
    if (!addressFromInput.value.trim()) {
        setBorder(addressFromInput, false);
        isValid = false;
    } else {
        setBorder(addressFromInput, true);
    }

    // Bill To Address validation
    if (!billToAddressInput.value.trim()) {
        setBorder(billToAddressInput, false);
        isValid = false;
    } else {
        setBorder(billToAddressInput, true);
    }

    // GST validation
    if (!gstPattern.test(gstInput.value)) {
        setBorder(gstInput, false);
        isValid = false;
    } else {
        setBorder(gstInput, true);
    }

    // Customer name validation
    if (!textPattern.test(customerNameInput.value)) {
        setBorder(customerNameInput, false);
        isValid = false;
    } else {
        setBorder(customerNameInput, true);
    }

    // Mobile number validation
    if (!mobilePattern.test(mobileInput.value)) {
        setBorder(mobileInput, false);
        document.getElementById('mobileError').style.display = 'block';
        isValid = false;
    } else {
        setBorder(mobileInput, true);
        document.getElementById('mobileError').style.display = 'none';
    }

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
    if (isValid && rowCount>=1) {
        alert('Receipt Submitted');
        // Redirect to the next page
        window.location.href = "../html/contractorreceipthistory.html";
    } else {
        alert('Please fill out all required fields correctly.');
    }
});

// Get today's date in the required format (YYYY-MM-DD)
const today = new Date().toISOString().split('T')[0];

// Get the date input field
const dateInput = document.getElementById('date');

// Set both the min and max attributes to today's date to restrict it
dateInput.min = today;
dateInput.max = today;

// Pre-fill today's date in the input field
dateInput.value = today;

// Disable the input to prevent users from changing the date
dateInput.setAttribute('readonly', true);

