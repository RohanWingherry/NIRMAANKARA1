// document.addEventListener("DOMContentLoaded", function () {
//   const submitButton = document.querySelector(".submit-btn");
//   const fullName = document.querySelector("#full-name");
//   const emailInput = document.querySelector("#email");
//   const phoneInput = document.querySelector("#phone");
//   const passwordInput = document.querySelector("#password");
//   const confirmPasswordInput = document.querySelector("#confirm-password");
//   const agreeCheckbox = document.querySelector("#agree");

//   const nameError = document.getElementById("nameError");
//   const emailError = document.getElementById("emailError");
//   const phoneError = document.getElementById("phoneError");
//   const passwordError = document.getElementById("passwordError");
//   const confirmPasswordError = document.getElementById("confirmPasswordError");

//   function validateFullName() {
//     const nameRegex = /^[A-Za-z\s]+$/;
//     if (!nameRegex.test(fullName.value.trim())) {
//       fullName.classList.add("error");
//       nameError.textContent = "Full name should not contain numbers or special characters.";
//       return false;
//     } else {
//       fullName.classList.remove("error");
//       fullName.classList.add("valid");
//       nameError.textContent = "";
//       return true;
//     }
//   }

//   function validatePhoneNumber() {
//     const phoneRegex = /^[0-9]{10}$/;
//     if (!phoneRegex.test(phoneInput.value.trim())) {
//       phoneInput.classList.add("error");
//       phoneError.textContent = "Phone number must be exactly 10 digits.";
//       return false;
//     } else {
//       phoneInput.classList.remove("error");
//       phoneInput.classList.add("valid");
//       phoneError.textContent = "";
//       return true;
//     }
//   }

//   function validatePassword() {
//     if (passwordInput.value.length < 8) {
//       passwordInput.classList.add("error");
//       passwordError.textContent = "Password must be at least 8 characters long.";
//       return false;
//     } else if (!/[0-9]/.test(passwordInput.value)) {
//       passwordInput.classList.add("error");
//       passwordError.textContent = "Password must contain at least one number.";
//       return false;
//     } else if (!/[A-Z]/.test(passwordInput.value)) {
//       passwordInput.classList.add("error");
//       passwordError.textContent = "Password must contain at least one uppercase letter.";
//       return false;
//     } else if (!/[a-z]/.test(passwordInput.value)) {
//       passwordInput.classList.add("error");
//       passwordError.textContent = "Password must contain at least one lowercase letter.";
//       return false;
//     } else if (!/[!@#$%^&*?]/.test(passwordInput.value)) {
//       passwordInput.classList.add("error");
//       passwordError.textContent = "Password must contain at least one special character.";
//       return false;
//     } else {
//       passwordInput.classList.remove("error");
//       passwordInput.classList.add("valid");
//       passwordError.textContent = "";
//       return true;
//     }
//   }

//   function validateConfirmPassword() {
//     if (passwordInput.value !== confirmPasswordInput.value) {
//       confirmPasswordInput.classList.add("error");
//       confirmPasswordError.textContent = "Passwords do not match.";
//       return false;
//     } else {
//       confirmPasswordInput.classList.remove("error");
//       confirmPasswordInput.classList.add("valid");
//       confirmPasswordError.textContent = "";
//       return true;
//     }
//   }

//   submitButton.addEventListener("click", (e) => {
//     e.preventDefault();
    
//     let valid = true;

//     if (!validateFullName()) valid = false;
//     if (!validatePhoneNumber()) valid = false;
//     if (!validatePassword()) valid = false;
//     if (!validateConfirmPassword()) valid = false;

//     if (!agreeCheckbox.checked) {
//       alert("You must agree to the terms and conditions.");
//       valid = false;
//     }

//     if (valid) {
//       window.location.href = "../html/login.html";
//     }
//   });

//   // Toggle password visibility for password field
//   const togglePassword = document.querySelector(".toggle-password");
//   togglePassword.addEventListener("click", () => {
//     const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
//     passwordInput.setAttribute("type", type);
//     togglePassword.textContent = type === "password" ? "visibility" : "visibility_off";
//   });

//   // Toggle password visibility for confirm password field
//   const toggleConfirmPassword = document.querySelector(".toggle-confirm-password");
//   toggleConfirmPassword.addEventListener("click", () => {
//     const type = confirmPasswordInput.getAttribute("type") === "password" ? "text" : "password";
//     confirmPasswordInput.setAttribute("type", type);
//     toggleConfirmPassword.textContent = type === "password" ? "visibility" : "visibility_off";
//   });

//   // Real-time validation as the user types
//   fullName.addEventListener("input", validateFullName);
//   phoneInput.addEventListener("input", validatePhoneNumber);
//   passwordInput.addEventListener("input", validatePassword);
//   confirmPasswordInput.addEventListener("input", validateConfirmPassword);
// });

// // Select the login link element
// const loginLink = document.querySelector(".login-link");

// // Add click event listener
// loginLink.addEventListener("click", () => {
//     // Redirect to the login page
//     window.location.href = "../html/login.html";
// });



// document.addEventListener("DOMContentLoaded", function () {
//   // Form elements
//   const form = document.querySelector(".signup-form");
//   const fullName = document.getElementById("full-name");
//   const email = document.getElementById("email");
//   const phone = document.getElementById("phone");
//   const password = document.getElementById("password");
//   const confirmPassword = document.getElementById("confirm-password");
//   const terms = document.getElementById("terms");

//   // Error message elements
//   const nameError = document.getElementById("nameError");
//   const emailError = document.getElementById("emailError");
//   const phoneError = document.getElementById("phoneError");
//   const passwordError = document.getElementById("passwordError");
//   const confirmPasswordError = document.getElementById("confirmPasswordError");

//   // Regex patterns
//   const namePattern = /^[A-Za-z\s]+$/;
//   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const phonePattern = /^\d{10}$/;
//   const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

//   // Validation functions
//   function validateName() {
//     if (!fullName.value.trim()) {
//       nameError.textContent = "Full Name is required.";
//       return false;
//     } else if (!namePattern.test(fullName.value)) {
//       nameError.textContent = "Full Name must contain only letters and spaces.";
//       return false;
//     }
//     nameError.textContent = "";
//     return true;
//   }

//   function validateEmail() {
//     if (!email.value.trim()) {
//       emailError.textContent = "Email is required.";
//       return false;
//     } else if (!emailPattern.test(email.value)) {
//       emailError.textContent = "Enter a valid email address.";
//       return false;
//     }
//     emailError.textContent = "";
//     return true;
//   }

//   function validatePhone() {
//     if (!phone.value.trim()) {
//       phoneError.textContent = "Phone Number is required.";
//       return false;
//     } else if (!phonePattern.test(phone.value)) {
//       phoneError.textContent = "Phone Number must be 10 digits.";
//       return false;
//     }
//     phoneError.textContent = "";
//     return true;
//   }

//   function validatePassword() {
//     if (!password.value.trim()) {
//       passwordError.textContent = "Password is required.";
//       return false;
//     } else if (!strongPasswordPattern.test(password.value)) {
//       passwordError.textContent =
//         "Password must be at least 8 characters, include an uppercase, lowercase, number, and special character.";
//       return false;
//     }
//     passwordError.textContent = "";
//     return true;
//   }

//   function validateConfirmPassword() {
//     if (!confirmPassword.value.trim()) {
//       confirmPasswordError.textContent = "Please confirm your password.";
//       return false;
//     } else if (password.value !== confirmPassword.value) {
//       confirmPasswordError.textContent = "Passwords do not match.";
//       return false;
//     }
//     confirmPasswordError.textContent = "";
//     return true;
//   }

//   function validateTerms() {
//     if (!terms.checked) {
//       alert("You must agree to the Terms and Conditions.");
//       return false;
//     }
//     return true;
//   }

//   // OTP verification logic
//   async function sendOTP(type, value) {
//     try {
//       const response = await fetch(`/send-otp?type=${type}&value=${value}`);
//       const data = await response.json();
//       if (!data.success) throw new Error(data.message);
//       return true;
//     } catch (error) {
//       alert(`Failed to send OTP for ${type}: ${error.message}`);
//       return false;
//     }
//   }

//   async function verifyOTP(type) {
//     const otp = prompt(`Enter the OTP sent to your ${type}`);
//     try {
//       const response = await fetch(`/verify-otp?type=${type}&otp=${otp}`);
//       const data = await response.json();
//       if (!data.success) throw new Error(data.message);
//       alert(`${type} verified successfully.`);
//       return true;
//     } catch (error) {
//       alert(`OTP verification failed for ${type}: ${error.message}`);
//       return false;
//     }
//   }

//   // Form submission handler
//   form.addEventListener("submit", async function (e) {
//     e.preventDefault();

//     const isNameValid = validateName();
//     const isEmailValid = validateEmail();
//     const isPhoneValid = validatePhone();
//     const isPasswordValid = validatePassword();
//     const isConfirmPasswordValid = validateConfirmPassword();
//     const isTermsValid = validateTerms();

//     if (
//       isNameValid &&
//       isEmailValid &&
//       isPhoneValid &&
//       isPasswordValid &&
//       isConfirmPasswordValid &&
//       isTermsValid
//     ) {
//       // Send OTPs
//       const emailOTP = await sendOTP("email", email.value);
//       const phoneOTP = await sendOTP("phone", phone.value);

//       if (emailOTP && phoneOTP) {
//         const emailVerified = await verifyOTP("email");
//         const phoneVerified = await verifyOTP("phone");

//         if (emailVerified && phoneVerified) {
//           alert("Signup successful!");
//           form.reset();
//         }
//       }
//     }
//   });
// });


// document.addEventListener("DOMContentLoaded", function () {
//   // Input elements
//   const emailInput = document.getElementById("email");
//   const phoneInput = document.getElementById("phone");

//   // Buttons
//   const verifyEmailButton = document.getElementById("verifyEmailButton");
//   const verifyPhoneButton = document.getElementById("verifyPhoneButton");
//   const submitEmailOTPButton = document.getElementById("submitEmailOTP");
//   const submitPhoneOTPButton = document.getElementById("submitPhoneOTP");

//   // OTP Sections
//   const emailOTPSection = document.getElementById("emailOTPSection");
//   const phoneOTPSection = document.getElementById("phoneOTPSection");

//   // Error elements
//   const emailError = document.getElementById("emailError");
//   const phoneError = document.getElementById("phoneError");
//   const emailOTPError = document.getElementById("emailOTPError");
//   const phoneOTPError = document.getElementById("phoneOTPError");

//   // OTPs for validation
//   let emailOTP = "";
//   let phoneOTP = "";

//   // Validation functions
//   function validateEmail() {
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailInput.value.trim()) {
//       emailError.textContent = "Email is required.";
//       return false;
//     } else if (!emailPattern.test(emailInput.value)) {
//       emailError.textContent = "Enter a valid email address.";
//       return false;
//     }
//     emailError.textContent = "";
//     return true;
//   }

//   function validatePhone() {
//     const phonePattern = /^\d{10}$/;
//     if (!phoneInput.value.trim()) {
//       phoneError.textContent = "Phone Number is required.";
//       return false;
//     } else if (!phonePattern.test(phoneInput.value)) {
//       phoneError.textContent = "Phone Number must be 10 digits.";
//       return false;
//     }
//     phoneError.textContent = "";
//     return true;
//   }

//   // Generate a random 6-digit OTP
//   function generateOTP() {
//     return Math.floor(100000 + Math.random() * 900000).toString();
//   }

//   // Enable the verify button when valid input is entered
//   emailInput.addEventListener("input", function () {
//     if (validateEmail()) {
//       verifyEmailButton.disabled = false;
//     } else {
//       verifyEmailButton.disabled = true;
//     }
//   });

//   phoneInput.addEventListener("input", function () {
//     if (validatePhone()) {
//       verifyPhoneButton.disabled = false;
//     } else {
//       verifyPhoneButton.disabled = true;
//     }
//   });

//   // OTP Verification flow
//   verifyEmailButton.addEventListener("click", function () {
//     emailOTP = generateOTP();
//     alert(`Your email OTP is: ${emailOTP}`);
//     emailOTPSection.style.display = "block";
//   });

//   verifyPhoneButton.addEventListener("click", function () {
//     phoneOTP = generateOTP();
//     alert(`Your phone OTP is: ${phoneOTP}`);
//     phoneOTPSection.style.display = "block";
//   });

//   submitEmailOTPButton.addEventListener("click", function () {
//     if (document.getElementById("emailOTPInput").value === emailOTP) {
//       emailOTPError.textContent = "Email verified successfully!";
//       emailOTPError.style.color = "green";
//       emailOTPSection.style.display = "none";
//     } else {
//       emailOTPError.textContent = "Invalid OTP. Please try again.";
//       emailOTPError.style.color = "red";
//     }
//   });

//   submitPhoneOTPButton.addEventListener("click", function () {
//     if (document.getElementById("phoneOTPInput").value === phoneOTP) {
//       phoneOTPError.textContent = "Phone verified successfully!";
//       phoneOTPError.style.color = "green";
//       phoneOTPSection.style.display = "none";
//     } else {
//       phoneOTPError.textContent = "Invalid OTP. Please try again.";
//       phoneOTPError.style.color = "red";
//     }
//   });
// });


// document.addEventListener("DOMContentLoaded", function () {
//   // Input elements
//   const emailInput = document.getElementById("email");
//   const phoneInput = document.getElementById("phone");
//   const passwordInput = document.getElementById("password");
//   const confirmPasswordInput = document.getElementById("confirm-password");

//   // Buttons
//   const verifyEmailButton = document.getElementById("verifyEmailButton");
//   const verifyPhoneButton = document.getElementById("verifyPhoneButton");
//   const submitEmailOTPButton = document.getElementById("submitEmailOTP");
//   const submitPhoneOTPButton = document.getElementById("submitPhoneOTP");

//   // OTP Sections
//   const emailOTPSection = document.getElementById("emailOTPSection");
//   const phoneOTPSection = document.getElementById("phoneOTPSection");

//   // Error elements
//   const emailError = document.getElementById("emailError");
//   const phoneError = document.getElementById("phoneError");
//   const emailOTPError = document.getElementById("emailOTPError");
//   const phoneOTPError = document.getElementById("phoneOTPError");
//   const passwordError = document.getElementById("passwordError");
//   const confirmPasswordError = document.getElementById("confirmPasswordError");

//   // Hardcoded OTPs
//   const HARD_CODED_OTP = "123456";

//   // Validation functions
//   function validateEmail() {
//     const emailPattern = /^[^\s@]+@gmail\.com$/;
//     if (!emailInput.value.trim()) {
//       emailError.textContent = "Email is required.";
//       return false;
//     } else if (!emailPattern.test(emailInput.value)) {
//       emailError.textContent = "Enter a valid email address.";
//       return false;
//     }
//     emailError.textContent = "";
//     return true;
//   }

//   function validatePhone() {
//     const phonePattern = /^\d{10}$/;
//     if (!phoneInput.value.trim()) {
//       phoneError.textContent = "Phone Number is required.";
//       return false;
//     } else if (!phonePattern.test(phoneInput.value)) {
//       phoneError.textContent = "Phone Number must be 10 digits.";
//       return false;
//     }
//     phoneError.textContent = "";
//     return true;
//   }

//   function validatePassword() {
//     const password = passwordInput.value.trim();
//     const minLength = 8;
//     const hasUpperCase = /[A-Z]/.test(password);
//     const hasLowerCase = /[a-z]/.test(password);
//     const hasNumber = /[0-9]/.test(password);
//     const hasSpecialChar = /[@$!%*?&#]/.test(password);

//     if (!password) {
//       passwordError.textContent = "Password is required.";
//       return false;
//     } else if (password.length < minLength) {
//       passwordError.textContent = `Password must be at least ${minLength} characters long.`;
//       return false;
//     } else if (!hasUpperCase) {
//       passwordError.textContent = "Password must contain at least one uppercase letter.";
//       return false;
//     } else if (!hasLowerCase) {
//       passwordError.textContent = "Password must contain at least one lowercase letter.";
//       return false;
//     } else if (!hasNumber) {
//       passwordError.textContent = "Password must contain at least one number.";
//       return false;
//     } else if (!hasSpecialChar) {
//       passwordError.textContent = "Password must contain at least one special character.";
//       return false;
//     }
//     passwordError.textContent = "";
//     return true;
//   }

//   function validateConfirmPassword() {
//     if (!confirmPasswordInput.value.trim()) {
//       confirmPasswordError.textContent = "Confirm Password is required.";
//       return false;
//     } else if (confirmPasswordInput.value !== passwordInput.value) {
//       confirmPasswordError.textContent = "Passwords do not match.";
//       return false;
//     }
//     confirmPasswordError.textContent = "";
//     return true;
//   }

//   // Toggle Password Visibility
//   document.querySelectorAll(".toggle-confirm-password").forEach(function (toggleIcon) {
//     toggleIcon.addEventListener("click", function () {
//       const targetInput = this.previousElementSibling;
//       if (targetInput.type === "password") {
//         targetInput.type = "text";
//         this.textContent = "visibility_off";
//       } else {
//         targetInput.type = "password";
//         this.textContent = "visibility";
//       }
//     });
//   });

//   // Enable the verify button when valid input is entered
//   emailInput.addEventListener("input", function () {
//     if (validateEmail()) {
//       verifyEmailButton.disabled = false;
//       verifyEmailButton.classList.add("enabled");
//     } else {
//       verifyEmailButton.disabled = true;
//       verifyEmailButton.classList.remove("enabled");
//     }
//   });

//   phoneInput.addEventListener("input", function () {
//     if (validatePhone()) {
//       verifyPhoneButton.disabled = false;
//       verifyPhoneButton.classList.add("enabled");
//     } else {
//       verifyPhoneButton.disabled = true;
//       verifyPhoneButton.classList.remove("enabled");
//     }
//   });

//   passwordInput.addEventListener("input", validatePassword);
//   confirmPasswordInput.addEventListener("input", validateConfirmPassword);

//   // OTP Verification flow
//   verifyEmailButton.addEventListener("click", function () {
//     alert(`OTP sent to email`);
//     emailOTPSection.style.display = "block";
//   });

//   verifyPhoneButton.addEventListener("click", function () {
//     alert(`OTP sent to phone`);
//     phoneOTPSection.style.display = "block";
//   });

//   submitEmailOTPButton.addEventListener("click", function () {
//     if (document.getElementById("emailOTPInput").value === HARD_CODED_OTP) {
//       emailOTPError.textContent = "Email verified successfully!";
//       emailOTPError.style.color = "green";
//       emailOTPSection.style.display = "none";
//     } else {
//       emailOTPError.textContent = "Invalid OTP. Please try again.";
//       emailOTPError.style.color = "red";
//     }
//   });

//   submitPhoneOTPButton.addEventListener("click", function () {
//     if (document.getElementById("phoneOTPInput").value === HARD_CODED_OTP) {
//       phoneOTPError.textContent = "Phone verified successfully!";
//       phoneOTPError.style.color = "green";
//       phoneOTPSection.style.display = "none";
//     } else {
//       phoneOTPError.textContent = "Invalid OTP. Please try again.";
//       phoneOTPError.style.color = "red";
//     }
//   });
// });



document.addEventListener("DOMContentLoaded", function () {
  // Input elements
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");

  // Buttons
  const verifyEmailButton = document.getElementById("verifyEmailButton");
  const verifyPhoneButton = document.getElementById("verifyPhoneButton");
  const submitEmailOTPButton = document.getElementById("submitEmailOTP");
  const submitPhoneOTPButton = document.getElementById("submitPhoneOTP");
  const signUpForm = document.getElementById("signupForm");

  // OTP Sections
  const emailOTPSection = document.getElementById("emailOTPSection");
  const phoneOTPSection = document.getElementById("phoneOTPSection");

  // Verification status
  let isEmailVerified = false;
  let isPhoneVerified = false;

  // Error elements
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
  const emailOTPError = document.getElementById("emailOTPError");
  const phoneOTPError = document.getElementById("phoneOTPError");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");

  // Success message elements
  const emailVerifiedMessage = document.getElementById("emailVerifiedMessage");
  const phoneVerifiedMessage = document.getElementById("phoneVerifiedMessage");

  // Hardcoded OTPs for simulation
  const HARD_CODED_OTP = "123456";

  // Validation functions
  function validateEmail() {
    const emailPattern = /^[^\s@]+@gmail\.com$/;
    if (!emailInput.value.trim()) {
      emailError.textContent = "Email is required.";
      return false;
    } else if (!emailPattern.test(emailInput.value)) {
      emailError.textContent = "Enter a valid email address.";
      return false;
    }
    emailError.textContent = "";
    return true;
  }

  function validatePhone() {
    const phonePattern = /^\d{10}$/;
    if (!phoneInput.value.trim()) {
      phoneError.textContent = "Phone Number is required.";
      return false;
    } else if (!phonePattern.test(phoneInput.value)) {
      phoneError.textContent = "Phone Number must be 10 digits.";
      return false;
    }
    phoneError.textContent = "";
    return true;
  }

  function validatePassword() {
    const password = passwordInput.value.trim();
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[@$!%*?&#]/.test(password);

    if (!password) {
      passwordError.textContent = "Password is required.";
      return false;
    } else if (password.length < minLength) {
      passwordError.textContent = `Password must be at least ${minLength} characters long.`;
      return false;
    } else if (!hasUpperCase) {
      passwordError.textContent = "Password must contain at least one uppercase letter.";
      return false;
    } else if (!hasLowerCase) {
      passwordError.textContent = "Password must contain at least one lowercase letter.";
      return false;
    } else if (!hasNumber) {
      passwordError.textContent = "Password must contain at least one number.";
      return false;
    } else if (!hasSpecialChar) {
      passwordError.textContent = "Password must contain at least one special character.";
      return false;
    }
    passwordError.textContent = "";
    return true;
  }

  function validateConfirmPassword() {
    if (!confirmPasswordInput.value.trim()) {
      confirmPasswordError.textContent = "Confirm Password is required.";
      return false;
    } else if (confirmPasswordInput.value !== passwordInput.value) {
      confirmPasswordError.textContent = "Passwords do not match.";
      return false;
    }
    confirmPasswordError.textContent = "";
    return true;
  }

  // Toggle Password Visibility
  document.querySelectorAll(".toggle-confirm-password").forEach(function (toggleIcon) {
    toggleIcon.addEventListener("click", function () {
      const targetInput = this.previousElementSibling;
      if (targetInput.type === "password") {
        targetInput.type = "text";
        this.textContent = "visibility_off";
      } else {
        targetInput.type = "password";
        this.textContent = "visibility";
      }
    });
  });

  // Enable the verify button when valid input is entered
  emailInput.addEventListener("input", function () {
    if (validateEmail()) {
      verifyEmailButton.disabled = false;
      verifyEmailButton.classList.add("enabled");
    } else {
      verifyEmailButton.disabled = true;
      verifyEmailButton.classList.remove("enabled");
    }
  });

  phoneInput.addEventListener("input", function () {
    if (validatePhone()) {
      verifyPhoneButton.disabled = false;
      verifyPhoneButton.classList.add("enabled");
    } else {
      verifyPhoneButton.disabled = true;
      verifyPhoneButton.classList.remove("enabled");
    }
  });

  passwordInput.addEventListener("input", validatePassword);
  confirmPasswordInput.addEventListener("input", validateConfirmPassword);

  // OTP Verification flow
  verifyEmailButton.addEventListener("click", function () {
    emailOTPSection.style.display = "block";
  });

  verifyPhoneButton.addEventListener("click", function () {
    phoneOTPSection.style.display = "block";
  });

  submitEmailOTPButton.addEventListener("click", function () {
    const emailOTPInputValue = document.getElementById("emailOTPInput").value.trim();
    if (emailOTPInputValue === HARD_CODED_OTP) {
      isEmailVerified = true;
      emailVerifiedMessage.style.display = "block";
      emailOTPError.textContent = "";

      // Hide OTP input and button
      emailOTPSection.style.display = "none";
      submitEmailOTPButton.style.display = "none";
    } else {
      emailOTPError.textContent = "Invalid OTP!";
    }
  });

  submitPhoneOTPButton.addEventListener("click", function () {
    const phoneOTPInputValue = document.getElementById("phoneOTPInput").value.trim();
    if (phoneOTPInputValue === HARD_CODED_OTP) {
      isPhoneVerified = true;
      phoneVerifiedMessage.style.display = "block";
      phoneOTPError.textContent = "";

      // Hide OTP input and button
      phoneOTPSection.style.display = "none";
      submitPhoneOTPButton.style.display = "none";
    } else {
      phoneOTPError.textContent = "Invalid OTP!";
    }
  });

  // Form submission
  signUpForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Reset error styles
    emailError.textContent = "";
    phoneError.textContent = "";

    // Validate all fields and check OTP verification before submission
    const emailValid = validateEmail();
    const phoneValid = validatePhone();
    const passwordValid = validatePassword();
    const confirmPasswordValid = validateConfirmPassword();

    if (!isEmailVerified) {
      emailError.textContent = "Please verify your email.";
    }
    if (!isPhoneVerified) {
      phoneError.textContent = "Please verify your phone number.";
    }

    if (
      emailValid &&
      phoneValid &&
      passwordValid &&
      confirmPasswordValid &&
      isEmailVerified &&
      isPhoneVerified
    ) {
      alert("Sign-up successful!");
    } else {
      alert("Please complete all fields and verify email/phone.");
    }
  });
});

