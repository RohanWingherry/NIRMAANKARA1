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
// Add new row to the table
function addRow() {
    const table = document.getElementById('descriptionTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    rowCount=rowCount+1;
    
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4); // Add a cell for the delete button

    cell1.innerHTML = '<input type="text" placeholder="enter item" class="enter-item" name="enter-item">';
    cell2.innerHTML = '<input type="number" placeholder="enter price" class="enter-price" name="enter-price" oninput="updateTotal(this)">';
    cell3.innerHTML = '<input type="number" placeholder="enter qty" class="enter-qty" name="enter-det" oninput="updateTotal(this)">';
    cell4.innerHTML = '₹0';
    cell5.innerHTML = '<button class="delete-row"><i class="fa-solid fa-trash"></i></button>'; // Add delete button

    // Add event listener to the delete button
    cell5.querySelector('.delete-row').addEventListener('click', function() {
        // Show a confirmation dialog before deletion
        const confirmDelete = confirm("Are you sure you want to delete this row?");
        if (confirmDelete) {
            deleteRow(this);
            showNotification("Successfully deleted the row");
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

    // Variables for Customer ID validation
    const customerID = document.getElementById("customer-id").value.trim();
    const customerDetailsVisible = document.querySelector(".main-client-det").style.display === "block";

    // Check Customer ID conditions
    if (!customerID) {
        showNotification("Please enter the Customer ID.");
        allFilled = false;
    } else if (!customerDetailsVisible) {
        showNotification("Please fetch the Customer ID details.");
        allFilled = false;
    }

    // Iterate over all required inputs for additional validations
    requiredInputs.forEach(function (input) {
        var errorMessage = document.getElementById(input.id + 'Error');

        // Reset the input's border and hide any previous error messages
        input.style.border = '';
        if (errorMessage) {
            errorMessage.style.display = 'none';
        }

        // Check if input value is empty
        if (input.value.trim() === '') {
            input.style.border = '1px solid red';
            allFilled = false;
        }

        // Special validation for 'authorisedSignature'
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

    // Check table rows if validation is required for them
    if (!validateTableRows()) {
        allFilled = false;
    }

    // Handle form submission based on validation
    if (allFilled) {
        showNotification('Invoice Submitted');
        window.location.href = "../html/contractorinvoicehistory.html";
    } else {
        // Notify specifically for Customer ID if it is not valid
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

    // Validate if customer ID is entered
    if (cust) {
        // Fetch customer details based on customer ID (Add your fetch logic here)
        fetchCustomerDetails(cust);

        // Show customer details section
        document.querySelector(".main-client-det").style.display = "block";

        // Show success notification
        showNotification("Customer details fetched successfully.");
    } else {
        // Show notification if customer ID is not entered
        showNotification("Please enter the Customer ID.");
    }
});




// Function to simulate fetching customer details
// function fetchCustomerDetails(customerId) {
//     // Simulate an API call or database query to fetch customer details
//     console.log(`Fetching details for customer ID: ${customerId}`);
//     // You can add actual fetching logic here as needed
// }


document.getElementById('authorisedSignature').addEventListener('input', function () {
    // Remove any leading spaces
    let value = this.value.trimStart(); // Removes leading spaces

    value = value.replace(/[^A-Za-z\s]/g, '');

    // Remove multiple spaces between words and ensure only single spaces
    value = value.replace(/\s{2,}/g, ' ');

    // Update the input value with the cleaned value
    this.value = value;
});
document.getElementById("fetch-details").addEventListener("click",()=>{
    const cust=document.getElementById("customer-id").value
    if(cust){
        document.querySelector(".main-client-det").style.display="block"
    }
    else{
        showNotification("Enter the Customer-id")
    }
  })
  const dateInput = document.getElementById('dateInput');
  const today = new Date().toISOString().split('T')[0]; 
  dateInput.value = today;
  dateInput.style.textAlign='center'

