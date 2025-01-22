// DOM Elements
const popupContainer = document.querySelector('.popup-container');
const showPopupTriggers = document.querySelectorAll('.show-popup');
const closeButtons = document.querySelectorAll('.close-btn');
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
// const signUpForm = document.querySelector('#sign-up-form');
const signInForm = document.querySelector('#sign-in-form');
const forgotPasswordLink = document.querySelector('#forgot-password-link');
const forgotPasswordPopup = document.querySelector('#forgot-password-popup');
const closeForgotPopup = document.querySelector('#close-forgot-popup');
const sendOtpBtn = document.querySelector('#send-otp-btn');
const otpSection = document.querySelector('#otp-section');
const otpInput = document.querySelector('#otp-input');
const verifyOtpBtn = document.querySelector('#verify-otp-btn');
const resendOtpBtn = document.querySelector('#resend-btn');
const resetPasswordSection = document.querySelector('#reset-password-section');
const resetPasswordBtn = document.querySelector('#reset-password-btn');
const notificationPopup = document.querySelector('#notification-popup');
const notificationMessage = document.querySelector('#notification-message');
const notificationCloseBtn = document.querySelector('#notification-close-btn');

// Utility Functions
const showNotification = (message) => {
  notificationMessage.textContent = message;
  notificationPopup.style.display = 'flex';
};

// Generic Popup Toggle
const togglePopup = (popup) => {
  popup.style.display = popup.style.display === 'none' || !popup.style.display ? 'flex' : 'none';
};

// Close Notification
notificationCloseBtn.addEventListener('click', () => {
  notificationPopup.style.display = 'none';
});

// Toggle Login/Register Mode
sign_up_btn.addEventListener('click', () => {
  container.classList.add('sign-up-mode');
  forgotPasswordPopup.style.display = 'none';
  resetForgotPasswordPopup();
  resetForms();
});

sign_in_btn.addEventListener('click', () => {
  container.classList.remove('sign-up-mode');
  forgotPasswordPopup.style.display = 'none';
  resetForgotPasswordPopup();
  resetForms();
});

// Show/Hide Main Popup
showPopupTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    popupContainer.classList.add('open', 'active');
    resetForms();
  });
});

// Close Popups (Main and Forgot Password)
// Function to reset Forgot Password Popup
function resetForgotPasswordPopup() {
  otpSection.style.display = 'none';
  resetPasswordSection.style.display = 'none';
  forgotPasswordPopup.style.display = 'none';
  forgotPasswordPopup.querySelector('form').reset(); // Reset form inputs
  
  // Reset custom state variables if any
  currentStep = 'initial'; // Example step tracking
}

// Event listener for close buttons
closeButtons.forEach(btn => {
  btn.addEventListener('click', (event) => {
    if (event.target.closest('#forgot-password-popup')) {
      // Close and reset Forgot Password Popup
      forgotPasswordPopup.style.display = 'none';
      resetForgotPasswordPopup();
    } else if (event.target.closest('.popup-container')) {
      // Close Main Popup and reset all states
      popupContainer.classList.remove('open', 'active');
      resetForgotPasswordPopup();
      resetForms();
    }
  });
});

// Reset Forgot Password Popup Function
function resetForgotPasswordPopup() {
  // Reset Forgot Password Section
  document.getElementById('forgot-email').value = '';
  document.getElementById('email-error').style.display = 'none';

  // Reset OTP Section
  document.getElementById('otp-input').value = '';
  document.getElementById('otp-section').style.display = 'none';
  document.getElementById('resend-otp').style.display = 'none';
  document.getElementById('otp-error').style.display = 'none';
  document.getElementById('otp-success').style.display = 'none';

  // Reset Reset Password Section
  document.getElementById('new-password').value = '';
  document.getElementById('confirm-new-password').value = '';
  document.getElementById('password-error').style.display = 'none';
  document.getElementById('confirm-password-error').style.display = 'none';
  document.getElementById('reset-password-section').style.display = 'none';

  // Reset Email OTP Section
  document.getElementById('email-otp').value = '';
  document.getElementById('email-otp').style.display = 'none';
  document.getElementById('send-email-otp').style.display = 'none';
  document.getElementById('verify-email-otp').style.display = 'none';
  document.getElementById('resend-email-otp').style.display = 'none';


  // Reset Mobile OTP Section
  document.getElementById('mobile-otp').value = '';
  document.getElementById('mobile-otp').style.display = 'none';
  document.getElementById('send-mobile-otp').style.display = 'none';
  document.getElementById('verify-mobile-otp').style.display = 'none';
  document.getElementById('resend-mobile-otp').style.display = 'none';

}

// Reset Login and Register Forms
function resetForms() {
  const loginForm = document.getElementById('sign-in-form');
  const registerForm = document.getElementById('sign-up-form');
  if (loginForm) loginForm.reset();
  if (registerForm) registerForm.reset();
}

// Close Popups when clicking outside
popupContainer.addEventListener('click', (event) => {
  if (event.target === popupContainer) {
    popupContainer.classList.remove('open', 'active');
    forgotPasswordPopup.style.display = 'none';
    otpSection.style.display = 'none';
    resetPasswordSection.style.display = 'none';
  }
});

forgotPasswordPopup.addEventListener('click', (event) => {
  if (event.target === forgotPasswordPopup) {
    forgotPasswordPopup.style.display = 'none';
  }
});

// Forgot Password Popup Toggle
forgotPasswordLink.addEventListener('click', () => {
  forgotPasswordPopup.style.display = 'flex';
});

closeForgotPopup.addEventListener('click', () => {
  forgotPasswordPopup.style.display = 'none';
});

// Get elements
const forgotEmailInput = document.getElementById("forgot-email");

const newPasswordInput = document.getElementById("new-password");
const confirmNewPasswordInput = document.getElementById("confirm-new-password");
const emailError = document.getElementById("email-error");
const otpError = document.getElementById("otp-error");
const otpSuccess = document.getElementById("otp-success");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirm-password-error");

const emailSection = document.getElementById("email-section");

// Function to reset the forgot password form
function resetForgotPasswordForm() {
  forgotEmailInput.value = "";
  otpInput.value = "";
  newPasswordInput.value = "";
  confirmNewPasswordInput.value = "";
  emailError.style.display = "none";
  otpError.style.display = "none";
  otpSuccess.style.display = "none";
  passwordError.style.display = "none";
  confirmPasswordError.style.display = "none";

  // Show only the email section
  emailSection.style.display = "block";  // Show email input section
  otpSection.style.display = "none";    // Hide OTP section
  resetPasswordSection.style.display = "none";  // Hide reset password section
}


// Email validation
function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9.]+@gmail\.com$/;
  return emailPattern.test(email);
}

// Password validation
function validatePassword(password) {
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/;
  return passwordPattern.test(password);
}

// Open forgot password popup
document.getElementById("forgot-password-link").addEventListener("click", () => {
  // Reset the form to email section when popup is opened
  resetForgotPasswordForm();
  forgotPasswordPopup.style.display = "block"; // Show the popup
});

// Email validation when sending OTP
sendOtpBtn.addEventListener("click", () => {
  const email = forgotEmailInput.value;
  
  // Check if email is empty
  if (!email) {
    showNotification("Email is required.");
    return;
  }
  
  // Validate email format
  if (!validateEmail(email)) {
    emailError.style.display = "block";
    showNotification("Please enter a valid Gmail address!");
    return;
  } else {
    emailError.style.display = "none";
    
    // Simulate sending OTP (You can replace this with real OTP sending logic)
    showNotification("OTP sent to your email!", "success");
    otpSection.style.display = "block"; // Show OTP section
    emailSection.style.display = "none"; // Hide email section
    resetPasswordSection.style.display = "none"; // Keep Reset Password section hidden until OTP is verified
  }
});

// OTP verification
verifyOtpBtn.addEventListener("click", () => {
  const otp = otpInput.value;
  
  // Simulate OTP verification (Replace with real OTP verification logic)
  if (otp !== "123456") {  // Example OTP for testing
    otpError.style.display = "block";
    otpSuccess.style.display = "none";
    showNotification("Incorrect OTP. Please try again.");
  } else {
    otpError.style.display = "none";
    otpSuccess.style.display = "block";
    showNotification("OTP verified successfully!", "success");
    resetPasswordSection.style.display = "block"; // Show reset password section only after OTP is verified
    otpSection.style.display = "none"; // Hide OTP section
  }
});

// Reset password validation
resetPasswordBtn.addEventListener("click", () => {
  const newPassword = newPasswordInput.value;
  const confirmPassword = confirmNewPasswordInput.value;

  // Validate password
  if (!newPassword || !validatePassword(newPassword)) {
    passwordError.style.display = "block";
    showNotification("Password must be at least 6 characters, include one uppercase letter, one number, and one special character.");
    return;
  } else {
    passwordError.style.display = "none";
  }

  // Confirm password match
  if (newPassword !== confirmPassword) {
    confirmPasswordError.style.display = "block";
    showNotification("Passwords do not match!");
    return;
  } else {
    confirmPasswordError.style.display = "none";
  }

  // If all validations pass
  showNotification("Password reset successfully!", "success");
  
  // Close the popup and reset form
  closeForgotPasswordPopup(); // Close and reset form
});

// Close forgot password popup
document.getElementById("close-forgot-popup").addEventListener("click", closeForgotPasswordPopup);

function closeForgotPasswordPopup() {
  forgotPasswordPopup.style.display = "none"; // Close the popup immediately
  resetForgotPasswordForm(); // Reset the form after closing
}


// DOM Elements

// Utility function to show notifications
// function showNotification(message, type = "error") {
//   const notification = document.createElement("div");
//   notification.className = `notification ${type}`;
//   notification.textContent = message;
//   document.body.appendChild(notification);

//   setTimeout(() => {
//     notification.remove();
//   }, 3000);
// }

// Form validation
const form = document.getElementById("sign-up-form");
const emailOtpInput = document.getElementById("email-otp");
const mobileOtpInput = document.getElementById("mobile-otp");
const sendEmailOtpBtn = document.getElementById("send-email-otp");
const verifyEmailOtpBtn = document.getElementById("verify-email-otp");
const resendEmailOtpBtn = document.getElementById("resend-email-otp");
const sendMobileOtpBtn = document.getElementById("send-mobile-otp");
const verifyMobileOtpBtn = document.getElementById("verify-mobile-otp");
const resendMobileOtpBtn = document.getElementById("resend-mobile-otp");
const termsCheckbox = document.getElementById("terms-checkbox");

let emailOtpVerified = false;
let mobileOtpVerified = false;
// Show Email OTP button when a valid email is entered
const emailInput = document.getElementById("sign-up-email");
emailInput.addEventListener("input", () => {
  if (/^[a-zA-Z0-9.]+@gmail\.com$/.test(emailInput.value)) {
    sendEmailOtpBtn.style.display = "block";
  } else {
    sendEmailOtpBtn.style.display = "none";
  }
});

// Show Mobile OTP button when a valid mobile number is entered
const mobileInput = document.getElementById("mobile-number");
mobileInput.addEventListener("input", () => {
  if (/^\d{10}$/.test(mobileInput.value)) {
    sendMobileOtpBtn.style.display = "block";
  } else {
    sendMobileOtpBtn.style.display = "none";
  }
});
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const fullName = document.getElementById("full-name").value.trim();
  const email = document.getElementById("sign-up-email").value.trim();
  const mobileNumber = document.getElementById("mobile-number").value.trim();
  const password = document.getElementById("password-input").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const role = document.querySelector("input[name='role']:checked");

  // Input validation
  if (!fullName) {
    showNotification("Full Name is required.");
    return;
  }

  if (!/^[a-zA-Z ]+$/.test(fullName)) {
    showNotification("Full Name must contain only letters and spaces.");
    return;
  }

  if (!email) {
    showNotification("Email is required.");
    return;
  }

  if (!/^[a-zA-Z0-9.]+@gmail\.com$/.test(email)) {
    showNotification("Invalid email format.");
    return;
  }

  if (!emailOtpVerified) {
    showNotification("Email OTP verification is required.");
    return;
  }

  if (!mobileNumber) {
    showNotification("Mobile Number is required.");
    return;
  }

  if (!/^\d{10}$/.test(mobileNumber)) {
    showNotification("Invalid Mobile Number. It must be 10 digits.");
    return;
  }

  if (!mobileOtpVerified) {
    showNotification("Mobile OTP verification is required.");
    return;
  }

  // Check if password is provided
if (!password) {
  showNotification("Password is required.");
  return;
}

// Check if password is at least 6 characters long
// if (password.length < 6) {
//   showNotification("Password must be at least 6 characters long.");
//   return;
// }

// Check if password contains at least one uppercase letter, one number, and one special character
const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/;
if (!passwordPattern.test(password)) {
  showNotification("Password must contain at least one uppercase letter, one number, and one special character andat least 6 character long.");
  return;
}

// Check if passwords match
if (password !== confirmPassword) {
  showNotification("Passwords do not match.");
  return;
}

  if (!role) {
    showNotification("Please select a role.");
    return;
  }

  if (!termsCheckbox.checked) {
    showNotification("You must accept the Terms and Conditions.");
    return;
  }

  let redirectUrl = '';
  switch (role.value) {
    case 'contractor':
      showNotification('Registration successful! Redirecting to your homepage...');
      redirectUrl = '../html/contractorshomepage.html';
      break;
    case 'builder':
      showNotification('Registration successful! Redirecting to your homepage...');
      redirectUrl = '../html/builderhomepage.html';
      break;
    case 'customer':
      showNotification('Registration successful! Redirecting to your dashboard...');
      redirectUrl = '../html/customerhomepage.html';
      break;
    case 'buyer':
      showNotification('Registration successful! Redirecting to your dashboard...');
      redirectUrl = '../html/buyerhome.html';
      break;
    case 'seller':
      showNotification('Registration successful! Redirecting to your dashboard...');
      redirectUrl = '/html/sellerhome.html';
      break;
    case 'renter':
      showNotification('Registration successful! Redirecting to your dashboard...');
      redirectUrl = '/html/rentorhome.html';
      break;
    case 'tenant':
      showNotification('Registration successful! Redirecting to your dashboard...');
      redirectUrl = '/dashboard/tenanthome.html';
      break;
    case 'agent':
      showNotification('Registration successful! Redirecting to your dashboard...');
      redirectUrl = '/html/agenthoe.html';
      break;
    default:
      showNotification('Something went wrong. Please try again.');
      return;
  }

  setTimeout(() => {
    window.location.href = redirectUrl;
  }, 2500);

  form.reset();
  emailOtpVerified = false;
  mobileOtpVerified = false;
});

// Email OTP functionality
sendEmailOtpBtn.addEventListener("click", () => {
  sendEmailOtpBtn.style.display = "none";
  emailOtpInput.style.display = "block";
  verifyEmailOtpBtn.style.display = "block";
  resendEmailOtpBtn.style.display = "block";
  startOtpTimer("email-timer", resendEmailOtpBtn);
  showNotification("Email OTP sent!", "success");
});

verifyEmailOtpBtn.addEventListener("click", () => {
  if (emailOtpInput.value === "123456") {
    emailOtpVerified = true;
    showNotification("Email OTP verified!", "success");
    
    // Hide OTP system after verification
    sendEmailOtpBtn.style.display = "none";
    emailOtpInput.style.display = "none";
    verifyEmailOtpBtn.style.display = "none";
    resendEmailOtpBtn.style.display = "none";
  } else {
    showNotification("Invalid Email OTP.");
  }
});

// Mobile OTP functionality
sendMobileOtpBtn.addEventListener("click", () => {
  sendMobileOtpBtn.style.display = "none";
  mobileOtpInput.style.display = "block";
  verifyMobileOtpBtn.style.display = "block";
  resendMobileOtpBtn.style.display = "block";
  startOtpTimer("mobile-timer", resendMobileOtpBtn);
  showNotification("Mobile OTP sent!", "success");
});

verifyMobileOtpBtn.addEventListener("click", () => {
  if (mobileOtpInput.value === "654321") {
    mobileOtpVerified = true;
    showNotification("Mobile OTP verified!", "success");

    // Hide OTP system after verification
    sendMobileOtpBtn.style.display = "none";
    mobileOtpInput.style.display = "none";
    verifyMobileOtpBtn.style.display = "none";
    resendMobileOtpBtn.style.display = "none";
  } else {
    showNotification("Invalid Mobile OTP.");
  }
});


// OTP timer function
function startOtpTimer(timerId, resendBtn) {
  let timeLeft = 60;
  const timer = document.getElementById(timerId);
  const interval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timer.textContent = timeLeft;
    } else {
      clearInterval(interval);
      resendBtn.disabled = false;
      timer.textContent = "20";
    }
  }, 1000);
}








// Sign-In Form Validation
signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const emailOrMobile = document.querySelector('#sign-in-email').value.trim();
    const pwsd = document.querySelector('#sign-in-password').value.trim();
  
    // Validate email or mobile number
    if (!emailOrMobile) {
      showNotification('Please enter your email or mobile number.');
      return;
    }
  
    // Check if the input is a valid email or mobile number
    const isEmail = /^[a-zA-Z0-9.]+@gmail\.com$/.test(emailOrMobile);  // Assuming Gmail is required for email
    const isMobile = /^\d{10}$/.test(emailOrMobile);  // Mobile number should be 10 digits
  
    if (!isEmail && !isMobile) {
      showNotification('Please enter a valid email address or a valid 10-digit mobile number.');
      return;
    }
  
    // Validate password
    if (!pwsd) {
      showNotification('Please enter your password.');
      return;
    }
  
    // Optional password strength validation (minimum length, uppercase, special characters, etc.)
    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/.test(pwsd)) {
      showNotification('Email or Password is not matching.');
      return;
    }
  
    showNotification('Login successful!');
    document.querySelector('.nav-profile').innerHTML="Vijay";
    document.getElementById("sidebar-login").innerHTML="Vijay";
    document.getElementById("change-user-type-side").style.display="block";
    document.getElementById("myactivity-logout-side").style.opacity='1';

    // Close the popup container after successful login
const popupContainer = document.querySelector('.popup-container');
if (popupContainer) {
  popupContainer.classList.remove('open', 'active');
}

// ...

// Reopen the popup container
const showPopupTriggers = document.querySelectorAll('.show-popup');
showPopupTriggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    popupContainer.classList.add('open', 'active');
  });
});

    
    // Clear the form
    signInForm.reset();
  });
  








  

  