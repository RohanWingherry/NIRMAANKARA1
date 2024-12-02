document.getElementById('orgDetailsForm').addEventListener('submit', function (event) {
    let isValid = true;

    // Fields to validate for non-empty values
    const fields = [
        'fullname',
        'mob',
        'constructions',
        'size',
        'address'
    ];

    // Remove previous error classes
    fields.forEach(field => {
        const input = document.getElementById(field);
        input.classList.remove('error');
    });

    // Check if required fields are empty
    fields.forEach(field => {
        const input = document.getElementById(field);
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        }
    });

    // Mobile number validation (10 digits, starts with 6, 7, 8, or 9)
    const phoneInput = document.getElementById('mob');
    const phonePattern = /^[6-9]\d{9}$/;
    if (phoneInput.value && !phonePattern.test(phoneInput.value)) {
        phoneInput.classList.add('error');
        isValid = false;
    }

    // Prevent form submission if validation fails
    if (!isValid) {
        event.preventDefault();
        alert("Please fill in the required fields correctly.");
    } else {
        alert("Your lead has been generated");
    }
});

// Show/Hide "Other" construction type field
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

// Validation for Full Name: Only alphabets and spaces allowed, no leading spaces
document.getElementById('fullname').addEventListener('input', function (event) {
    let value = event.target.value;
    value = value.replace(/[^a-zA-Z\s]/g, ''); // Remove non-alphabetic characters
    if (value.startsWith(' ')) {
        value = value.slice(1); // Remove leading space
    }
    event.target.value = value;
});

// Validation for Size: Only numeric input allowed
document.getElementById('size').addEventListener('input', function (event) {
    event.target.value = event.target.value.replace(/[^0-9]/g, ''); // Allow only numbers
});

// Validation for Mobile Number: Only numeric input allowed
document.getElementById('mob').addEventListener('input', function (event) {
    event.target.value = event.target.value.replace(/[^0-9]/g, ''); // Allow only numbers
});

// Validation for Address: Alphanumeric characters and spaces allowed, no leading spaces
document.getElementById('address').addEventListener('input', function (event) {
    let value = event.target.value;
    value = value.replace(/[^a-zA-Z0-9\s]/g, ''); // Remove non-alphanumeric characters
    if (value.startsWith(' ')) {
        value = value.slice(1); // Remove leading space
    }
    event.target.value = value;
});

// Validation for Note: Alphanumeric characters and spaces allowed, no leading spaces
document.getElementById('note').addEventListener('input', function (event) {
    let value = event.target.value;
    value = value.replace(/[^a-zA-Z0-9\s]/g, ''); // Remove non-alphanumeric characters
    if (value.startsWith(' ')) {
        value = value.slice(1); // Remove leading space
    }
    event.target.value = value;
});




// table
