document.querySelector(".followup-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = document.querySelector('.fullname').value;
    const mobileNumber = document.querySelector('.mobilenumber').value;
    const addressInput = document.querySelector('.address').value;
    const face = document.getElementById('face').checked;
    const coldcall = document.getElementById('coldcall').checked;
    const email = document.getElementById('email').checked;
    const chat = document.getElementById('chat').checked;

    // Error message element
    const errorMessage = document.getElementById("error-message");

    // Clear previous error messages
    errorMessage.style.display = "none";

    // Validation functions
    const isValidName = (value) => {
        const regex = /^[a-zA-Z][a-zA-Z\s]*$/;
        return regex.test(value);
    };

    const isValidAddress = (value) => {
        const regex = /^[a-zA-Z][a-zA-Z0-9\s]*$/;
        return regex.test(value);
    };

    const validateForm = () => {
        let isValid = true;

        // Validate name and address
        if (!isValidName(nameInput)) {
            errorMessage.textContent = "Invalid name: should not contain numbers, special characters, and must not start with a space.";
            errorMessage.style.display = "block";
            isValid = false;
        }

        if (!isValidAddress(addressInput)) {
            errorMessage.textContent = "Invalid address: should not start with a space, special characters, and must not start with a space.";
            errorMessage.style.display = "block";
            isValid = false;
        }

        // Validate mobile number
        if (mobileNumber.length !== 10) {
            errorMessage.textContent = "The number must be exactly 10 digits!";
            errorMessage.style.display = "block";
            isValid = false;
        }

        // Validate if one prefered type is selected
        if (!(face || coldcall || email || chat)) {
            errorMessage.textContent = "Please select a preferred type.";
            errorMessage.style.display = "block";
            isValid = false;
        }

        return isValid;
    };

    // Run validation
    if (validateForm()) {
        if (face) {
            window.location.href = '../html/contractorfollowupfacetoface.html';
        } else if (coldcall) {
            window.location.href = '../html/contractorfollowupcoldcall.html';
        } else if (email) {
            window.location.href = '../html/contractorfollowupemail.html';
        } else if (chat) {
            window.location.href = '../html/contractorfollowupchat.html';
        }
    }
});
