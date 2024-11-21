const faceRadio = document.getElementById("face");
const coldcallRadio = document.getElementById("coldcall");
const emailRadio = document.getElementById("email");

const facetofaceSection = document.getElementById("main-facetoface");
const coldcallSection = document.getElementById("main-coldcall");
const mailSection = document.getElementById("main-mail");

function hideAllSections() {
    facetofaceSection.style.display = "none";
    coldcallSection.style.display = "none";
    mailSection.style.display = "none";
}

faceRadio.addEventListener("change", function () {
    hideAllSections();
    facetofaceSection.style.display = "flex";
});

coldcallRadio.addEventListener("change", function () {
    hideAllSections();
    coldcallSection.style.display = "flex";
});

emailRadio.addEventListener("change", function () {
    hideAllSections();
    mailSection.style.display = "flex";
});

hideAllSections();
document.querySelector('.followup-form').addEventListener('submit', function(event) {
    let valid = true;

    // Reset all error states
    const inputs = this.querySelectorAll('input');
    inputs.forEach(input => {
        input.style.border = '';
        const errorMessage = input.nextElementSibling;
        if (errorMessage) {
            errorMessage.style.display = 'none';
        }
    });

    // Check for required fields
    const requiredFields = this.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!field.value) {
            field.style.border = '2px solid red';
            valid = false;
        }
    });

    // Check specific field validations
    const mobileNumber = document.getElementById('mobile-number');
    if (mobileNumber.value && mobileNumber.value.length !== 10) {
        mobileNumber.style.border = '2px solid red';
        valid = false;
        document.getElementById('mobile-error').style.display = 'block';
    }

    const email = document.getElementById('email');
    if (email.value && !validateEmail(email.value)) {
        email.style.border = '2px solid red';
        valid = false;
        document.getElementById('emailError').innerText = 'Please enter a valid email address.';
        document.getElementById('emailError').style.display = 'block';
    }

    // Prevent form submission if any field is invalid
    if (!valid) {
        event.preventDefault();
        return;
    }

    // Alert message and navigate if everything is valid
    alert('Form submitted successfully!');
    // Here you can add the logic to navigate to the next page, e.g.:
    // window.location.href = 'next-page.html';
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

