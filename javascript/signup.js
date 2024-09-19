document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.querySelector(".submit-btn");
  const fullName = document.querySelector("#full-name");
  const emailInput = document.querySelector("#email");
  const phoneInput = document.querySelector("#phone");
  const passwordInput = document.querySelector("#password");
  const confirmPasswordInput = document.querySelector("#confirm-password");
  const agreeCheckbox = document.querySelector("#agree");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");

  function validateFullName() {
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(fullName.value.trim())) {
      fullName.classList.add("error");
      nameError.textContent = "Full name should not contain numbers or special characters.";
      return false;
    } else {
      fullName.classList.remove("error");
      fullName.classList.add("valid");
      nameError.textContent = "";
      return true;
    }
  }

  function validatePhoneNumber() {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneInput.value.trim())) {
      phoneInput.classList.add("error");
      phoneError.textContent = "Phone number must be exactly 10 digits.";
      return false;
    } else {
      phoneInput.classList.remove("error");
      phoneInput.classList.add("valid");
      phoneError.textContent = "";
      return true;
    }
  }

  function validatePassword() {
    if (passwordInput.value.length < 8) {
      passwordInput.classList.add("error");
      passwordError.textContent = "Password must be at least 8 characters long.";
      return false;
    } else if (!/[0-9]/.test(passwordInput.value)) {
      passwordInput.classList.add("error");
      passwordError.textContent = "Password must contain at least one number.";
      return false;
    } else if (!/[A-Z]/.test(passwordInput.value)) {
      passwordInput.classList.add("error");
      passwordError.textContent = "Password must contain at least one uppercase letter.";
      return false;
    } else if (!/[a-z]/.test(passwordInput.value)) {
      passwordInput.classList.add("error");
      passwordError.textContent = "Password must contain at least one lowercase letter.";
      return false;
    } else if (!/[!@#$%^&*?]/.test(passwordInput.value)) {
      passwordInput.classList.add("error");
      passwordError.textContent = "Password must contain at least one special character.";
      return false;
    } else {
      passwordInput.classList.remove("error");
      passwordInput.classList.add("valid");
      passwordError.textContent = "";
      return true;
    }
  }

  function validateConfirmPassword() {
    if (passwordInput.value !== confirmPasswordInput.value) {
      confirmPasswordInput.classList.add("error");
      confirmPasswordError.textContent = "Passwords do not match.";
      return false;
    } else {
      confirmPasswordInput.classList.remove("error");
      confirmPasswordInput.classList.add("valid");
      confirmPasswordError.textContent = "";
      return true;
    }
  }

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    
    let valid = true;

    if (!validateFullName()) valid = false;
    if (!validatePhoneNumber()) valid = false;
    if (!validatePassword()) valid = false;
    if (!validateConfirmPassword()) valid = false;

    if (!agreeCheckbox.checked) {
      alert("You must agree to the terms and conditions.");
      valid = false;
    }

    if (valid) {
      window.location.href = "../html/login.html";
    }
  });

  // Toggle password visibility for password field
  const togglePassword = document.querySelector(".toggle-password");
  togglePassword.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    togglePassword.textContent = type === "password" ? "visibility" : "visibility_off";
  });

  // Toggle password visibility for confirm password field
  const toggleConfirmPassword = document.querySelector(".toggle-confirm-password");
  toggleConfirmPassword.addEventListener("click", () => {
    const type = confirmPasswordInput.getAttribute("type") === "password" ? "text" : "password";
    confirmPasswordInput.setAttribute("type", type);
    toggleConfirmPassword.textContent = type === "password" ? "visibility" : "visibility_off";
  });

  // Real-time validation as the user types
  fullName.addEventListener("input", validateFullName);
  phoneInput.addEventListener("input", validatePhoneNumber);
  passwordInput.addEventListener("input", validatePassword);
  confirmPasswordInput.addEventListener("input", validateConfirmPassword);
});

// Select the login link element
const loginLink = document.querySelector(".login-link");

// Add click event listener
loginLink.addEventListener("click", () => {
    // Redirect to the login page
    window.location.href = "../html/login.html";
});
