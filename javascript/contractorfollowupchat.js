document.addEventListener("DOMContentLoaded", function() {
    const dateInput = document.getElementById('chatting-date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
});

function validateForm() {
    // Mobile number validation
    const mobileNumber = document.getElementById('mobile-number').value;
    const mobileError = document.getElementById('mobile-error');
    if (mobileNumber.length !== 10 || isNaN(mobileNumber)) {
        mobileError.style.display = 'block';
        return false; 
    } else {
        mobileError.style.display = 'none';
    }

    const chattingDate = document.getElementById('chatting-date').value;
    const dateError = document.getElementById('date-error');
    const currentDate = new Date().toISOString().split('T')[0];
    if (chattingDate < currentDate) {
        dateError.style.display = 'block';
        return false; 
    } else {
        dateError.style.display = 'none';
    }

    const hour = document.getElementById('hour').value;
    const minute = document.getElementById('minute').value;
    const ampm = document.getElementById('ampm').value;

    if (!hour || !minute || !ampm) {
        alert("Please fill in all required fields.");
        return false; 
    }

    alert("Successfull")
    window.location.href = '../html/contractorfollowuphistory.html'; 
    return false; 
}