function resetTabs() {
    document.getElementById('profileSection').style.display = 'none';
    document.getElementById('billingSection').style.display = 'none';
    document.getElementById('securitySection').style.display = 'none';
    document.getElementById('notificationSection').style.display = 'none';
    
    let tabs = document.querySelectorAll('.tab-head');
    tabs.forEach(tab => {
        tab.classList.remove('tab-active');
    });
}

function showSection(sectionId) {
    resetTabs();
    
    document.getElementById(sectionId).style.display = 'block';
    
    let activeTab = document.getElementById(sectionId.replace('Section', 'Tab'));
    activeTab.classList.add('tab-active');
}

document.getElementById('profileTab').addEventListener('click', function() {
    showSection('profileSection');
});

document.getElementById('billingTab').addEventListener('click', function() {
    showSection('billingSection');
});

document.getElementById('securityTab').addEventListener('click', function() {
    showSection('securitySection');
});

document.getElementById('notificationTab').addEventListener('click', function() {
    showSection('notificationSection');
});

document.addEventListener('DOMContentLoaded', function() {
    showSection('profileSection');
});


// Profile
let currentlyEditing = false;
let otpTimeoutEmail, otpTimeoutMobile;
let otpResendTime = 60;
let isOtpVerifiedEmail = false;
let isOtpVerifiedMobile = false;

let originalData = {
    email: document.getElementById('email').value,
    mobile: document.getElementById('mob').value,
    firstName: document.getElementById('fname').value,
    lastName: document.getElementById('lname').value,
    location: document.getElementById('location').value
};

// Toggle edit mode for the entire form
function toggleEdit() {
    const inputs = document.querySelectorAll('#fname,#lname,#email,#mob,#location');
    const editButton = document.querySelector('.edit-btn');

    currentlyEditing = !currentlyEditing;

    // Enable/Disable fields based on the current mode
    inputs.forEach(input => {
        input.disabled = !currentlyEditing;
    });

    // Toggle visibility of OTP containers and buttons
    document.getElementById('otp-email-container').style.display = currentlyEditing ? 'block' : 'none';
    document.getElementById('otp-mob-container').style.display = currentlyEditing ? 'block' : 'none';

    // Change the button text based on the mode
    editButton.textContent = currentlyEditing ? 'Cancel Edit' : 'Edit';

    if (currentlyEditing) {
        document.querySelector(".edit-btn-container").style.backgroundColor = '#F42222';  // If it's "Cancel Edit", make the text red
    } else {
        document.querySelector(".edit-btn-container").style.backgroundColor = '#0D6EFD';  // If it's "Edit", make the text blue
    }

    // If we cancel the edit, stop any ongoing OTP timers and reset form
    if (!currentlyEditing) {
        stopOtpTimer('email');
        stopOtpTimer('mob');
        resetFormFields(); // Reset the form to the original data
    }
}

// Reset the form fields to their original values
function resetFormFields() {
    document.getElementById('fname').value = originalData.firstName;
    document.getElementById('lname').value = originalData.lastName;
    document.getElementById('email').value = originalData.email;
    document.getElementById('mob').value = originalData.mobile;
    document.getElementById('location').value = originalData.location;

    // Reset OTP verification flags
    isOtpVerifiedEmail = false;
    isOtpVerifiedMobile = false;
}

// Validate email input for changes and show OTP button
function checkEmailValidation() {
    const emailInput = document.getElementById('email').value;
    const getOtpButton = document.getElementById('get-otp-email');

    if (emailInput === originalData.email) {
        showNotification('This is your old email, please enter a new one.');
        getOtpButton.style.display = 'none';
        return;
    }

    if (validateEmail(emailInput)) {
        getOtpButton.style.display = 'inline-block';
    } else {
        getOtpButton.style.display = 'none';
    }
}

// Trigger OTP generation for email or mobile
function getOtp(type) {
    let inputField = document.getElementById(type);
    let inputValue = inputField.value;

    // Show OTP fields
    document.getElementById(`${type}-otp`).style.display = 'inline-block';
    document.getElementById(`verify-${type}`).style.display = 'inline-block';
    startOtpTimer(type);

    // Hide the Get OTP button after clicking
    document.getElementById(`get-otp-${type}`).style.display = 'none';
}

// Start OTP countdown timer
function startOtpTimer(type) {
    if ((type === 'email' && isOtpVerifiedEmail) || (type === 'mob' && isOtpVerifiedMobile)) {
        document.getElementById("otp-timer-mob").style.display="none"
        return; // Skip starting the timer if OTP is already verified
    }

    let timerDisplay, resendButton;
    if (type === 'email') {
        timerDisplay = document.getElementById('timer-email');
        resendButton = document.getElementById('resend-email');
    } else if (type === 'mob') {
        timerDisplay = document.getElementById('timer-mob');
        resendButton = document.getElementById('resend-mob');
    }

    let countdown = otpResendTime;
    timerDisplay.textContent = countdown;
    resendButton.style.display = 'none';

    if (type === 'email') {
        otpTimeoutEmail = setInterval(() => {
            countdown--;
            timerDisplay.textContent = countdown;
            if (countdown <= 0) {
                clearInterval(otpTimeoutEmail);
                resendButton.style.display = 'inline-block';
            }
        }, 1000);
    } else {
        otpTimeoutMobile = setInterval(() => {
            countdown--;
            timerDisplay.textContent = countdown;
            if (countdown <= 0) {
                clearInterval(otpTimeoutMobile);
                resendButton.style.display = 'inline-block';
            }
        }, 1000);
    }
}

// Stop OTP countdown timer
function stopOtpTimer(type) {
    if (type === 'email') {
        clearInterval(otpTimeoutEmail);
    } else if (type === 'mob') {
        clearInterval(otpTimeoutMobile);
    }
}

// Resend OTP after timer ends
function resendOtp(type) {
    otpResendTime = 60;
    startOtpTimer(type);
    showNotification(`OTP for ${type} resent!`);
}

// Verify OTP for email or mobile
function verifyOtp(type) {
    let otpField = document.getElementById(type + '-otp');
    let otpValue = otpField.value;

    if (otpValue === "123456") { // This is just a dummy value for testing
        showNotification(`${type.charAt(0).toUpperCase() + type.slice(1)} OTP verified successfully!`);
        otpField.disabled = true;

        // Mark OTP as verified
        if (type === 'email') {
            isOtpVerifiedEmail = true;
            stopOtpTimer('email'); // Stop the email OTP timer
            document.getElementById('timer-email').style.display = 'none'; // Hide the timer
            document.getElementById('resend-email').style.display = 'none'; // Hide the resend button
        } else {
            isOtpVerifiedMobile = true;
            stopOtpTimer('mob'); // Stop the mobile OTP timer
            document.getElementById('timer-mob').style.display = 'none'; // Hide the timer
            document.getElementById('resend-mob').style.display = 'none'; // Hide the resend button
        }

        // Hide the OTP input and verify button
        document.getElementById(`${type}-otp`).style.display = 'none';
        document.getElementById(`verify-${type}`).style.display = 'none';
    } else {
        showNotification('Invalid OTP');
    }
}

// Save changes made by the user
function saveChanges() {
    let firstName = document.getElementById("fname").value;
    let lastName = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let mobile = document.getElementById("mob").value;
    let location = document.getElementById("location").value;
    let userType = document.getElementById("usertype").value;

    // Check if the email or mobile was edited, and if OTP verification was done
    if ((email !== originalData.email && !isOtpVerifiedEmail) || (mobile !== originalData.mobile && !isOtpVerifiedMobile)) {
        showNotification("Please verify the OTP for the changed email or mobile number before saving.");
        return;
    }

    // Update the original data after saving
    originalData.email = email;
    originalData.mobile = mobile;
    originalData.firstName = firstName;
    originalData.lastName = lastName;
    originalData.location = location;
    originalData.userType = userType;

    showNotification(`Changes Saved:\n
        First Name: ${firstName}\n
        Last Name: ${lastName}\n
        Email: ${email}\n
        Mobile: ${mobile}\n
        Location: ${location}\n
        User Type: ${userType}`);

    // Disable all fields after saving
    toggleEdit(); // Automatically disable fields after saving
}

// Validate email format using regular expression
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// Restrict mobile input to numbers only and ensure it starts with a valid digit (6-9)
function restrictMobileInput(inputElement) {
    let value = inputElement.value;

    // Allow only numeric characters
    value = value.replace(/[^0-9]/g, '');

    // If the first digit is not between 6 and 9, clear the input
    if (value.length === 1) {
        if (['6', '7', '8', '9'].indexOf(value[0]) === -1) {
            value = ''; 
        }
    }
    // Limit input to 10 digits
    if (value.length > 10) {
        value = value.substring(0, 10);
    }
    inputElement.value = value;
    // Check if mobile number is valid and enable "Get OTP" button
    checkMobileValidation();
}

// Check if mobile number is valid and show the "Get OTP" button
function checkMobileValidation() {
    const mobileInput = document.getElementById('mob').value;
    const getOtpButton = document.getElementById('get-otp-mob');

    // If the input is a valid mobile number
    if (validateMobile(mobileInput)) {
        getOtpButton.style.display = 'inline-block';
    } else {
        getOtpButton.style.display = 'none';
    }
}

// Validate mobile number format using regular expression
function validateMobile(mob) {
    const mobileRegex = /^[6-9][0-9]{9}$/;
    return mobileRegex.test(mob);
}

// Function to show notifications (for demonstration purposes)
function showNotification(message) {
    alert(message);
}



// profile image code
const uploadInput = document.getElementById('upload-input');
const profileImg = document.getElementById('profile-img');
const changeBtn = document.getElementById('change-btn');
const deleteBtn = document.getElementById('delete-btn');

const defaultImagePath = '../assets/profile.jpg'; 
function handleImageUpload(event) {
    const file = event.target.files[0];
    
    if (!file) {
        showNotification('No file selected.');
        return;
    }
    
    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
        showNotification('Invalid file type. Please upload a JPG, JPEG, or PNG file.');
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        showNotification('File size exceeds the 5 MB limit. Please upload a smaller file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        profileImg.src = e.target.result;
        showDeleteOption();
    };
    reader.readAsDataURL(file);
}

function deleteImage() {
    if (profileImg.src === defaultImagePath) {
        showNotification("No image is uploaded to delete.");
    } else {
        const confirmDelete = confirm("Are you sure you want to delete your profile image?");
        
        if (confirmDelete) {
            profileImg.src = defaultImagePath;
            
            showUploadOption();

            showNotification("Profile image deleted successfully.");
        } else {
            showNotification("Profile image deletion canceled.");
        }
    }
}



function showDeleteOption() {
    deleteBtn.style.display = 'inline-block'; 
    changeBtn.textContent = 'Change Image'; 
}

function showUploadOption() {
    deleteBtn.style.display = 'none'; 
    changeBtn.textContent = 'Upload Image'; 
}

if (profileImg.src === defaultImagePath) {
    showUploadOption();
} else {
    showDeleteOption();
}


// Security
function togglePassword(fieldId) {
    const passwordField = document.getElementById(fieldId);
    const eyeIcon = document.getElementById(`eye-icon-${fieldId}`);
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    
    passwordField.setAttribute('type', type);
    
    if (type === 'password') {
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    } else {
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    }
}

function validateForm() {
    const currentPassword = document.getElementById('curpass').value;
    const newPassword = document.getElementById('newpass').value;
    const confirmPassword = document.getElementById('conpass').value;
    const errorMessage = document.getElementById('error-message');

    // Check if the new password is the same as the current password
    if (newPassword === currentPassword) {
        errorMessage.textContent = "New password cannot be the same as the current password.";
        return false;
    }

    // Password validation checks
    const lengthValid = newPassword.length >= 6;
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasSpecialChar = /[@]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match.";
        return false;
    }
    
    // Check if new password meets the required criteria
    if (!lengthValid || !hasUpperCase || !hasSpecialChar || !hasNumber) {
        errorMessage.textContent = "Password must be at least 6 characters long, contain one uppercase letter, one special character (@), and one number.";
        return false;
    }

    // Clear the error message if validation passes
    errorMessage.textContent = "";

    // Show success notification or alert message after successful password change
    alert("Password changed successfully!");

    // Return true to allow form submission
    return true;
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