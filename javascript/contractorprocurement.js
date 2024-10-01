var addingRowCount=0;
document.getElementById('addRowBtn').addEventListener('click', function() {
    var table = document.getElementById('itemTable').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow();

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

function updateSerialNumbers() {
    var table = document.getElementById('itemTable').getElementsByTagName('tbody')[0];
    for (var i = 0; i < table.rows.length; i++) {
        table.rows[i].cells[0].innerText = i + 1;
    }
}

document.getElementById('submitBtn').addEventListener('click', function(event) {
    if (validateForm()&&addingRowCount>=1) {
        alert("Successfully submitted the details")
        window.location.href="../html/contractorpurchaseorderhistory.html";
    }
    else{
        alert("Enter the customer id and also enter the procurement item list properly")
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
        alert("Enter the Customer-id")
    }
  })
  const dateInput = document.getElementById('dateInput');
  const today = new Date().toISOString().split('T')[0]; 
  dateInput.value = today;
  dateInput.style.textAlign='center'
