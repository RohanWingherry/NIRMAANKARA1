const verifyButton = document.querySelector(".verify-button");
const codeInput = document.querySelector("#verification-code");
const backButton = document.querySelector(".back-to-login");

verifyButton.addEventListener("click", () => {
    if (codeInput.value === "") {
        alert("Please enter the verification code.");
    } else {
        window.location.href = "../html/setpassword.html";
    }
});

backButton.addEventListener("click", () => {
    window.location.href = "../html/login.html";
});
