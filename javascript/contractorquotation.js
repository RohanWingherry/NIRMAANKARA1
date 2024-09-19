
document.getElementById("cost").addEventListener('input', multiply);
document.getElementById("all-area").addEventListener('input', multiply);
document.getElementById("enter-gst").addEventListener('input', addition);
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
    const gst_in = parseFloat(document.getElementById("enter-gst").value || 0);
    const total_gst = (mul * gst_in) / 100;
    document.querySelector(".gst-amount").innerText = (total_gst).toLocaleString('en-IN');
    const total = mul + total_gst;
    document.querySelector(".total-amt").innerText = (total).toLocaleString('en-IN');
}


const numberOfSlabs = document.getElementById("slab-number");

function generateTable() {
    const requiredInputs = document.querySelectorAll('input[required], select[required]');
    let isFormValid = true;

    //Client Address Validation
    const clientAddressInput = document.getElementById('client-address');
    const clientAddressValue = clientAddressInput.value;

    const addressRegex = /^[^\s][a-zA-Z0-9\s\.,'()/-]*$/;;

    if (!addressRegex.test(clientAddressValue)) {
        isFormValid = false;
        clientAddressInput.style.border = '1px solid red';
        document.getElementById("error-client-address-message").style.display="block";
    } else {
        clientAddressInput.style.border = '';
        document.getElementById("error-client-address-message").style.display="none";
    }

    //Client name Validation
    const clientNameInput = document.getElementById('client-name');
    const clientNameValue = clientNameInput.value;

    const nameRegex = /^[^\s][a-zA-Z\s]*$/;

    if (!nameRegex.test(clientNameValue)) {
        isFormValid = false;
        clientNameInput.style.border = '1px solid red';
        document.getElementById("error-client-name-message").style.display="block";
    } else {
        clientNameInput.style.border = '';
        document.getElementById("error-client-name-message").style.display="none";
    }
    //Client city Validation
    const clientCityInput = document.getElementById('client-city');
    const clientCityValue = clientCityInput.value;

    const cityRegex = /^[a-zA-Z]*$/;

    if (!cityRegex.test(clientCityValue)) {
        isFormValid = false;
        clientCityInput.style.border = '1px solid red';
        document.getElementById("error-client-city-message").style.display="block";
    } else {
        clientCityInput.style.border = '';
        document.getElementById("error-client-city-message").style.display="none";
    }
    //Org gst Validation
    const orggstInput = document.getElementById('client-city');
    const orggstValue = orggstInput.value;

    if (!addressRegex.test(orggstValue)) {
        isFormValid = false;
        orggstInput.style.border = '1px solid red';
        document.getElementById("error-org-gst-message").style.display="block";
    } else {
        orggstInput.style.border = '';
        document.getElementById("error-org-gst-message").style.display="none";
    }
    //Org Address Validation
    const orgAddressInput = document.getElementById('org-address');
    const orgAddressValue = orgAddressInput.value;

    if (!addressRegex.test(orgAddressValue)) {
        isFormValid = false;
        orgAddressInput.style.border = '1px solid red';
        document.getElementById("error-org-address-message").style.display="block";
    } else {
        orgAddressInput.style.border = '';
        document.getElementById("error-org-address-message").style.display="none";

    }

    //Org name Validation
    const orgNameInput = document.getElementById('org-name');
    const orgNameValue = orgNameInput.value;

    if (!nameRegex.test(orgNameValue)) {
        isFormValid = false;
        orgNameInput.style.border = '1px solid red';
        document.getElementById("error-org-name-message").style.display="block";
    } else {
        orgNameInput.style.border = '';
        document.getElementById("error-org-name-message").style.display="none";

    }
    //org  city Validation
    const orgCityInput = document.getElementById('org-city');
    const orgCityValue = orgCityInput.value;

    if (!cityRegex.test(orgCityValue)) {
        isFormValid = false;
        orgCityInput.style.border = '1px solid red';
        document.getElementById("error-org-city-message").style.display="block";
    } else {
        orgCityInput.style.border = '';
        document.getElementById("error-org-city-message").style.display="none";
    }
    requiredInputs.forEach(input => {
        input.style.border = "";

        if (input.value.trim() === "" && input.id !== 'quote') {
            isFormValid = false;
            input.style.border = "1px solid red";
        }
    });

    const contactNumber = document.getElementById('contact-number');
    const pincode = document.getElementById('client-pincode');
    const orgPincode = document.getElementById('org-pincode');

    // Check if the contact number is exactly 10 digits
    if (contactNumber.value.length !== 10) {
        isFormValid = false;
        contactNumber.style.border = "1px solid red";
        document.getElementById("error-message").style.display = "block";
    } else {
        contactNumber.style.border = "";
        document.getElementById("error-message").style.display = "none";
    }

    // Check if the pincode is exactly 6 digits for both client and organization
    [pincode, orgPincode].forEach(pin => {
        if (pin.value.length !== 6) {
            isFormValid = false;
            pin.style.border = "1px solid red";
            document.getElementById("error-pincode").style.display = "block";
        } else {
            pin.style.border = "";
            document.getElementById("error-pincode").style.display = "none";
        }
    });

    if (!isFormValid) {
        alert("Please fill out all required fields correctly.");
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
        const percentage = (35 / rowCount);
        const row = createRow(`After ${i} Slab`, slabPercentage, percentage, false, false);
        tableBody.appendChild(row);
    }

    const gstPercent = document.getElementById("enter-gst").value;
    const total = document.querySelector(".total").innerHTML;
    const gstAmount = document.querySelector(".gst-amount").innerHTML;
    const grandTotal = document.querySelector(".total-amt").innerHTML;

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

    appendFinalRows(tableBody, gstPercent, total, gstAmount, grandTotal);
    updateTotalAmount();
}




function createRow(schedule, displayPercentage, calcPercentage, isFirstRow, isNewRow) {
    const row = document.createElement('tr');
    row.classList.add("highlight-row");

    const scheduleCell = document.createElement('td');
    if (isFirstRow) {
        scheduleCell.innerText = schedule;
    } else {
        if (isNewRow) {
            const input = document.createElement('input');
            input.style.border='none';
            input.style.textAlign='center'
            input.style.fontSize='14px'
            input.style.width='130px'
            input.type = 'text';
            input.value = schedule;
            input.placeholder = 'Enter schedule'; 
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
        deleteCell.style.textAlign="center"
        const deleteButton = document.createElement('button');

        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'fa-solid fa-trash';
        deleteIcon.style.color = 'red';
        deleteIcon.style.fontSize = '16px';
        deleteIcon.style.padding = '3px';
        deleteIcon.style.cursor='pointer';
        deleteButton.appendChild(deleteIcon);

        deleteButton.onclick = () => deleteRow(row);
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);
    }

    return row;
}

function deleteRow(row) {
    if (confirm("Are you sure you want to delete this row?")) {
        const table = document.getElementById('dynamicTable');
        const rowIndex = row.rowIndex;

        if (rowIndex > 1) { 
            const previousRow = table.rows[rowIndex - 1];
            if (previousRow && previousRow.cells[1] && previousRow.cells[2]) {
                const previousPercentageCell = previousRow.cells[1];
                const previousAmountCell = previousRow.cells[2];

                const currentPercentage = parseFloat(row.cells[1].innerText.replace('%', '').trim());
                const currentAmount = parseFloat(row.cells[2].innerText.replace(/,/g, '').trim());

                previousPercentageCell.innerText = (parseFloat(previousPercentageCell.innerText.replace('%', '').trim()) + currentPercentage).toFixed(1) + '%';
                previousAmountCell.innerText = (parseFloat(previousAmountCell.innerText.replace(/,/g, '').trim()) + currentAmount).toLocaleString('en-IN');
            }
        }

        row.remove();
        updateTotalAmount();
    }
    alert("Scuccessfully deletd the row")
}




function updateTotalAmount() {
        const tableBody = document.querySelector('#dynamicTable tbody');
        let totalAmount = 0;
    
        tableBody.querySelectorAll('tr').forEach(row => {
            const amountCell = row.cells[2];
            totalAmount += parseFloat(amountCell.innerText.replace(/,/g, '').trim());
        });
    
        const gstPercent = parseFloat(document.getElementById('enter-gst').value || 0);
        const gstAmount = (totalAmount * gstPercent / 100).toLocaleString('en-IN');
        const grandTotal = (totalAmount + parseFloat(gstAmount.replace(/,/g, ''))).toLocaleString('en-IN');
    
        document.querySelector('.total-amt').innerText = totalAmount.toLocaleString('en-IN');
        document.querySelector('.gst-amount').innerText = gstAmount;
        document.querySelector('.grand-total').innerText = grandTotal;
    
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
    
    // Create and append the new row without a delete button
    const newRow = createRow('', newPercentage, (lastPercentage / 2), false, true);
    tableBody.insertBefore(newRow, tableBody.childNodes[tableBody.childNodes.length - 3]);
    
    updateTotalAmount();
}


function appendFinalRows(tableBody, gstPercent, total, gstAmount, grandTotal) {
    // Total row
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td colspan="2"><b>Total</b></td>
        <td class="total-amt"><b>${total}.00</b></td>
    `;
    tableBody.appendChild(totalRow);

    const gstRow = document.createElement('tr');
    gstAmount=
    gstRow.innerHTML = `
        <td><b>GST</b></td>
        <td><b>${gstPercent}%</b></td>
        <td><b>${gstAmount}</b></td>
    `;
    tableBody.appendChild(gstRow);

    // Grand Total row
    const grandTotalRow = document.createElement('tr');
    grandTotalRow.innerHTML = `
        <td colspan="2"><b>Grand Total</b></td>
        <td class="grand-total"><b>${grandTotal}</b></td>
    `;
    tableBody.appendChild(grandTotalRow);

    // Update total amounts after adding the final rows
    updateTotalAmount();
}

// modal

var modal = document.getElementById("myModal");
var btn1 = document.getElementById("budget-btn");
var span = document.getElementsByClassName("close")[0];
btn1.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//cost
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
        alert("Total slab area must be greater than 0.");
    }
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.getElementById("main-submit").addEventListener("submit", function(event) {
    event.preventDefault();

    const quoteInput = document.getElementById("quote").value;

    if (quoteInput.trim() !== "") {
        alert("Successfully sumitted the quotation form")
        window.location.href = "../html/contractorquotationhistory.html"; 
    } else {
        alert("Please enter your e-signature before submitting.");
    }
});
