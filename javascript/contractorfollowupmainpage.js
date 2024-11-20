const faceRadio = document.getElementById("face");
const coldcallRadio = document.getElementById("coldcall");
const emailRadio = document.getElementById("email");

const facetofaceSection = document.getElementById("main-facetoface");
const coldcallSection = document.getElementById("main-coldcall");
const mailSection = document.getElementById("main-mail");

function hideAllSections() {
    facetofaceSection.style.display = "none";
    coldcallSection.style.display = "none";
    mailSection.style.display = "none";
}

faceRadio.addEventListener("change", function () {
    hideAllSections();
    facetofaceSection.style.display = "flex";
});

coldcallRadio.addEventListener("change", function () {
    hideAllSections();
    coldcallSection.style.display = "flex";
});

emailRadio.addEventListener("change", function () {
    hideAllSections();
    mailSection.style.display = "flex";
});

hideAllSections();

const form = document.getElementById('followup-form');
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const requiredFields = document.querySelectorAll('[required]');
    let isValid = true;

    for (let field of requiredFields) {
        if (!field.value) {
            isValid = false;
            break;
        }
    }
    if (isValid) {
        alert("Scheduled the follow-up");
        window.location.href="../html/contractorfollowuphistory.html"
    } else {
        alert("Please fill in all required fields!");
    }
});
document.getElementById('face-meeting').addEventListener('input', function(event) {
    event.target.value = event.target.value.replace(/[^a-zA-Z]/g, '');
});