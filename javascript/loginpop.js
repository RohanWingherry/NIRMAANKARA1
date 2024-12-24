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




const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// Get form elements
const signInForm = document.getElementById('sign-in-form');
const signUpForm = document.getElementById('sign-up-form');

// Static OTP for testing (use separate static OTPs for email and mobile)
const staticEmailOTP = "123456";
const staticMobileOTP = "654321";

// Track OTP verification status
let emailVerified = false;
let mobileVerified = false;

// Sign In Form Validation
signInForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const emailOrMobile = document.getElementById('sign-in-email');
  const password = document.getElementById('sign-in-password');
  let valid = true;

  // Clear previous error messages
  clearErrors();

  // Validate Email or Mobile Number
  if (emailOrMobile.value.trim() === "") {
    showError(emailOrMobile, 'Email or Mobile Number is required');
    valid = false;
  } else if (!validateEmailOrMobile(emailOrMobile.value.trim())) {
    showError(emailOrMobile, 'Please enter a valid email or mobile number');
    valid = false;
  }

  // Validate Password
  if (password.value.trim() === "") {
    showError(password, 'Password is required');
    valid = false;
  } else if (!validatePassword(password.value.trim())) {
    showError(password, 'Password must contain at least one uppercase letter, one number, and one special character');
    valid = false;
  }

  if (valid) {
    showNotification("Sign In Successful");
  }
});

// Assuming the rest of your code is as before

// Function to show the notification for successful registration
// Function to show registration success notification and toggle to login view
function showRegistrationSuccessNotification() {
  const notificationPopup = document.getElementById("notification-popup");
  const notificationMessage = document.getElementById("notification-message");
  const notificationCloseBtn = document.getElementById("notification-close-btn");

  // Set the message for the successful registration notification
  notificationMessage.textContent = "Registration Successful!";

  // Show the notification
  notificationPopup.style.display = "flex";

  // Add event listener for the "OK" button (close button)
  notificationCloseBtn.addEventListener("click", function () {
      // Hide the notification popup
      notificationPopup.style.display = "none";

      // Toggle to login view
      const container = document.querySelector(".container");
      container.classList.remove("sign-up-mode");
  });
}

// Sign Up Form Validation (Including Registration Success Notification)
signUpForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const fullName = document.getElementById('full-name');
  const email = document.getElementById('sign-up-email');
  const mobileNumber = document.getElementById('mobile-number');
  const password = document.getElementById('sign-up-password');
  const confirmPassword = document.getElementById('confirm-password');
  const roleInputs = document.querySelectorAll('input[name="role"]');
  let valid = true;

  // Clear previous error messages
  clearErrors();

  // Validate Full Name
  if (fullName.value.trim() === "") {
      showError(fullName, 'Full Name is required');
      valid = false;
  }

  // Validate Email
  if (email.value.trim() === "") {
      showError(email, 'Email is required');
      valid = false;
  } else if (!validateEmail(email.value.trim())) {
      showError(email, 'Invalid Email. Please use a Gmail address.');
      valid = false;
  }

  // Validate Mobile Number
  if (mobileNumber.value.trim() === "") {
      showError(mobileNumber, 'Mobile Number is required');
      valid = false;
  } else if (!validateMobileNumber(mobileNumber.value.trim())) {
      showError(mobileNumber, 'Invalid Mobile Number');
      valid = false;
  }

  // Validate Password
  if (password.value.trim() === "") {
      showError(password, 'Password is required');
      valid = false;
  } else if (!validatePassword(password.value.trim())) {
      showError(password, 'Password must contain 6 characters, at least one uppercase letter, one number, and one special character');
      valid = false;
  }

  // Validate Confirm Password
  if (confirmPassword.value.trim() === "") {
      showError(confirmPassword, 'Confirm Password is required');
      valid = false;
  } else if (password.value !== confirmPassword.value) {
      showError(confirmPassword, 'Passwords do not match');
      valid = false;
  }

  // Validate Role Selection
  let roleSelected = false;
  roleInputs.forEach((role) => {
      if (role.checked) {
          roleSelected = true;
      }
  });

  if (!roleSelected) {
      const roleError = document.createElement('p');
      roleError.classList.add('error-message');
      document.querySelector('.radio-group').insertAdjacentElement('afterend', roleError);
      valid = false;
  }

  if (valid) {
      // Trigger OTP verification for email and mobile
      if (!emailVerified) showOTPVerification('email');
      if (!mobileVerified) showOTPVerification('mobile');

      // If both OTPs are verified, trigger the registration success notification
      if (emailVerified && mobileVerified) {
          showRegistrationSuccessNotification();  // Show success and redirect to login page
      }
  }
});


// Trigger OTP Verification Immediately on Valid Email or Mobile Input
const emailInput = document.getElementById('sign-up-email');
const mobileInput = document.getElementById('mobile-number');

// Email OTP Trigger
emailInput.addEventListener('blur', function () {
  if (validateEmail(emailInput.value.trim()) && !emailVerified) {
    showOTPVerification('email');
    showNotification('OTP sent to your email');
  }
});

// Mobile OTP Trigger
mobileInput.addEventListener('blur', function () {
  if (validateMobileNumber(mobileInput.value.trim()) && !mobileVerified) {
    showOTPVerification('mobile');
    showNotification('OTP sent to your mobile number');
  }
});

// OTP Verification for Email and Mobile
function showOTPVerification(type) {
  const containerId = type === 'email' ? 'email-otp-container' : 'mobile-otp-container';
  let container = document.getElementById(containerId);

  if (!container) {
    // Create OTP input container
    container = document.createElement('div');
    container.setAttribute('id', containerId);

    // Create OTP input field
    const otpInputField = document.createElement('input');
    otpInputField.classList.add('otp-box');
    otpInputField.setAttribute('type', 'text');
    otpInputField.setAttribute('id', `${type}-otp-input`);
    otpInputField.setAttribute('placeholder', `Enter ${type === 'email' ? 'Email' : 'Mobile'} OTP`);

    // Create Verify Button
    const verifyButton = document.createElement('button');
    verifyButton.textContent = 'Verify OTP';
    verifyButton.classList.add('verify-button');
    verifyButton.addEventListener('click', function () {
      verifyOTP(type);
    });

    // Create Resend OTP Button
    const resendButton = document.createElement('button');
    resendButton.textContent = 'Resend OTP';
    resendButton.classList.add('resend-button');
    resendButton.addEventListener('click', function () {
      resendOTP(type);
    });

    // Append elements to the container
    container.appendChild(otpInputField);
    container.appendChild(verifyButton);
    container.appendChild(resendButton);

    // Append the container to the form
    const referenceField = type === 'email' ? emailInput : mobileInput;
    referenceField.parentElement.insertAdjacentElement('afterend', container);
  }
}

// Function to verify OTP
function verifyOTP(type) {
  const otpInputField = document.getElementById(`${type}-otp-input`);
  const enteredOTP = otpInputField.value.trim();
  const correctOTP = type === 'email' ? staticEmailOTP : staticMobileOTP;
  const container = document.getElementById(`${type}-otp-container`);

  // Check if the entered OTP matches the static OTP
  if (enteredOTP === correctOTP) {
    // Display success message
    const successMsg = document.createElement('p');
    successMsg.textContent = `${type === 'email' ? 'Email' : 'Mobile'} Verified Successfully!`;
    successMsg.classList.add('success-message');

    // Clear the OTP input and show success
    container.innerHTML = '';
    container.appendChild(successMsg);

    if (type === 'email') emailVerified = true;
    if (type === 'mobile') mobileVerified = true;

    // Check if both OTPs are verified and enable Sign Up button
    if (emailVerified && mobileVerified) {
      document.getElementById('sign-up-submit').removeAttribute('disabled');
    }
  } else {
    // Display error message below OTP input without removing it
    let errorMsg = container.querySelector('.error-message');
    if (!errorMsg) {
      errorMsg = document.createElement('p');
      errorMsg.classList.add('error-message');
      container.appendChild(errorMsg);
    }
    errorMsg.textContent = 'Incorrect OTP. Please try again.';
  }
}

// Resend OTP
function resendOTP(type) {
  showNotification(`${type === 'email' ? 'Email' : 'Mobile'} OTP resent.`);
}

// Function to show error (display error message outside input field)
function showError(input, message) {
  const errorMsg = document.createElement('p');
  errorMsg.textContent = message;
  errorMsg.classList.add('error-message'); // Apply the CSS class for styling

  // Insert the error message below the input field
  input.parentElement.insertAdjacentElement('afterend', errorMsg);

  // Add error class to input field for styling (optional)
  input.parentElement.classList.add('error');

  // Remove the error message once the user starts typing
  input.addEventListener('input', () => {
    errorMsg.remove();
    input.parentElement.classList.remove('error'); // Remove the error class from input field
  });
}

// Function to clear previous error messages
function clearErrors() {
  const errorMsgs = document.querySelectorAll('.input-field + p');
  errorMsgs.forEach(msg => {
    msg.remove();
  });

  const errorInputs = document.querySelectorAll('.input-field');
  errorInputs.forEach(input => {
    input.classList.remove('error');
  });
}

// Function to validate email format
function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return regex.test(email);
}

// Function to validate email or mobile number (either of them is acceptable)
function validateEmailOrMobile(value) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const mobileRegex = /^[0-9]{10}$/; // Assuming mobile number is 10 digits
  return emailRegex.test(value) || mobileRegex.test(value);
}

// Function to validate mobile number
function validateMobileNumber(number) {
  const mobileRegex = /^[0-9]{10}$/; // Assuming mobile number is 10 digits
  return mobileRegex.test(number);
}

// Function to validate password format
function validatePassword(password) {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
  return regex.test(password);
}

const showPopup = document.querySelector('.show-popup');
const popupContainer = document.querySelector('.popup-container');
const closeBtn = document.querySelector('.close-btn');
showPopup.onclick = () => {
  popupContainer.classList.add('active');
}
closeBtn.onclick = () => {
  popupContainer.classList.remove('active');
}

document.addEventListener("DOMContentLoaded", () => {
  const notificationPopup = document.getElementById("notification-popup");
  const notificationMessage = document.getElementById("notification-message");
  const notificationCloseBtn = document.getElementById("notification-close-btn");

  const showNotification = (message) => {
    notificationMessage.textContent = message;
    notificationPopup.style.display = "flex";
  };

  const closeNotification = () => {
    notificationPopup.style.display = "none";
  };

  notificationCloseBtn.addEventListener("click", closeNotification);

  const forgotPasswordLink = document.getElementById("forgot-password-link");
  const forgotPasswordPopup = document.getElementById("forgot-password-popup");
  const closeForgotPopup = document.getElementById("close-forgot-popup");

  const sendOtpBtn = document.getElementById("send-otp-btn");
  const otpSection = document.getElementById("otp-section");
  const otpInput = document.getElementById("otp-input");
  const verifyOtpBtn = document.getElementById("verify-otp-btn");
  const resetPasswordSection = document.getElementById("reset-password-section");
  const resetPasswordBtn = document.getElementById("reset-password-btn");

  const emailError = document.getElementById("email-error");
  const otpError = document.getElementById("otp-error");
  const passwordError = document.getElementById("password-error");
  const confirmPasswordError = document.getElementById("confirm-password-error");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/;

  const temporaryOtp = "123456"; // Predefined temporary OTP

  // Show Forgot Password Popup
  forgotPasswordLink.addEventListener("click", () => {
    forgotPasswordPopup.style.display = "flex";
  });

  // Close Forgot Password Popup
  closeForgotPopup.addEventListener("click", () => {
    forgotPasswordPopup.style.display = "none";
  });

  // Show OTP Section
  sendOtpBtn.addEventListener("click", () => {
    const emailInput = document.getElementById("forgot-email").value;

    if (emailRegex.test(emailInput)) {
      emailError.style.display = "none";
      showNotification("OTP sent to your email.");
      otpSection.style.display = "block";  // Show OTP section
    } else {
      emailError.style.display = "block";
    }
  });

  // Verify OTP
  verifyOtpBtn.addEventListener("click", () => {
    const enteredOtp = otpInput.value;

    if (enteredOtp === temporaryOtp) {
        otpError.style.display = "none"; // Hide error message

        // Hide the entire OTP section (input box and buttons)
        otpSection.style.display = "none";

        // Hide the Send OTP button
        sendOtpBtn.style.display = "none";

        // Show success message above the Reset Password section
        const successMessage = document.createElement("span");
        successMessage.textContent = "OTP verified successfully!";
        successMessage.style.color = "green";
        successMessage.style.fontWeight = "bold";
        successMessage.style.marginBottom = "10px";

        // Insert the success message above the Reset Password section
        resetPasswordSection.parentElement.insertBefore(successMessage, resetPasswordSection);

        // Show the Reset Password section
        resetPasswordSection.style.display = "block";
    } else {
        otpError.style.display = "block"; // Show error message
    }
});




  
  // Reset Password
  document.getElementById("reset-password-btn").addEventListener("click", () => {
    const passwordInput = document.getElementById("new-password").value;
    const confirmPasswordInput = document.getElementById("confirm-new-password").value;

    const passwordError = document.getElementById("password-error");
    const confirmPasswordError = document.getElementById("confirm-password-error");

    // Password validation regex: Minimum 6 characters, at least one uppercase letter, one number, and the special character '@'
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@]).{6,}$/;


    // Reset error messages
    passwordError.style.display = "none";
    confirmPasswordError.style.display = "none";

    let isValid = true;

    // Validate new password
    if (!passwordRegex.test(passwordInput)) {
        passwordError.style.display = "block";
        isValid = false;
    }

    // Validate confirm password
    if (passwordInput !== confirmPasswordInput) {
        confirmPasswordError.style.display = "block";
        isValid = false;
    }

    // If validation passes, display success message
    if (isValid) {
        showNotification("Password reset successful!"); // Replace this with your success notification logic
        document.getElementById("reset-password-section").style.display = "none"; // Hide the reset password section
    }
});
resetPasswordBtn.addEventListener("click", () => {
  const passwordInput = document.getElementById("new-password").value;
  const confirmPasswordInput = document.getElementById("confirm-new-password").value;

  // Validate passwords
  if (passwordInput === confirmPasswordInput && passwordRegex.test(passwordInput)) {
      // Hide errors and display success notification
      passwordError.style.display = "none";
      confirmPasswordError.style.display = "none";
      showNotification("Password reset successful!");

      // Close the popup
      forgotPasswordPopup.style.display = "none";
  } else {
      // Show relevant errors
      if (!passwordRegex.test(passwordInput)) passwordError.style.display = "block";
      if (passwordInput !== confirmPasswordInput) confirmPasswordError.style.display = "block";
  }
});

// Toggle password visibility
document.querySelectorAll(".toggle-password").forEach((toggle) => {
    toggle.addEventListener("click", () => {
        const targetInput = document.getElementById(toggle.getAttribute("data-target"));
        if (targetInput.type === "password") {
            targetInput.type = "text";
            toggle.classList.add("visible"); // Optional: Add a class for visible state styling
        } else {
            targetInput.type = "password";
            toggle.classList.remove("visible");
        }
    });
});


// Toggle password visibility
document.querySelectorAll(".toggle-password").forEach((toggle) => {
    toggle.addEventListener("click", () => {
        const targetInput = document.getElementById(toggle.getAttribute("data-target"));
        if (targetInput.type === "password") {
            targetInput.type = "text";
            toggle.classList.add("visible"); // Optional: Add a class for visible state styling
        } else {
            targetInput.type = "password";
            toggle.classList.remove("visible");
        }
    });
});




});


document.addEventListener('DOMContentLoaded', () => {
  const loginTab = document.getElementById('login-tab');
  const registerTab = document.getElementById('register-tab');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const otpForm = document.getElementById('otp-form');
  const forgotPasswordForm = document.getElementById('forgot-password-form');
  const forms = document.querySelectorAll('form');
  const errorElements = document.querySelectorAll('.error'); // Assuming error messages have the 'error' class

  function resetForms() {
      forms.forEach(form => form.reset());
      errorElements.forEach(error => error.style.display = 'none'); // Hide error messages
  }

  function resetPopups() {
      // Assuming popups have a class '.popup' or specific identifiers
      const popups = document.querySelectorAll('.popup');
      popups.forEach(popup => popup.style.display = 'none'); // Hide popups if any
  }

  // Function to handle tab switching
  function handleTabSwitch(activeForm, inactiveForm) {
      resetForms();
      resetPopups();
      activeForm.classList.add('active');
      inactiveForm.classList.remove('active');
  }

  // Event listeners for tab switching
  loginTab.addEventListener('click', () => {
      handleTabSwitch(loginForm, registerForm);
  });

  registerTab.addEventListener('click', () => {
      handleTabSwitch(registerForm, loginForm);
  });

  // Handling form submission
  document.querySelectorAll('.form button[type="submit"]').forEach(button => {
      button.addEventListener('click', () => {
          setTimeout(() => {
              resetForms();
              resetPopups();
          }, 100);
      });
  });
});


