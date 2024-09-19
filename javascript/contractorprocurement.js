var addingRowCount=0;
document.getElementById('addRowBtn').addEventListener('click', function() {
    var table = document.getElementById('itemTable').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();

    var cell0 = newRow.insertCell(0); // Serial number cell
    var cell1 = newRow.insertCell(1);
    var cell2 = newRow.insertCell(2);
    var cell3 = newRow.insertCell(3);
    var cell4 = newRow.insertCell(4);
    var cell5 = newRow.insertCell(5);
    var cell6 = newRow.insertCell(6);
    var cell7 = newRow.insertCell(7);
    var cell8 = newRow.insertCell(8);
    var cell9 = newRow.insertCell(9);

    // Set the serial number based on the current number of rows
    var rowCount = table.rows.length;
    cell0.innerHTML = rowCount;

    cell1.innerHTML = '<input type="text" name="materialName" placeholder="Enter material name" required>';
    cell2.innerHTML = '<input type="text" name="description" placeholder="Enter description" required>';
    cell3.innerHTML = '<input type="text" name="vendor" placeholder="Enter vendor" required>';
    cell4.innerHTML = '<input type="number" name="quantity" class="quantity" oninput="calculateTotalCost(this)" placeholder="Enter quantity" required>';
    cell5.innerHTML = `
        <select name="unitOfMeasure" required>
            <option value="kg">kg</option>
            <option value="tons">tons</option>
            <option value="pieces">pieces</option>
        </select>`;
    cell6.innerHTML = '<input type="number" name="costPerUnit" class="costPerUnit" oninput="calculateTotalCost(this)" placeholder="Enter cost/unit" required>';
    cell7.innerHTML = '<input type="number" name="totalCost" class="totalCost" readonly>';
    cell8.innerHTML = '<input type="number" name="segments" placeholder="Enter no of Segments" required>';
    cell9.innerHTML = '<span onclick="deleteRow(this)"><i class="fa-solid fa-trash"></i></span>';

    addingRowCount=addingRowCount+1;
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

function deleteRow(element) {
    var row = element.parentElement.parentElement;
    
    var confirmDelete = confirm("Are you sure you want to delete this row?");
    
    if (confirmDelete) {
        row.remove(); 
        updateSerialNumbers();
        addingRowCount=addingRowCount-1;
    }
}

// Function to update the serial numbers after a row is deleted
function updateSerialNumbers() {
    var table = document.getElementById('itemTable').getElementsByTagName('tbody')[0];
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].cells[0].innerText = i + 1;
    }
}

document.getElementById('submitBtn').addEventListener('click', function(event) {
    // Prevent form submission if validation fails
    if (validateForm()&&addingRowCount>=1) {
        alert("Details are filled Successfully")
        window.location.href="../html/contractorpurchaseorderhistory.html";
    }
    else{
        alert("All the fields are required and also enter the procurement item list properly")
    }
});


function validateForm() {
    var isValid = true;

    // Hide all error messages initially
    document.getElementById('error-message').style.display = 'none';
    document.getElementById('error-pincode').style.display = 'none';

    // Reset border colors for inputs
    var inputs = document.querySelectorAll('.form-group input, .form-group select');
    inputs.forEach(function(input) {
        input.style.borderColor = '';
    });

    // Validate all required fields
    var requiredFields = document.querySelectorAll('.form-group input[required], .form-group select[required]');
    requiredFields.forEach(function(input) {
        if (!input.value) {
            input.style.borderColor = 'red';
            isValid = false;
        } else {
            input.style.borderColor = ''; // Reset border color if valid
        }
    });

    // Validate mobile number specifically
    var mobileNumber = document.getElementById('contact-number');
    if (mobileNumber.value.length !== 10) {
        document.getElementById('error-message').style.display = 'block';
        mobileNumber.style.borderColor = 'red';
        isValid = false;
    }

    // Validate pincode specifically
    var clientPincode = document.getElementById('client-pincode');
    if (clientPincode.value.length !== 6) {
        document.getElementById('error-pincode').style.display = 'block';
        clientPincode.style.borderColor = 'red';
        isValid = false;
    }

    const clientName = document.getElementById('client-name');
    const clientAddress=document.getElementById('client-address');
    const clientCity=document.getElementById('client-city');
    const orgName=document.getElementById("org-name");
    const gstName=document.getElementById('gst-reg-no');
    const orgAddress=document.getElementById('org-address');
    const orgCity=document.getElementById('org-city');

    const nameRegex = /^[a-zA-Z][a-zA-Z\s]*$/;
    if (!nameRegex.test(clientName.value.trim())) {
        isValid = false;
        clientName.style.border = "1px solid red";
    } else {
        clientName.style.border = "";
    }
    // organisation name
    if (!nameRegex.test(orgName.value.trim())) {
        isValid = false;
        orgName.style.border = "1px solid red";
    } else {
        orgName.style.border = "";
    }
// client city
    if (!nameRegex.test(clientCity.value.trim())) {
        isValid = false;
        clientCity.style.border = "1px solid red";
    } else {
        clientCity.style.border = "";
    }
    //org city
    if (!nameRegex.test(orgCity.value.trim())) {
        isValid = false;
        orgCity.style.border = "1px solid red";
    } else {
        orgCity.style.border = "";
    }
//client address
    const addressRegex = /^[a-zA-Z0-9][a-zA-Z0-9\s]*$/;
    if (!addressRegex.test(clientAddress.value.trim())) {
        isValid = false;
        clientAddress.style.border = "1px solid red";
    } else {
        clientAddress.style.border = "";
    }

    //contractor address
    if (!addressRegex.test(orgAddress.value.trim())) {
        isValid = false;
        orgAddress.style.border = "1px solid red";
    } else {
        orgAddress.style.border = "";
    }

    //org-gst
    if (!addressRegex.test(gstName.value.trim())) {
        isValid = false;
        gstName.style.border = "1px solid red";
    } else {
        gstName.style.border = "";
    }


    var orgPincode = document.getElementById('org-pincode');
    if (orgPincode.value.length !== 6) {
        document.getElementById('error-pincode').style.display = 'block';
        orgPincode.style.borderColor = 'red';
        isValid = false;
    }
    // table validation
    var tableRows = document.querySelectorAll('#itemTable tbody tr');
    tableRows.forEach(function(row) {
        var cells = row.querySelectorAll('input');
        cells.forEach(function(cell) {
            if (!cell.value) {
                cell.style.border = ' 1px solid red';
                isValid = false;
            } else {
                cell.style.border = ''; // Reset border color if valid
            }
        });
    });
    return isValid;
}
