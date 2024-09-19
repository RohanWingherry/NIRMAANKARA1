function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
}

    // Set the min attribute to today's date for calling date
document.getElementById('calling-date').setAttribute('min', getTodayDate());

document.getElementById('submit').addEventListener('click', function(event) {
    event.preventDefault(); 

    // Clear previous error messages
    document.getElementById('mobile-error').style.display = 'none';
    document.getElementById('purpose-error').style.display = 'none';
    document.getElementById('date-error').style.display = 'none';
    document.getElementById('time-error').style.display = 'none';

    const mobileNumber = document.getElementById('mobile-number').value.trim();
    const purpose = document.getElementById('coldcallpurpose').value.trim();
    const date = document.getElementById('calling-date').value;
    const hour = document.getElementById('hour').value;
    const minute = document.getElementById('minute').value;
    const ampm = document.getElementById('ampm').value;
    const today = getTodayDate();

    let isValid = true;

    // Mobile Number Validation (exactly 10 digits)
    if (!/^\d{10}$/.test(mobileNumber)) {
        document.getElementById('mobile-error').style.display = 'block';
        isValid = false;
    }

    // Purpose Validation (no numbers, special characters, or leading spaces)
    const purposeValue = purpose.replace(/^\s+/, ''); // Remove leading spaces
    if (purposeValue !== purpose || /[^a-zA-Z\s]/.test(purposeValue)) {
        document.getElementById('purpose-error').style.display = 'block';
        isValid = false;
    }

    // Date Validation (date cannot be in the past)
    if (date < today) {
        document.getElementById('date-error').style.display = 'block';
        isValid = false;
    }

    // Time Validation (hour, minute, AM/PM must be selected)
    if (!hour || !minute || !ampm) {
        document.getElementById('time-error').style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        alert("Your Call has been scheduled");
        window.location.href = '../html/contractorfollowuphistory.html';
    }
    else{
        alert("all the fields are required");
    }
});

document.getElementById('coldcallpurpose').addEventListener('input', function(event) {
    let value = event.target.value;
    value = value.replace(/^\s+/, ''); // Remove leading spaces
    value = value.replace(/[^a-zA-Z\s]/g, ''); // Remove numbers and special characters
    event.target.value = value;
});
