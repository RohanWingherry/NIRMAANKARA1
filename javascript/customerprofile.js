document.getElementById('profile-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission for validation

    let isValid = true;

    // Validate first name (No empty, no special characters, numbers or spaces)
    const firstName = document.getElementById('first-name');
    if (!/^[A-Za-z]+$/.test(firstName.value.trim())) {
        isValid = false;
        firstName.style.borderColor = 'red';
    } else {
        firstName.style.borderColor = ''; // Reset to original border color
    }

    // Validate last name (No empty, no special characters, numbers or spaces)
    const lastName = document.getElementById('last-name');
    if (!/^[A-Za-z\s]+$/.test(lastName.value.trim())) {
        isValid = false;
        lastName.style.borderColor = 'red';
    } else {
        lastName.style.borderColor = ''; // Reset to original border color
    }


    // Validate phone number (Only 10 digits)
    const phoneNumber = document.getElementById('phone-number');
    if (!/^\d{10}$/.test(phoneNumber.value.trim())) {
        isValid = false;
        phoneNumber.style.borderColor = 'red';
        document.getElementById('phone-error').innerText = 'Please enter a valid 10-digit phone number.';
    } else {
        phoneNumber.style.borderColor = ''; // Reset to original border color
        document.getElementById('phone-error').innerText = '';
    }

    // Validate email (Basic email format validation)
    const email = document.getElementById('email');
    if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
        isValid = false;
        email.style.borderColor = 'red';
        document.getElementById('email-error').innerText = 'Please enter a valid email address.';
    } else {
        email.style.borderColor = ''; // Reset to original border color
        document.getElementById('email-error').innerText = '';
    }

    // Validate gender (No empty selection)
    const gender = document.getElementById('gender');
    if (gender.value === "") {
        isValid = false;
        gender.style.borderColor = 'red';
    } else {
        gender.style.borderColor = ''; // Reset to original border color
    }

    // Validate construction permission (No empty selection)
    const constructionPermission = document.getElementById('construction-permission');
    if (constructionPermission.value === "") {
        isValid = false;
        constructionPermission.style.borderColor = 'red';
    } else {
        constructionPermission.style.borderColor = ''; // Reset to original border color
    }

    // Validate address (Not empty)
    const address = document.getElementById('address');
    if (address.value.trim() === "") {
        isValid = false;
        address.style.borderColor = 'red';
    } else {
        address.style.borderColor = ''; // Reset to original border color
    }

    // Validate city (Only text)
    const city = document.getElementById('city');
    if (!/^[A-Za-z\s]+$/.test(city.value.trim())) {
        isValid = false;
        city.style.borderColor = 'red';
    } else {
        city.style.borderColor = ''; // Reset to original border color
    }

    // Validate state (Only text)
    const state = document.getElementById('state');
    if (!/^[A-Za-z\s]+$/.test(state.value.trim())) {
        isValid = false;
        state.style.borderColor = 'red';
    } else {
        state.style.borderColor = ''; // Reset to original border color
    }

    // Validate pincode (6 digits only)
    const pincode = document.getElementById('pincode');
    if (!/^\d{6}$/.test(pincode.value.trim())) {
        isValid = false;
        pincode.style.borderColor = 'red';
        document.getElementById('pincode-error').innerText = 'Please enter a valid 6-digit pincode.';
    } else {
        pincode.style.borderColor = ''; // Reset to original border color
        document.getElementById('pincode-error').innerText = '';
    }

    // If any field is invalid, show an showNotification
    if (!isValid) {
        showNotification('Please fill out all fields correctly.');
    } else {
        // If valid, you can handle form data here (e.g., submit via AJAX, or keep on the same page)
        showNotification('Form submitted successfully!');
        // Optionally, you can submit the form data using fetch or AJAX if needed:
        // this.submit(); 
    }
});



// profile upload
document.getElementById('file-input').addEventListener('change', function(event) {
    const fileInput = event.target;
    const file = fileInput.files[0]; // Get the selected file
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i; // Allowed file extensions

    if (file && !allowedExtensions.exec(file.name)) {
        showNotification('Invalid file type! Please upload a file in JPG, JPEG, or PNG format.');
        fileInput.value = ''; // Clear the input
        return false;
    }

    if (file) {
        // Show the image preview
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('image-preview').style.backgroundImage = `url('${e.target.result}')`;
            document.getElementById('image-preview').innerHTML = ''; // Remove the user icon
            document.getElementById('remove-icon').style.display = 'block'; // Show remove icon
        };
        reader.readAsDataURL(file);
    }
});

// Add event listener for the remove icon
document.getElementById('remove-icon').addEventListener('click', function () {
    // Show custom confirmation popup
    showRemoveImagePopup();
});

// Function to show the custom confirmation popup
function showRemoveImagePopup() {
    const popup = document.getElementById('deletePopup');
    const popupMessage = popup.querySelector('.popup-content p');
    const popupTitle = popup.querySelector('.popup-content h3');
    const confirmButton = document.getElementById('confirmDelete');
    const cancelButton = document.getElementById('cancelDelete');

    // Customize popup text for image removal
    popupTitle.textContent = 'Remove Image';
    popupMessage.textContent = 'Are you sure you want to remove the uploaded image?';

    // Show popup
    popup.classList.remove('hide');
    popup.classList.add('show');
    popup.style.display = 'block';

    // Confirm button action
    confirmButton.onclick = function () {
        document.getElementById('file-input').value = ''; // Clear the file input
        document.getElementById('image-preview').style.backgroundImage = ''; // Clear the image preview
        document.getElementById('image-preview').innerHTML = '<i class="fa-solid fa-user user-icon"></i>'; // Show the user icon
        document.getElementById('remove-icon').style.display = 'none'; // Hide the remove icon

        hidePopup();
    };

    // Cancel button action
    cancelButton.onclick = function () {
        hidePopup();
    };
}

// Function to hide the popup
function hidePopup() {
    const popup = document.getElementById('deletePopup');
    popup.classList.remove('show');
    popup.classList.add('hide');

    setTimeout(() => {
        popup.style.display = 'none';
    }, 300); // Match CSS animation duration
}


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