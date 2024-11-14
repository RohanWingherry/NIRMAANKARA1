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

// Store old values for comparison
let oldEmail = document.getElementById('email').value;
let oldMobile = document.getElementById('mob').value;

function editField(field) {
    if (currentlyEditing && currentlyEditing !== field) {
        alert("Click on edit again if finished editing or want to edit other field.");
        return;
    }

    if (currentlyEditing === field) {
        cancelEdit(field);
        return;
    }

    // Enable the field for editing
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

    // Check if the entered email is the same as the old email
    if (emailInput === oldEmail) {
        alert('This is your old email, please enter a new one.');
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

    // Check if the entered mobile number is the same as the old mobile number
    if (mobileInput === oldMobile) {
        alert('This is your old mobile number, please enter a new one.');
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

// Start OTP timer (60 seconds countdown)
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

// Stop OTP timer
function stopOtpTimer(type) {
    if (type === 'email') {
        clearInterval(otpTimeoutEmail);
    } else if (type === 'mob') {
        clearInterval(otpTimeoutMobile);
    }
}

// Resend OTP when the timer reaches zero
function resendOtp(type) {
    otpResendTime = 60;
    startOtpTimer(type);
    alert(`OTP for ${type} resent!`);
}

function verifyOtp(type) {
    let otpField = document.getElementById(type + '-otp');
    let otpValue = otpField.value;

    if (otpValue === "123456") {  // Simulate OTP validation edit this while adding functionality
        alert(`${type.charAt(0).toUpperCase() + type.slice(1)} OTP verified successfully!`);
        otpField.disabled = true;

        let newValue = document.getElementById(type).value;
        document.getElementById(type).value = newValue;
        document.getElementById(`${type}-otp`).style.display = 'none';
        document.getElementById(`verify-${type}`).style.display = 'none';
    } else {
        alert('Invalid OTP');
    }
}

function saveChanges() {
    let firstName = document.getElementById("fname").value;
    let lastName = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let mobile = document.getElementById("mob").value;
    let location = document.getElementById("location").value;
    let userType = document.getElementById("usertype").value;

    alert(`Changes Saved:
    First Name: ${firstName}
    Last Name: ${lastName}
    Email: ${email}
    Mobile: ${mobile}
    Location: ${location}
    User Type: ${userType}`);

    // Disable all fields and reset editing
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

    // Allow only numbers
    value = value.replace(/[^0-9]/g, '');

    // Ensure it starts with 6, 7, 8, or 9 and is exactly 10 digits long
    if (value.length === 1) {
        if (['6', '7', '8', '9'].indexOf(value[0]) === -1) {
            value = ''; // Reset if it doesn't start with 6, 7, 8, or 9
        }
    }

    // Limit to 10 digits
    if (value.length > 10) {
        value = value.substring(0, 10);
    }

    // Update the input field with the corrected value
    inputElement.value = value;
}

function validateMobile(mob) {
    // Ensure the number starts with 6, 7, 8, or 9 and is exactly 10 digits long
    const mobileRegex = /^[6-9][0-9]{9}$/;
    return mobileRegex.test(mob);
}





// profile image code
const uploadInput = document.getElementById('upload-input');
const profileImg = document.getElementById('profile-img');
const changeBtn = document.getElementById('change-btn');
const deleteBtn = document.getElementById('delete-btn');

// Path for the default profile image
const defaultImagePath = '../assets/profile.jpg'; // Update this to your actual path

// Function to handle image upload
function handleImageUpload(event) {
    const file = event.target.files[0];
    
    if (!file) {
        alert('No file selected.');
        return;
    }
    
    // Validate file type (JPG, JPEG, PNG)
    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
        alert('Invalid file type. Please upload a JPG, JPEG, or PNG file.');
        return;
    }

    // Validate file size (max 5 MB)
    if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds the 5 MB limit. Please upload a smaller file.');
        return;
    }

    // Create a URL for the uploaded image and set it to the profile image
    const reader = new FileReader();
    reader.onload = function(e) {
        profileImg.src = e.target.result;
        showDeleteOption();
    };
    reader.readAsDataURL(file);
}

// Function to delete the image and revert to default
function deleteImage() {
    if (profileImg.src === defaultImagePath) {
        // If the image is already the default image, alert the user
        alert("No image is uploaded to delete.");
    } else {
        const confirmDelete = confirm("Are you sure you want to delete your profile image?");
        
        if (confirmDelete) {
            profileImg.src = defaultImagePath;
            
            showUploadOption();

            alert("Profile image deleted successfully.");
        } else {
            alert("Profile image deletion canceled.");
        }
    }
}



// Show the delete button and change "Upload Image" to "Change Image"
function showDeleteOption() {
    deleteBtn.style.display = 'inline-block'; 
    changeBtn.textContent = 'Change Image'; 
}

// Show only the "Upload Image" button when the profile image is deleted
function showUploadOption() {
    deleteBtn.style.display = 'none'; 
    changeBtn.textContent = 'Upload Image'; 
}

// Initial state: If there's no profile image, show the upload option
if (profileImg.src === defaultImagePath) {
    showUploadOption();
} else {
    showDeleteOption();
}

