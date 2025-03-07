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

document.getElementById('addRowBtn').addEventListener('click', function() {
    var table = document.getElementById('itemTable').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();

    var rowCount = table.rows.length;

    // Generate unique prefix for each row
    var uniquePrefix = 'row' + rowCount;

    var cell0 = newRow.insertCell(0); 
    var cell1 = newRow.insertCell(1);
    var cell2 = newRow.insertCell(2);
    var cell3 = newRow.insertCell(3);
    var cell4 = newRow.insertCell(4);
    var cell5 = newRow.insertCell(5);
    var cell6 = newRow.insertCell(6);
    var cell7 = newRow.insertCell(7);
    var cell8 = newRow.insertCell(8);
    var cell9 = newRow.insertCell(9);

    // Set ID for each cell's input field to be unique (suffix at the end)
    cell0.innerHTML = rowCount;  // Row number

    cell1.innerHTML = `<input type="text" id="materialName${uniquePrefix}" name="materialName" placeholder="Enter material name" required>`;
    cell2.innerHTML = `<input type="text" id="description${uniquePrefix}" name="description" placeholder="Enter description" required>`;
    cell3.innerHTML = `<input type="text" id="vendor${uniquePrefix}" name="vendor" placeholder="Enter vendor" required>`;
    cell4.innerHTML = `<input type="number" id="quantity${uniquePrefix}" name="quantity" class="quantity" oninput="calculateTotalCost(this)" placeholder="Enter quantity" required>`;
    cell5.innerHTML = `
        <select id="unitOfMeasure${uniquePrefix}" name="unitOfMeasure" required>
            <option value="kg">kg</option>
            <option value="tons">tons</option>
            <option value="pieces">pieces</option>
        </select>`;
    cell6.innerHTML = `<input type="number" id="costPerUnit${uniquePrefix}" name="costPerUnit" class="costPerUnit" oninput="calculateTotalCost(this)" placeholder="Enter cost" required>`;
    cell7.innerHTML = `<input type="number" id="totalCost${uniquePrefix}" name="totalCost" class="totalCost" readonly>`;
    cell8.innerHTML = `<input type="number" id="segments${uniquePrefix}" name="segments" placeholder="Enter no of Segments" required>`;
    cell9.innerHTML = `<span onclick="deleteRow(this)"><i class="fa-solid fa-trash"></i></span>`;

});



function calculateTotalCost(element) {
    var row = element.parentElement.parentElement;
    var quantity = row.querySelector('.quantity').value;
    var costPerUnit = row.querySelector('.costPerUnit').value;
    var totalCostField = row.querySelector('.totalCost');

    if (quantity && costPerUnit) {
        totalCostField.value = quantity * costPerUnit;
    } else {
        totalCostField.value = '0';
    }
}


// Store the row to delete when the popup is triggered
let rowToDelete = null;

// Function to show the delete confirmation popup
function deleteRow(element) {
    // Store the row to be deleted
    rowToDelete = element.closest('tr'); // Find the row closest to the clicked delete button
    
    // Show the custom popup
    const popup = document.getElementById('deletePopup');
    popup.classList.add('show');
    popup.style.opacity = '1';
    popup.style.display = 'block';
}

// Event listener for the confirm delete button (set once)
document.getElementById('confirmDelete').onclick = function() {
    if (rowToDelete) {
        rowToDelete.remove(); // Remove the row
        updateSerialNumbers(); // Update serial numbers
    }
    closePopup();
};

// Event listener for the cancel button (set once)
document.getElementById('cancelDelete').onclick = function() {
    closePopup();
};

// Function to hide the popup with fade-out effect
function closePopup() {
    const popup = document.getElementById('deletePopup');
    popup.style.opacity = '0';
    setTimeout(() => {
        popup.style.display = 'none'; // Ensure it's hidden after fading out
    }, 100); // Match transition duration
    showNotification("Row Deleted");
}

// Function to update serial numbers after row deletion
function updateSerialNumbers() {
    const table = document.getElementById('itemTable').getElementsByTagName('tbody')[0];
    for (let i = 0; i < table.rows.length; i++) {
        table.rows[i].cells[0].innerText = i + 1; // Update the first cell with the serial number
    }
}



let isCustomerFetched = false; // Flag to track if Customer ID is fetched

// Fetch details button event
document.getElementById("fetch-details").addEventListener("click", () => {
    const cust = document.getElementById("customer-id").value;
    if (cust) {
        document.querySelector(".main-client-det").style.display = "block";
        isCustomerFetched = true; // Set flag to true when details are fetched
    } else {
        showNotification("Enter the Customer ID");
        isCustomerFetched = false; // Reset flag if invalid
    }
});

// Submit button event
document.getElementById("submitBtn").addEventListener("click", function(event) {
    const cust = document.getElementById("customer-id").value;
    const itemList = document.getElementById("procurement-item-list")?.value; // Assuming procurement list has an ID

    if (validateForm() && cust && isCustomerFetched && itemList?.trim() !== "") {
        showNotification("Successfully submitted the details");
        window.location.href = "../html/contractorpurchaseorderhistory.html";
    } else {
        if (!cust || !isCustomerFetched) {
            showNotification("Please enter and fetch the Customer ID.");
        } else if (itemList?.trim() === "") {
            showNotification("Please enter the procurement item list properly.");
        } else {
            showNotification("Enter the Customer ID and also complete the procurement item list properly.");
        }
    }
});



function validateForm() {
    var isValid = true;

    // Validate all required fields
    var requiredFields = document.querySelectorAll('input[required], select[required]');
    requiredFields.forEach(function(input) {
        if (!input.value) {
            input.style.borderColor = 'red';
            isValid = false;
        } else {
            input.style.borderColor = ''; 
        }
    });
    // table validation
    var tableRows = document.querySelectorAll('#itemTable tbody tr');
    tableRows.forEach(function(row) {
        var cells = row.querySelectorAll('input');
        cells.forEach(function(cell) {
            if (!cell.value) {
                cell.style.border = ' 1px solid red';
                isValid = false;
            } else {
                cell.style.border = ''; 
            }
        });
    });
    return isValid;
}
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
