document.getElementById("orgDetailsForm").addEventListener("submit", function (event) {
    event.preventDefault(); 
    
    resetErrors();

    let isValid = true;

    const fullname = document.getElementById("fullname").value.trim();
    const phone = document.getElementById("mob").value.trim();
    const constructions = document.getElementById("constructions").value;
    const otherConstruction = document.getElementById("other-construction").value.trim();
    const size = document.getElementById("size").value.trim();
    const address = document.getElementById("address").value.trim();
    
    if (fullname === "") {
        showError("fullname", "Full Name is required.");
        isValid = false;
    }

    if (phone === "" || phone.length !== 10 || !/^\d{10}$/.test(phone)) {
        showError("mob", "Enter a valid 10-digit phone number.");
        isValid = false;
    }

    if (constructions === "") {
        showError("constructions", "Construction Type is required.");
        isValid = false;
    }

    if (constructions === "Other" && otherConstruction === "") {
        showError("other-construction", "Please specify the construction type.");
        isValid = false;
    }

    if (size === "") {
        showError("size", "Size of Land is required.");
        isValid = false;
    }

    if (address === "") {
        showError("address", "Address of Land is required.");
        isValid = false;
    }

    if (isValid) {
        alert("Form submitted successfully!");
        this.submit(); 
    }
});

// Show error message
function showError(fieldId, message) {
    const inputField = document.getElementById(fieldId);
    inputField.style.borderColor = "red";

    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.style.color = "red";
    errorElement.innerText = message;
    inputField.parentNode.appendChild(errorElement);
}

function resetErrors() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(function (element) {
        element.remove();
    });

    const inputFields = document.querySelectorAll(".form-group input, .form-group select");
    inputFields.forEach(function (input) {
        input.style.borderColor = "";
    });
}

document.getElementById("constructions").addEventListener("change", function () {
    const otherField = document.getElementById("other-construction-type");
    if (this.value === "Other") {
        otherField.style.display = "block";
        document.getElementById("other-construction").required = true; 
    } else {
        otherField.style.display = "none";
        document.getElementById("other-construction").required = false; 
    }
});
