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



//  profile and security
let currentlyEditing = null;
let otpTimeoutEmail, otpTimeoutMobile;
let otpResendTime = 60;
let isOtpVerifiedEmail = false;
let isOtpVerifiedMobile = false;

let oldEmail = document.getElementById('email').value;
let oldMobile = document.getElementById('mob').value;

function editField(field) {
    if (currentlyEditing && currentlyEditing !== field) {
        showNotification("Click on edit again if finished editing or want to edit other field.");
        return;
    }

    if (currentlyEditing === field) {
        cancelEdit(field);
        return;
    }

    document.getElementById(field).disabled = false;
    if (field === 'email') {
        document.getElementById("otp-email-container").style.display = 'block';
    } else if (field === 'mob') {
        document.getElementById("otp-mob-container").style.display = 'block';
    }

    currentlyEditing = field;
}

function cancelEdit(field) {
    document.getElementById(field).disabled = true;
    if (field === 'email') {
        document.getElementById("otp-email-container").style.display = 'none';
    } else if (field === 'mob') {
        document.getElementById("otp-mob-container").style.display = 'none';
    }

    stopOtpTimer('email');
    stopOtpTimer('mob');
    currentlyEditing = null;
}

function checkEmailValidation() {
    const emailInput = document.getElementById('email').value;
    const getOtpButton = document.getElementById('get-otp-email');

    if (emailInput === oldEmail) {
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

function checkMobileValidation() {
    const mobileInput = document.getElementById('mob').value;
    const getOtpButton = document.getElementById('get-otp-mob');

    if (mobileInput === oldMobile) {
        showNotification('This is your old mobile number, please enter a new one.');
        getOtpButton.style.display = 'none';
        return;
    }

    if (validateMobile(mobileInput)) {
        getOtpButton.style.display = 'inline-block';
    } else {
        getOtpButton.style.display = 'none';
    }
}

function getOtp(type) {
    let inputField = document.getElementById(type);
    let inputValue = inputField.value;

    document.getElementById(`${type}-otp`).style.display = 'inline-block';
    document.getElementById(`verify-${type}`).style.display = 'inline-block';
    startOtpTimer(type);

    document.getElementById(`get-otp-${type}`).style.display = 'none';
}

function startOtpTimer(type) {
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

function stopOtpTimer(type) {
    if (type === 'email') {
        clearInterval(otpTimeoutEmail);
    } else if (type === 'mob') {
        clearInterval(otpTimeoutMobile);
    }
}

function resendOtp(type) {
    otpResendTime = 60;
    startOtpTimer(type);
    showNotification(`OTP for ${type} resent!`);
}

function verifyOtp(type) {
    let otpField = document.getElementById(type + '-otp');
    let otpValue = otpField.value;

    if (otpValue === "123456") { 
        showNotification(`${type.charAt(0).toUpperCase() + type.slice(1)} OTP verified successfully!`);
        otpField.disabled = true;

        let newValue = document.getElementById(type).value;
        document.getElementById(type).value = newValue;
        document.getElementById(`${type}-otp`).style.display = 'none';
        document.getElementById(`verify-${type}`).style.display = 'none';
    } else {
        showNotification('Invalid OTP');
    }
}

function saveChanges() {
    let firstName = document.getElementById("fname").value;
    let lastName = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let mobile = document.getElementById("mob").value;
    let location = document.getElementById("location").value;
    let userType = document.getElementById("usertype").value;

    showNotification(`Changes Saved:\n
        First Name: ${firstName}\n
        Last Name: ${lastName}\n
        Email: ${email}\n
        Mobile: ${mobile}\n
        Location: ${location}\n
        User Type: ${userType}`);
        

    cancelEdit('fname');
    cancelEdit('lname');
    cancelEdit('email');
    cancelEdit('mob');
    cancelEdit('location');
    cancelEdit('usertype');
}

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function restrictMobileInput(inputElement) {
    let value = inputElement.value;

    value = value.replace(/[^0-9]/g, '');

    if (value.length === 1) {
        if (['6', '7', '8', '9'].indexOf(value[0]) === -1) {
            value = ''; 
        }
    }

    if (value.length > 10) {
        value = value.substring(0, 10);
    }
    inputElement.value = value;
}

function validateMobile(mob) {
    const mobileRegex = /^[6-9][0-9]{9}$/;
    return mobileRegex.test(mob);
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


// security pass change

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
    const newPassword = document.getElementById('newpass').value;
    const confirmPassword = document.getElementById('conpass').value;
    const errorMessage = document.getElementById('error-message');

    const lengthValid = newPassword.length >= 6;
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasSpecialChar = /[@]/.test(newPassword);
    const hasNumber = /\d/.test(newPassword);
    
    if (newPassword !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match.";
        return false;
    } else if (!lengthValid || !hasUpperCase || !hasSpecialChar || !hasNumber) {
        errorMessage.textContent = "Password must be at least 6 characters long, contain one uppercase letter, one special character (@), and one number.";
        return false;
    }

    errorMessage.textContent = "";
    showNotification("Password changed successfully!");
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