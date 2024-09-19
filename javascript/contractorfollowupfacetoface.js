const submit = document.querySelector(".facetofacedetails");

submit.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Your Meeting Has Been Scheduled Successfully");
    window.location.href = "../html/contractorfollowuphistory.html";
});

function validateInput(event) {
    const input = event.target;
    input.value = input.value.replace(/^\s+/, '');
    input.value = input.value.replace(/[^a-zA-Z0-9\s]/g, '');
}

document.getElementById('meeting').addEventListener('input', validateInput);
document.getElementById('purpose').addEventListener('input', validateInput);

function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

document.getElementById('required').setAttribute('min', getTodayDate());
