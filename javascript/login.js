document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.querySelector(".btn-login");
    const mobileInput = document.getElementById("mobile");
    const passwordInput = document.getElementById("password");
    const errorMessage = document.querySelector(".error-message");
    const forgotPasswordLink = document.querySelector(".forgot-password");
    const signUpLink = document.querySelector(".signup-link");
    const togglePassword = document.querySelector(".toggle-password");

    // Sample credentials for validation
    const validUsername = "user@gmail.com";  // Replace with actual valid username
    const validPassword = "Password@123";  // Replace with actual valid password

    // Password visibility toggle
    togglePassword.addEventListener("click", () => {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);
        togglePassword.textContent = type === "password" ? "visibility" : "visibility_off";
    });

    // Login button click event
    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        errorMessage.textContent = "";  // Clear previous error message
        let isValid = true;

        // Clear previous error styles
        mobileInput.style.border = '';
        passwordInput.style.border = '';

        // Validate inputs
        if (!mobileInput.value.trim()) {
            mobileInput.style.border = '1px solid red';
            errorMessage.textContent = "Please enter your mobile number or email.";
            isValid = false;
        }
        if (!passwordInput.value.trim()) {
            passwordInput.style.border = '1px solid red';
            errorMessage.textContent = "Please enter your password.";
            isValid = false;
        }

        // Check if username and password match
        if (isValid && (mobileInput.value !== validUsername || passwordInput.value !== validPassword)) {
            passwordInput.style.border = '1px solid red';
            errorMessage.textContent = "Username or password is incorrect.";
            isValid = false;
        }

        // If valid, show success alert and redirect
        if (isValid) {
            alert("Login successful!");
            window.location.href = "../html/contractorshomepage.html";  // Replace with the actual next page URL
        }
    });

    // Forgot password link click event
    forgotPasswordLink.addEventListener("click", () => {
        window.location.href = "../html/forgotpassword.html";  // Replace with the actual forgot password page URL
    });

    // Sign up link click event
    signUpLink.addEventListener("click", () => {
        window.location.href = "../html/signup.html";  // Replace with the actual sign up page URL
    });

    // Remove red border when input is corrected
    document.querySelectorAll('.input-field').forEach(input => {
        input.addEventListener('input', function () {
            if (this.value.trim() !== "") {
                this.style.border = '';  // Clear red border if input is correct
            }
        });
    });
});
