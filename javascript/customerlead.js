document.getElementById('orgDetailsForm').addEventListener('submit', function (event) {
    let isValid = true;

    const fields = [
        'fullname',
        'mob',
        'constructions',
        'size',
        'address'
    ];

    fields.forEach(field => {
        const input = document.getElementById(field);
        input.classList.remove('error');
    });

    fields.forEach(field => {
        const input = document.getElementById(field);
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        }
    });

    const phoneInput = document.getElementById('mob');
    const phonePattern = /^[6-9]\d{9}$/;
    if (phoneInput.value && !phonePattern.test(phoneInput.value)) {
        phoneInput.classList.add('error');
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault();
        alert("Please fill in the required fields correctly.");
    } else {
        event.preventDefault();
        addDataToTable();
        alert("Your lead has been generated");
    }
});

document.querySelectorAll('.delete-row').forEach(button => {
    button.addEventListener('click', function (event) {
        const row = event.target.closest('tr');
        const confirmDelete = confirm("Are you sure you want to delete this lead?");
        
        if (confirmDelete) {
            row.remove();
            updateSerialNumbers();
        }
    });
});

function updateSerialNumbers() {
    const rows = document.querySelectorAll('.history-table tbody tr');
    
    rows.forEach((row, index) => {
        row.querySelector('td:first-child').textContent = index + 1;
    });
}

document.getElementById('constructions').addEventListener('change', function () {
    const otherTypeInput = document.getElementById('other-construction-type');
    if (this.value === 'Other') {
        otherTypeInput.style.display = 'block';
        document.getElementById('other-construction').setAttribute('required', 'required');
    } else {
        otherTypeInput.style.display = 'none';
        document.getElementById('other-construction').removeAttribute('required');
    }
});

function addDataToTable() {
    const fullname = document.getElementById('fullname').value;
    const mob = document.getElementById('mob').value;
    const constructionType = document.getElementById('constructions').value;
    const size = document.getElementById('size').value;
    const address = document.getElementById('address').value;

    let constructionTypeToDisplay = constructionType;
    if (constructionType === 'Other') {
        const otherConstructionType = document.getElementById('other-construction').value;
        constructionTypeToDisplay = otherConstructionType || constructionType;
    }

    const leadId = `L-${Date.now()}`;

    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedTableDate = `${day}-${month}-${year}`;

    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td></td>
        <td>${formattedTableDate}</td>
        <td>${leadId}</td>
        <td>${fullname}</td>
        <td>${mob}</td>
        <td>${constructionTypeToDisplay}</td>
        <td>${size} SFT</td>
        <td>${address}</td>
        <td id="action">
            <i class="fa-regular fa-trash-can delete-row"></i>
        </td>
    `;

    document.querySelector('.history-table tbody').appendChild(newRow);

    updateSerialNumbers();

<<<<<<< HEAD

// table
=======
    document.getElementById('orgDetailsForm').reset();
}
>>>>>>> 6b411c0ff6e7a3dbc848f0df880d0ea78eaff175
