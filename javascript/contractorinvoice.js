// Add new row to the table
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
            alert("Successfully deleted the row");
            rowCount=rowCount-1;
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

function updateTotal(input) {
    const row = input.parentElement.parentElement;
    const price = parseFloat(row.cells[1].getElementsByTagName('input')[0].value) || 0;
    const qty = parseFloat(row.cells[2].getElementsByTagName('input')[0].value) || 0;
    const total = row.cells[3];

    const totalValue = price * qty;
    total.innerText = `₹${totalValue.toFixed(2)}`;

    updateTotals();
}

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

function deleteRow(button) {
    const row = button.parentElement.parentElement;
    row.remove();
    updateTotals();
}

// Form validation on submit
document.getElementById('submitBtn').addEventListener('click', function () {
    var requiredInputs = document.querySelectorAll('input[required]');
    var allFilled = true;

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

        if (input.id === 'receivedFrom' || input.id === 'billToName') {
            var nameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
            if (!nameRegex.test(input.value.trim())) {
                input.style.border = '1px solid red';
                allFilled = false;
                if (errorMessage) {
                    errorMessage.textContent = 'Only letters and spaces are allowed.';
                    errorMessage.style.display = 'inline';
                }
            }
        }

        if (input.id === 'gst') {
            var gstRegex = /^[A-Z0-9]{15}$/;
            input.value = input.value.toUpperCase();

            if (!gstRegex.test(input.value.trim())) {
                input.style.border = '1px solid red';
                allFilled = false;
                if (errorMessage) {
                    errorMessage.textContent = 'Invalid GST format. Must be 15 characters with capital letters and numbers.';
                    errorMessage.style.display = 'inline';
                }
            }
        }

        if (input.id === 'mobile') {
            var mobileRegex = /^[0-9]{10}$/;
            if (!mobileRegex.test(input.value.trim())) {
                input.style.border = '1px solid red';
                allFilled = false;
                if (errorMessage) {
                    errorMessage.style.display = 'inline';
                }
            }
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

    if (allFilled && rowCount>=1) {
        alert('Invoice Submitted');
        window.location.href = "../html/contractorinvoicehistory.html";
    } else {
        alert('Please fill out all required fields correctly.');
    }
});

// Restrict invalid characters during typing
document.getElementById('receivedFrom').addEventListener('input', function () {
    // Remove any leading spaces
    let value = this.value;
    if (value.startsWith(' ')) {
        value = value.replace(/^\s+/, ''); // Remove leading spaces
    }

    // Remove any characters that are not letters or spaces
    value = value.replace(/[^A-Za-z\s]/g, '');

    // Remove multiple spaces between words and ensure only single spaces
    value = value.replace(/\s{2,}/g, ' ');

    // Set the cleaned value back to the input
    this.value = value;
});

document.getElementById('billToName').addEventListener('input', function () {
    // Remove any leading spaces
    let value = this.value;
    if (value.startsWith(' ')) {
        value = value.replace(/^\s+/, ''); // Remove leading spaces
    }

    // Remove any characters that are not letters or spaces
    value = value.replace(/[^A-Za-z\s]/g, '');

    // Remove multiple spaces between words and ensure only single spaces
    value = value.replace(/\s{2,}/g, ' ');

    // Set the cleaned value back to the input
    this.value = value;
});


document.getElementById('authorisedSignature').addEventListener('input', function () {
    // Remove any leading spaces
    let value = this.value.trimStart(); // Removes leading spaces

    // Remove any characters that are not letters or spaces
    value = value.replace(/[^A-Za-z\s]/g, '');

    // Remove multiple spaces between words and ensure only single spaces
    value = value.replace(/\s{2,}/g, ' ');

    // Update the input value with the cleaned value
    this.value = value;
});


document.getElementById('gst').addEventListener('input', function () {
    // Remove any characters that are not letters or numbers
    let value = this.value.replace(/[^a-zA-Z0-9]/g, '');

    // Convert the value to uppercase
    value = value.toUpperCase();

    // Set the cleaned and uppercase value back to the input field
    this.value = value;
});


document.getElementById('mobile').addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
});

document.getElementById('addressFrom').addEventListener('input', function () {
    // Remove leading spaces
    let value = this.value.trimStart();

    // Allow numbers, special characters, and spaces (but only between text)
    value = value.replace(/[^A-Za-z0-9\s\p{P}]/gu, '');

    // Set the cleaned value back to the input field
    this.value = value;
});

document.getElementById('billToAddress').addEventListener('input', function () {
    // Remove leading spaces
    let value = this.value.trimStart();

    // Allow numbers, special characters, and spaces (but only between text)
    value = value.replace(/[^A-Za-z0-9\s\p{P}]/gu, '');

    // Set the cleaned value back to the input field
    this.value = value;
});


// Set today's date in the date input and disable changes
// Get today's date in the required format (YYYY-MM-DD)
const today = new Date().toISOString().split('T')[0];

// Get the date input field
const dateInput = document.getElementById('date');

// Set the date value to today
dateInput.value = today;

// Disable the input to prevent users from changing the date
dateInput.setAttribute('disabled', true);

