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
    const phonePattern = /^\d{10}$/; 
    if (phoneInput.value && !phonePattern.test(phoneInput.value)) {
        phoneInput.classList.add('error');
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault();
        alert("Please fill in the required fields correctly.");
    }
    else{
        alert("Your lead have been generated")
    }
});

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

document.getElementById('fullname').addEventListener('input', function(event) {
    let value = event.target.value;
            value = value.replace(/[^a-zA-Z\s]/g, '');

            if (value.startsWith(' ')) {
                value = value.slice(1);
            }

            event.target.value = value;
});
document.getElementById('size').addEventListener('input', function(event) {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
});
document.getElementById('mob').addEventListener('input', function(event) {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
});
document.getElementById('address').addEventListener('input', function(event) {
    let value = event.target.value;
            value = value.replace(/[^a-zA-Z0-9\s]/g, '');

            if (value.startsWith(' ')) {
                value = value.slice(1);
            }

            event.target.value = value;
});
document.getElementById('note').addEventListener('input', function(event) {
    let value = event.target.value;
            value = value.replace(/[^a-zA-Z0-9\s]/g, '');

            if (value.startsWith(' ')) {
                value = value.slice(1);
            }

            event.target.value = value;
});