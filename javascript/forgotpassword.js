let submitButton = document.querySelector(".submit-button");
let emailInput = document.querySelector(".email-input");
let backToLogin = document.querySelector(".back-to-login");

submitButton.addEventListener("click", () => {
    if (emailInput.value === "") {
        alert("Please enter your email");
    } else {
        window.location.href = "verifyemail.html";
    }
});

backToLogin.addEventListener("click", () => {
    window.location.href = "login.html";
});
