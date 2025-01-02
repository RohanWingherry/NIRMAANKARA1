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

// Forgot Password - Send OTP
sendOtpBtn.addEventListener('click', () => {
  const emailInput = document.querySelector('#forgot-email');
  const emailError = document.querySelector('#email-error');
  const email = emailInput.value.trim();

  if (!/^[\w.%+-]+@gmail\.com$/.test(email)) {
    emailError.style.display = 'block';
    return;
  }

  emailError.style.display = 'none';
  otpSection.style.display = 'block';
  showNotification('OTP sent to your email!');
});

// Verify OTP
verifyOtpBtn.addEventListener('click', () => {
  const otpSuccessMessage = document.querySelector('#otp-success');
  const otpErrorMessage = document.querySelector('#otp-error');
  
  if (otpInput.value.trim() === '123456') {
    // Display success message
    otpSuccessMessage.textContent = 'OTP successfully verified!';
    otpSuccessMessage.style.display = 'block';
    otpSuccessMessage.style.color = 'green';
    
    otpErrorMessage.style.display = 'none';
    resetPasswordSection.style.display = 'block';
    
    // Hide OTP-related sections after successful verification
    sendOtpBtn.style.display = 'none';
    otpSection.style.display = 'none';
    verifyOtpBtn.style.display = 'none';
    otpInput.style.display = 'none';
    resendOtpBtn.style.display = 'none';
  } else {
    otpErrorMessage.textContent = 'Invalid OTP. Please try again.';
    otpErrorMessage.style.display = 'block';
    otpErrorMessage.style.color = 'red';
    
    otpSuccessMessage.style.display = 'none';
  }
});

// Resend OTP
resendOtpBtn.addEventListener('click', () => {
  showNotification('OTP has been resent!');
});

// Reset Password
resetPasswordBtn.addEventListener('click', () => {
  const newPassword = document.querySelector('#new-password').value.trim();
  const confirmNewPassword = document.querySelector('#confirm-new-password').value.trim();
  const passwordError = document.querySelector('#password-error');
  const confirmPasswordError = document.querySelector('#confirm-password-error');

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{6,}$/;

  if (!passwordRegex.test(newPassword)) {
    passwordError.style.display = 'block';
    return;
  } else {
    passwordError.style.display = 'none';
  }

  if (newPassword !== confirmNewPassword) {
    confirmPasswordError.style.display = 'block';
  } else {
    confirmPasswordError.style.display = 'none';
    showNotification('Password has been reset successfully!');
    togglePopup(forgotPasswordPopup);
  }
});

// DOM Elements

const sendEmailOtpBtn = document.querySelector('#send-email-otp');
const sendMobileOtpBtn = document.querySelector('#send-mobile-otp');
const verifyEmailOtpBtn = document.querySelector('#verify-email-otp');
const verifyMobileOtpBtn = document.querySelector('#verify-mobile-otp');
const emailOtpInput = document.querySelector('#email-otp');
const mobileOtpInput = document.querySelector('#mobile-otp');
const emailOtpSection = document.querySelector('#email-otp-section');
const mobileOtpSection = document.querySelector('#mobile-otp-section');
// const signUpForm = document.querySelector('#sign-up-form');
const emailInput = document.querySelector('#sign-up-email');
const mobileInput = document.querySelector('#mobile-number');

// Utility to show notifications
// const showNotification = (message) => {
//   alert(message); // Replace with a more user-friendly notification
// };
// Resend OTP Timer
// Function to handle the resend timer
const startResendTimer = (timerId, buttonId) => {
  let countdown = 10; // Timer duration in seconds
  const timerElement = document.querySelector(timerId);
  const resendButton = document.querySelector(buttonId);

  // Check if elements are correctly selected
  if (!timerElement || !resendButton) {
    console.error('Timer element or resend button not found.');
    return;
  }

  // Disable the resend button and ensure the timer is visible
  resendButton.disabled = true;
  timerElement.style.display = 'inline'; // Ensure the timer is visible

  const interval = setInterval(() => {
    if (countdown <= 0) {
      clearInterval(interval); // Stop the timer
      timerElement.textContent = ''; // Clear the timer text
      timerElement.style.display = 'none'; // Hide the timer element
      resendButton.disabled = false; // Enable the resend button
      resendButton.textContent = 'Resend OTP'; // Reset button text
    } else {
      timerElement.textContent = `Retry in ${countdown}s`; // Update timer text
      resendButton.textContent = `Resend (${countdown}s)`; // Update button text
      countdown--;
    }
  }, 1000);
};
// Email Input Listener - Show OTP section when valid email is entered
emailInput.addEventListener('input', () => {
  const email = emailInput.value.trim();
  
  if (/^[\w.%+-]+@gmail\.com$/.test(email)) {
    sendEmailOtpBtn.style.display = 'inline-block'; // Show the send OTP button
  } else {
    sendEmailOtpBtn.style.display = 'none'; // Hide the send OTP button if email is not valid
    emailOtpSection.style.display = 'none'; // Hide OTP section if email is invalid
  }
});

// Mobile Input Listener - Show OTP section when valid mobile number is entered
mobileInput.addEventListener('input', () => {
  const mobile = mobileInput.value.trim();
  
  if (/^\d{10}$/.test(mobile)) {
    sendMobileOtpBtn.style.display = 'inline-block'; // Show the send OTP button
  } else {
    sendMobileOtpBtn.style.display = 'none'; // Hide the send OTP button if mobile number is not valid
    mobileOtpSection.style.display = 'none'; // Hide OTP section if mobile number is invalid
  }
});

// Email OTP Functionality
let emailOtp = '';
sendEmailOtpBtn.addEventListener('click', () => {
  const email = emailInput.value.trim();
  
  if (!/^[\w.%+-]+@gmail\.com$/.test(email)) {
    showNotification('Please enter a valid Gmail address.');
    return;
  }
  
  // Generate a mock OTP (replace with actual OTP logic)
  emailOtp = '123456'; // You should generate a random OTP here
  showNotification('OTP sent to your email.');
  
  emailOtpInput.style.display = 'block';
  verifyEmailOtpBtn.style.display = 'inline-block';
  sendEmailOtpBtn.style.display = 'none';
  emailOtpSection.style.display = 'block'; // Show OTP section when OTP is sent

  // Start resend timer
  const resendEmailOtpBtn = document.querySelector('#resend-email-otp');
  resendEmailOtpBtn.style.display = 'inline-block';
  resendEmailOtpBtn.disabled = true; // Disable initially
  startResendTimer('#email-timer', '#resend-email-otp');
});
// Resend Email OTP
document.querySelector('#resend-email-otp').addEventListener('click', () => {
  emailOtp = '123456'; // Replace with actual OTP generation logic
  showNotification('A new OTP has been sent to your email.');

  // Restart timer
  startResendTimer('#email-timer', '#resend-email-otp');
});
// Email OTP Verification
verifyEmailOtpBtn.addEventListener('click', () => {
  const enteredOtp = emailOtpInput.value.trim();
  
  if (enteredOtp === emailOtp) {
    showNotification('Email OTP successfully verified!');
    emailOtpInput.disabled = true;
    emailOtpSection.style.display = 'none'; // Hide OTP section after verification
    mobileOtpSection.style.display = 'block'; // Show mobile OTP section after email OTP is verified
  } else {
    showNotification('Invalid OTP. Please try again.');
  }
});

// Mobile OTP Functionality
let mobileOtp = '';
sendMobileOtpBtn.addEventListener('click', () => {
  const mobile = mobileInput.value.trim();
  
  if (!/^\d{10}$/.test(mobile)) {
    showNotification('Please enter a valid 10-digit mobile number.');
    return;
  }
  
  // Generate a mock OTP (replace with actual OTP logic)
  mobileOtp = '654321'; // You should generate a random OTP here
  showNotification('OTP sent to your mobile.');
  
  mobileOtpInput.style.display = 'block';
  verifyMobileOtpBtn.style.display = 'inline-block';
  sendMobileOtpBtn.style.display = 'none';
  mobileOtpSection.style.display = 'block'; // Show OTP section when OTP is sent

  // Start resend timer
  const resendMobileOtpBtn = document.querySelector('#resend-mobile-otp');
  resendMobileOtpBtn.style.display = 'inline-block';
  resendMobileOtpBtn.disabled = true; // Disable initially
  startResendTimer('#mobile-timer', '#resend-mobile-otp');
});
// Resend Mobile OTP
document.querySelector('#resend-mobile-otp').addEventListener('click', () => {
  mobileOtp = '654321'; // Replace with actual OTP generation logic
  showNotification('A new OTP has been sent to your mobile.');

  // Restart timer
  startResendTimer('#mobile-timer', '#resend-mobile-otp');
});
// Mobile OTP Verification
verifyMobileOtpBtn.addEventListener('click', () => {
  const enteredOtp = mobileOtpInput.value.trim();
  
  if (enteredOtp === mobileOtp) {
    showNotification('Mobile OTP successfully verified!');
    mobileOtpInput.disabled = true;
    mobileOtpSection.style.display = 'none'; // Hide OTP section after verification
  } else {
    showNotification('Invalid OTP. Please try again.');
  }
});
// // Initialize timer on page load
// window.addEventListener('DOMContentLoaded', () => {
//   startResendTimer('#email-timer', '#resend-email-otp'); // For email
//   startResendTimer('#mobile-timer', '#resend-mobile-otp'); // For mobile
// });
// Final Registration Form Validation



const signUpForm = document.querySelector('#sign-up-form');
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = document.querySelector('#full-name').value.trim();
    const email = document.querySelector('#sign-up-email').value.trim();
    const mobileNumber = document.querySelector('#mobile-number').value.trim();
    const password = document.querySelector('.password-input').value.trim();
    const confirmPassword = document.querySelector('#confirm-password').value.trim(); // Fixed here
    const role = document.querySelector('input[name="role"]:checked'); // Ensure role is selected
    
    const emailOtp = document.querySelector('#email-otp').value.trim();
    const mobileOtp = document.querySelector('#mobile-otp').value.trim();
    // Validate Terms and Conditions
    const termsCheckbox = document.querySelector('#terms-checkbox');
    
    // Validate Full Name
    if (!fullName) {
        showNotification('Please enter your full name.');
        return;
    }
  
    // Validate Email
    if (!email) {
        showNotification('Please enter your email.');
        return;
    }

    // Email validation pattern
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        showNotification('Please enter a valid email address.');
        return;
    }

    // Email OTP Verification
    if (!emailOtp) {
        showNotification('Please enter the OTP sent to your email.');
        return;
    }

    // Validate Mobile Number
    if (!mobileNumber) {
        showNotification('Please enter your mobile number.');
        return;
    }

    const mobilePattern = /^\d{10}$/;
    if (!mobilePattern.test(mobileNumber)) {
        showNotification('Please enter a valid 10-digit mobile number.');
        return;
    }

    // Mobile OTP Verification
    if (!mobileOtp) {
        showNotification('Please enter the OTP sent to your mobile number.');
        return;
    }

    // Validate Password
    if (!password) {
        showNotification('Please enter your password.');
        return;
    }

    // Validate Password Strength
    const passwordStrengthPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{6,}$/;
    if (!passwordStrengthPattern.test(password)) {
        showNotification('Password must be at least 6 characters long, include 1 uppercase letter, 1 number, and 1 special character.');
        return;
    }

    // Validate Confirm Password
    if (!confirmPassword) {
        showNotification('Please confirm your password.');
        return;
    }

    if (password !== confirmPassword) {
        showNotification('Passwords do not match.');
        return;
    }

    // Validate Role
    if (!role) {
        showNotification('Please select your role.');
        return;
    }

    // Role-Based Navigation
    let redirectUrl = '';
    switch (role.value) {
        case 'contractor':
            showNotification('Registration successful! Redirecting to your homepage...');
            redirectUrl = 'contractorshomepage.html';  // Adjust path
            break;
        case 'customer':
            showNotification('Registration successful! Redirecting to your dashboard...');
            redirectUrl = 'customerhomepage.html';  // Adjust path
            break;
        case 'buyer':
            showNotification('Registration successful! Redirecting to your dashboard...');
            redirectUrl = 'buyerhome.html';  // Adjust path
            break;
        case 'seller':
            showNotification('Registration successful! Redirecting to your dashboard...');
            redirectUrl = '/dashboard/seller';  // Adjust path
            break;
        case 'renter':
            showNotification('Registration successful! Redirecting to your dashboard...');
            redirectUrl = '/dashboard/rentor';  // Adjust path
            break;
        case 'tenant':
            showNotification('Registration successful! Redirecting to your dashboard...');
            redirectUrl = '/dashboard/rentor';  // Adjust path
            break;
        case 'agent':
            showNotification('Registration successful! Redirecting to your dashboard...');
            redirectUrl = '/dashboard/rentor';  // Adjust path
            break;
        default:
            showNotification('Something went wrong. Please try again.');
            return;
    }
    
    if (!termsCheckbox.checked) {
      showNotification('You must accept the Terms and Conditions to register.');
      return;
  }
    // Show the success notification for 2 seconds before redirecting
    setTimeout(() => {
        window.location.href = redirectUrl;
    }, 2000); // Delay of 2 seconds (2000 milliseconds)

    // If all validations pass, proceed with registration (e.g., show success or submit form)
    showNotification('Registration successful!');
});




// Sign-In Form Validation
signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const emailOrMobile = document.querySelector('#sign-in-email').value.trim();
    const password = document.querySelector('#sign-in-password').value.trim();
  
    // Validate email or mobile number
    if (!emailOrMobile) {
      showNotification('Please enter your email or mobile number.');
      return;
    }
  
    // Check if the input is a valid email or mobile number
    const isEmail = /^[\w.%+-]+@gmail\.com$/.test(emailOrMobile);  // Assuming Gmail is required for email
    const isMobile = /^\d{10}$/.test(emailOrMobile);  // Mobile number should be 10 digits
  
    if (!isEmail && !isMobile) {
      showNotification('Please enter a valid email address or a valid 10-digit mobile number.');
      return;
    }
  
    // Validate password
    if (!password) {
      showNotification('Please enter your password.');
      return;
    }
  
    // Optional password strength validation (minimum length, uppercase, special characters, etc.)
    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{6,}$/.test(password)) {
      showNotification('Password must be at least 6 characters long, include 1 uppercase letter, 1 number, and 1 special character.');
      return;
    }
  
    showNotification('Login successful!');
    document.querySelector('.nav-profile').innerHTML="Vijay";

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
  








  

  