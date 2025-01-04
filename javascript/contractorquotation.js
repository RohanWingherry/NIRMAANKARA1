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

document.getElementById("cost").addEventListener('input', multiply);
document.getElementById("all-area").addEventListener('input', multiply);
document.getElementById("enter-cgst").addEventListener('input', addition);
document.getElementById("enter-sgst").addEventListener('input', addition);

document.addEventListener('input', function () {
    const slabNumber = document.getElementById('slab-number').value;
    const slabArea = document.getElementById('slab-area').value;
    const allAreaInput = document.getElementById('all-area');
    
    if (slabNumber && slabArea) {
        const allArea = slabNumber * slabArea;
        allAreaInput.value = allArea;
    } else {
        allAreaInput.value = '';
    }
    multiply();
});

function multiply() {
    const cost = parseFloat(document.getElementById("cost").value || 0);
    const all = parseFloat(document.getElementById("all-area").value || 0);
    const mul = cost * all;
    document.querySelector(".total").innerText = (mul).toLocaleString('en-IN');
    addition();
}

function addition() {
    const mulStr = document.querySelector(".total").innerText.replace(/,/g, '');
    const mul = parseFloat(mulStr || 0);
    const cgst = parseFloat(document.getElementById("enter-cgst").value || 0);
    const sgst = parseFloat(document.getElementById("enter-sgst").value || 0);
    
    const total_gst_percentage = cgst + sgst;
    const total_gst_amount = (mul * total_gst_percentage) / 100;
    
    document.querySelector("#gst-amount").innerText = (total_gst_amount).toLocaleString('en-IN');
    const total = mul + total_gst_amount;
    document.querySelector("#total-amt").innerText = (total).toLocaleString('en-IN');
}

const numberOfSlabs = document.getElementById("slab-number");

function generateTable() {
    const customerId = document.getElementById("customer-id").value;

    // Check if Customer ID is entered
    if (!customerId) {
        showNotification("Please enter the Customer ID before generating the table.");
        return;
    }

    // Check if Customer details have been fetched
    const detailsVisible = document.querySelector(".main-client-det").style.display === "block";
    if (!detailsVisible) {
        showNotification("Please fetch the Customer details first.");
        return;
    }

    const requiredInputs = document.querySelectorAll('input[required], select[required]');
    let isFormValid = true;

    requiredInputs.forEach(input => {
        input.style.border = "";

        // Skip validation for email, mobile, and fullname fields
        if (input.id === 'email' || input.id === 'mobile' || input.id === 'fullname' || input.id ==='email-footer') {
            return;
        }

        if (input.value.trim() === "" && input.id !== 'quote') {
            isFormValid = false;
            input.style.border = "1px solid red";
        }
    });

    if (!isFormValid) {
        showNotification("Please fill out all required fields correctly.");
        return;
    }

    document.getElementById("main-dynamicTable").style.display = 'table';
    document.getElementById("addrow").style.display = 'block';
    document.querySelector("#main-submit").style.display = "block";

    const rowCount = parseInt(numberOfSlabs.value);
    const tableBody = document.querySelector('#dynamicTable tbody');
    tableBody.innerHTML = '';

    const predefinedRows = [
        { schedule: 'Advance', percentage: '10.0%' },
        { schedule: 'After Plinth Beam', percentage: '10.0%' }
    ];

    predefinedRows.forEach((rowData, index) => {
        const isFirstRow = (index === 0);
        const row = createRow(rowData.schedule, rowData.percentage, rowData.percentage, isFirstRow, false);
        tableBody.appendChild(row);
    });

    for (let i = 1; i <= rowCount; i++) {
        const slabPercentage = (35 / rowCount).toFixed(1) + '%';
        const row = createRow(`After ${i} Slab`, slabPercentage, slabPercentage, false, false);
        tableBody.appendChild(row);
    }

    // Additional predefined rows
    const additionalRows = [
        { schedule: 'Brick work', percentage: '5.0%' },
        { schedule: 'After Plastering Inside', percentage: '5.0%' },
        { schedule: 'After Plastering Outside', percentage: '5.0%' },
        { schedule: 'Before Flooring', percentage: '5.0%' },
        { schedule: 'Before Painting', percentage: '5.0%' },
        { schedule: 'Electrical', percentage: '5.0%' },
        { schedule: 'Plumbing', percentage: '5.0%' },
        { schedule: 'Sanitary', percentage: '5.0%' },
        { schedule: 'Lift and finishes Work', percentage: '5.0%' },
    ];

    additionalRows.forEach(rowData => {
        const row = createRow(rowData.schedule, rowData.percentage, rowData.percentage, false, false);
        tableBody.appendChild(row);
    });

    // Append the final rows (Total, GST, Grand Total)
    appendFinalRows(tableBody);
    updateTotalAmount();
}

document.getElementById("fetch-details").addEventListener("click", () => {
    const customerId = document.getElementById("customer-id").value;
    if (customerId.trim()) {
        document.querySelector(".main-client-det").style.display = "block";
        showNotification("Customer details fetched successfully.");
    } else {
        showNotification("Enter the Customer ID.");
    }
});



function createRow(schedule, displayPercentage, calcPercentage, isFirstRow, isNewRow) {
    const row = document.createElement('tr');
    row.classList.add("highlight-row");

    const scheduleCell = document.createElement('td');
    if (isFirstRow) {
        scheduleCell.innerText = schedule;
    } else {
        if (isNewRow) {
            const input = document.createElement('input');
            input.style.border = 'none';
            input.style.textAlign = 'center';
            input.style.fontSize = '14px';
            input.style.width = '130px';
            input.type = 'text';
            input.value = schedule;
            input.placeholder = 'Enter schedule';
            input.id = 'scheduleInput'; 
            scheduleCell.appendChild(input);
        } else {
            scheduleCell.innerText = schedule;
        }
    }
    row.appendChild(scheduleCell);

    const percentageCell = document.createElement('td');
    percentageCell.innerText = displayPercentage;
    row.appendChild(percentageCell);

    const remarksCell = document.createElement('td');
    const per = parseFloat(calcPercentage);
    const mulStr = document.querySelector(".total").innerText.replace(/,/g, '');
    const amountToBePaid = mulStr * (per / 100);
    remarksCell.innerText = amountToBePaid.toFixed(2).toLocaleString('en-IN');
    row.appendChild(remarksCell);

    if (!isFirstRow && !isNewRow) {
        const deleteCell = document.createElement('td');
        deleteCell.className = 'action-delete';
        deleteCell.style.textAlign = "center";
        const deleteButton = document.createElement('button');

        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'fa-solid fa-trash';
        deleteIcon.style.color = 'red';
        deleteIcon.style.fontSize = '16px';
        deleteIcon.style.padding = '3px';
        deleteIcon.style.cursor = 'pointer';
        deleteButton.appendChild(deleteIcon);

        deleteButton.onclick = () => deleteRow(row);
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);
    }

    return row;
}

// delete pop up
// Global variable to store the row to be deleted temporarily
let rowToDelete = null;

function deleteRow(row) {
    // Store the row to be deleted in a global variable
    rowToDelete = row;

    // Show the delete confirmation popup
    const popup = document.getElementById('deletePopup');
    popup.classList.remove('hide');
    popup.classList.add('show');
}

// Attach event listeners for confirmation and cancellation
document.getElementById('cancelDelete').addEventListener('click', () => {
    // Hide the popup and reset the global variable
    const popup = document.getElementById('deletePopup');
    popup.classList.remove('show');
    popup.classList.add('hide');
    rowToDelete = null;
});

document.getElementById('confirmDelete').addEventListener('click', () => {
    if (rowToDelete) {
        const table = document.getElementById('dynamicTable');
        const rowIndex = rowToDelete.rowIndex;

        if (rowIndex > 1) {
            const previousRow = table.rows[rowIndex - 1];
            if (previousRow && previousRow.cells[1] && previousRow.cells[2]) {
                const previousPercentageCell = previousRow.cells[1];
                const previousAmountCell = previousRow.cells[2];

                const currentPercentage = parseFloat(rowToDelete.cells[1].innerText.replace('%', '').trim());
                const currentAmount = parseFloat(rowToDelete.cells[2].innerText.replace(/,/g, '').trim());

                previousPercentageCell.innerText = (parseFloat(previousPercentageCell.innerText.replace('%', '').trim()) + currentPercentage).toFixed(1) + '%';
                previousAmountCell.innerText = (parseFloat(previousAmountCell.innerText.replace(/,/g, '').trim()) + currentAmount).toLocaleString('en-IN');
            }
        }

        rowToDelete.remove();
        updateTotalAmount();
        showNotification("Successfully deleted the row");
    }

    // Hide the popup and reset the global variable
    const popup = document.getElementById('deletePopup');
    popup.classList.remove('show');
    popup.classList.add('hide');
    rowToDelete = null;
});
function updateTotalAmount() {
    const tableBody = document.querySelector('#dynamicTable tbody');
    let totalAmount = 0;

    tableBody.querySelectorAll('tr').forEach(row => {
        const amountCell = row.cells[2];
    });

    


}
function addRow() {
    const tableBody = document.querySelector('#dynamicTable tbody');
    const lastRow = tableBody.rows[tableBody.rows.length - 4];
    
    if (!lastRow) return; 

    const lastPercentageCell = lastRow.cells[1];
    const lastAmountCell = lastRow.cells[2];
    
    const lastPercentage = parseFloat(lastPercentageCell.innerText.replace('%', '').trim());
    const lastAmount = parseFloat(lastAmountCell.innerText.replace(/,/g, '').trim());

    // Halve the last row's values
    const newPercentage = (lastPercentage / 2).toFixed(1) + '%';
    const newAmount = (lastAmount / 2).toFixed(2);

    // Update the last row
    lastPercentageCell.innerText = newPercentage;
    lastAmountCell.innerText = newAmount;
    
    // Create and append the new row with the "Delete" button included
    const newRow = createRow('', newPercentage, (lastPercentage / 2), false, true);
    
    // Add the delete button to the new row
    const deleteCell = document.createElement('td');
    deleteCell.className = 'action-delete';
    deleteCell.style.textAlign = "center";
    const deleteButton = document.createElement('button');

    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'fa-solid fa-trash';
    deleteIcon.style.color = 'red';
    deleteIcon.style.fontSize = '16px';
    deleteIcon.style.padding = '3px';
    deleteIcon.style.cursor = 'pointer';
    deleteButton.appendChild(deleteIcon);

    deleteButton.onclick = () => deleteRow(newRow); 
    deleteCell.appendChild(deleteButton);
    newRow.appendChild(deleteCell); 

    tableBody.insertBefore(newRow, tableBody.childNodes[tableBody.childNodes.length - 3]);
    
    updateTotalAmount();
}



function appendFinalRows(tableBody) {
    // Total row
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td colspan="2"><b>Total</b></td>
        <td class="total-amt"><b>${document.querySelector(".total").innerText}</b></td>
    `;
    tableBody.appendChild(totalRow);

    const gstRow = document.createElement('tr');
    const gstAmount = document.querySelector('#gst-amount').innerText;
    const cgstval=document.getElementById("enter-cgst").value;
    const sgstval=document.getElementById("enter-sgst").value;
    gstRow.innerHTML = `
        <td><b>GST</b></td>
        <td><b>CGST: ${cgstval}% + SGST: ${sgstval}%</b></td>
        <td><b>${gstAmount}</b></td>
    `;
    tableBody.appendChild(gstRow);

    // Grand Total row
    const grandTotalRow = document.createElement('tr');
    grandTotalRow.innerHTML = `
        <td colspan="2"><b>Grand Total</b></td>
        <td class="grand-total"><b>${document.querySelector('#total-amt').innerText}</b></td>
    `;
    tableBody.appendChild(grandTotalRow);
}

// Modal handling
var modal = document.getElementById("myModal");
var btn1 = document.getElementById("budget-btn");
var span = document.getElementsByClassName("close")[0];
btn1.onclick = function () {
    modal.style.display = "block";
}
span.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Cost calculation
function updateTotalSlabArea() {
    const numSlabs = parseFloat(document.getElementById('num-slabs-input').value || 0);
    const slabArea = parseFloat(document.getElementById('slab-area-input').value || 0);
    const totalSlabArea = numSlabs * slabArea;

    document.getElementById('total-slab-area').innerText = totalSlabArea.toLocaleString('en-IN');
}

function calculateCost() {
    const budget = parseFloat(document.getElementById('budget-input').value || 0);
    const totalSlabArea = parseFloat(document.getElementById('total-slab-area').innerText.replace(/,/g, '') || 0);

    if (totalSlabArea > 0) {
        const costPerArea = (budget / totalSlabArea).toFixed(2);
        document.getElementById('cost-per-area').innerText = costPerArea.toLocaleString('en-IN');
    } else {
        showNotification("Total slab area must be greater than 0.");
    }
}

// document.getElementById("fetch-details").addEventListener("click", () => {
//     const cust = document.getElementById("customer-id").value;
//     if (cust) {
//         document.querySelector(".main-client-det").style.display = "block";
//     } else {
//         showNotification("Enter the Customer ID");
//     }
// });

document.getElementById("main-submit").addEventListener("submit", function (event) {
    event.preventDefault();

    const quoteInput = document.getElementById("quote").value;

    if (quoteInput.trim() !== "") {
        showNotification("Successfully submitted the quotation form");
        window.location.href = "../html/contractorquotationhistory.html";
    } else {
        showNotification("Please enter your e-signature before submitting.");
    }
});
const dateInput = document.getElementById('dateInput');
const today = new Date().toISOString().split('T')[0]; 
dateInput.value = today;
dateInput.style.textAlign = 'center';