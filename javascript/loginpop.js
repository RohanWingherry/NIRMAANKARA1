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
    alert("Sign In Successful");
  }
});

// Sign Up Form Validation
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
    // roleError.textContent = 'Please select a role to register';
    roleError.classList.add('error-message');
    document.querySelector('.radio-group').insertAdjacentElement('afterend', roleError);
    valid = false;
  }

  if (valid) {
    // Trigger OTP verification for email and mobile
    if (!emailVerified) showOTPVerification('email');
    if (!mobileVerified) showOTPVerification('mobile');

    // If both OTPs are verified, show success message
    if (emailVerified && mobileVerified) {
      alert("Sign Up Successful");
    }
  }
});


// Function to show OTP verification process
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
    const referenceField = type === 'email' ? document.getElementById('sign-up-email') : document.getElementById('mobile-number');
    referenceField.parentElement.insertAdjacentElement('afterend', container);
  }
}

// Function to verify OTP
function verifyOTP(type) {
  const otpInputField = document.getElementById(`${type}-otp-input`);
  const enteredOTP = otpInputField.value.trim();
  const correctOTP = type === 'email' ? staticEmailOTP : staticMobileOTP;

  const container = document.getElementById(`${type}-otp-container`);

  if (enteredOTP === correctOTP) {
    const successMsg = document.createElement('p');
    successMsg.textContent = `${type === 'email' ? 'Email' : 'Mobile'} Verified Successfully!`;
    successMsg.classList.add('success-message');

    // Remove OTP input and buttons
    container.innerHTML = '';
    container.appendChild(successMsg);

    if (type === 'email') emailVerified = true;
    if (type === 'mobile') mobileVerified = true;

    // Check if both OTPs are verified and enable Sign Up button
    if (emailVerified && mobileVerified) {
      document.getElementById('sign-up-submit').removeAttribute('disabled');
    }
  } else {
    showError(otpInputField, 'Incorrect OTP. Please try again.');
  }
}

// Function to resend OTP
function resendOTP(type) {
  const correctOTP = type === 'email' ? staticEmailOTP : staticMobileOTP;
  alert(`${type === 'email' ? 'Email' : 'Mobile'} OTP resent. `);
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
          const verifyOtpBtn = document.getElementById("verify-otp-btn");
          const resetPasswordSection = document.getElementById("reset-password-section");
          const resetPasswordBtn = document.getElementById("reset-password-btn");
      
          const emailError = document.getElementById("email-error");
          const otpError = document.getElementById("otp-error");
          const otpSuccess = document.getElementById("otp-success");
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
                  otpSection.style.display = "block";
              } else {
                  emailError.style.display = "block";
              }
          });
      
          // Verify OTP
          // Verify OTP
      verifyOtpBtn.addEventListener("click", () => {
          const enteredOtp = document.getElementById("otp-input").value;
      
          if (enteredOtp === temporaryOtp) {
              otpError.style.display = "none";
              document.getElementById("otp-actions").style.display = "none"; // Hide OTP actions (if applicable)
              otpSuccess.style.display = "block";
              otpSuccess.textContent = "OTP Verified ✔"; // Update success message with a green check
              otpSuccess.style.color = "green"; // Make the text green
      
              sendOtpBtn.style.display = "none"; // Hide the "Send OTP" button
      
              showNotification("OTP verified successfully!");
      
              setTimeout(() => {
                  otpSuccess.style.display = "none"; // Hide success message after a delay
                  otpSection.style.display = "none";
                  resetPasswordSection.style.display = "block";
              }, 2000);
          } else {
              otpError.style.display = "block"; // Show OTP error
              otpError.textContent = "Incorrect OTP. Please try again.";
          }
      });
      
          // Reset Password with Validation
          resetPasswordBtn.addEventListener("click", () => {
              const newPassword = document.getElementById("new-password").value;
              const confirmPassword = document.getElementById("confirm-new-password").value;
      
              let valid = true;
      
              if (!passwordRegex.test(newPassword)) {
                  passwordError.style.display = "block";
                  valid = false;
              } else {
                  passwordError.style.display = "none";
              }
      
              if (newPassword !== confirmPassword) {
                  confirmPasswordError.style.display = "block";
                  valid = false;
              } else {
                  confirmPasswordError.style.display = "none";
              }
      
              if (valid) {
                  showNotification("Password reset successfully!");
                  resetPasswordSection.style.display = "none";
                  forgotPasswordPopup.style.display = "none";
              }
          });
      });
      