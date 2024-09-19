const submitBtn = document.querySelector(".submit-btn");
const passwordInput = document.getElementById("new-password");
const confirmPasswordInput = document.getElementById("confirm-password");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirm-password-error");
const toggleConfirmPassword = document.getElementById("toggle-confirm-password");

submitBtn.addEventListener("click", (e) => {
    e.preventDefault(); 

    passwordError.textContent = "";
    confirmPasswordError.textContent = "";

    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password === "") {
        alert("Please enter your password");
    } else if (password.length < 8) {
        passwordError.textContent = "Password must be at least 8 characters";
    } else if (!/\d/.test(password)) {
        passwordError.textContent = "Password must contain at least one number";
    } else if (!/[A-Z]/.test(password)) {
        passwordError.textContent = "Password must contain at least one uppercase letter";
    } else if (!/[a-z]/.test(password)) {
        passwordError.textContent = "Password must contain at least one lowercase letter";
    } else if (!/[!@#$%^&*?]/.test(password)) {
        passwordError.textContent = "Password must contain at least one special character";
    } else if (password !== confirmPassword) {
        confirmPasswordError.textContent = "Passwords do not match";
    } else {
        window.location.href = "../html/welcome.html";
    }
});

toggleConfirmPassword.addEventListener("click", () => {
    const type = confirmPasswordInput.getAttribute("type") === "password" ? "text" : "password";
    confirmPasswordInput.setAttribute("type", type);
    const icon = toggleConfirmPassword.querySelector("i");

    if (type === "password") {
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    } else {
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    }
});
