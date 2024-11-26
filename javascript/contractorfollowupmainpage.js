 // Function to show the relevant inputs based on the selected radio button
 function showInputs(mode) {
    // Hide all inputs
    document.getElementById('faceToFaceInputs').style.display = 'none';
    document.getElementById('coldCallInputs').style.display = 'none';
    document.getElementById('emailInputs').style.display = 'none';

    // Show inputs based on the selected mode
    if (mode === 'faceToFace') {
        document.getElementById('faceToFaceInputs').style.display = 'block';
    } else if (mode === 'coldCall') {
        document.getElementById('coldCallInputs').style.display = 'block';
    } else if (mode === 'email') {
        document.getElementById('emailInputs').style.display = 'block';
    }

    // Reset all inputs' border color to normal when switching
    resetInputBorders();
}

// Function to validate and submit the form
function submitForm() {
    let mode = document.querySelector('input[name="contactMode"]:checked');
    
    if (!mode) {
        alert('Please select a mode of contact');
        return;
    }

    let valid = false;
    
    // Validation based on selected mode
    if (mode.value === 'faceToFace') {
        valid = validateFaceToFace();
    } else if (mode.value === 'coldCall') {
        valid = validateColdCall();
    } else if (mode.value === 'email') {
        valid = validateEmail();
    }

    if (valid) {
        alert('Form submitted successfully!');
        window.location.href = '../html/contractorfollowuphistory.html';
    } else {
        alert('Please fill in all the fields correctly');
    }
}

// Function to reset input borders to default
function resetInputBorders() {
    const inputs = document.querySelectorAll('.inputs input, .inputs select');
    inputs.forEach(input => {
        input.style.borderColor = ''; // Reset border to default
    });
}

// Function to check if a date is in the past
function isPastDate(date) {
    const today = new Date();
    const selectedDate = new Date(date);
    
    // Clear the time portion of the date (set to midnight) for comparison
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    return selectedDate < today;
}

// Function to set the date input to today's date (to disable past dates)
function disablePastDates() {
    const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    const dateInputs = document.querySelectorAll('input[type="date"]');
    
    dateInputs.forEach(input => {
        input.setAttribute('min', today); // Set the min attribute to today's date
    });
}

// Run the function to disable past dates when the page loads
disablePastDates();

// Validation for Face to Face
function validateFaceToFace() {
    let location = document.getElementById('location');
    let purpose = document.getElementById('purpose');
    let meetingDate = document.getElementById('meetingDate');
    let meetingHour = document.getElementById('meetingHour');
    let meetingMinute = document.getElementById('meetingMinute');
    let meetingAMPM = document.getElementById('meetingAMPM');

    // Reset borders before validation
    resetInputBorders();

    let valid = true;

    if (!location.value) {
        location.style.borderColor = 'red';
        valid = false;
    }
    if (!purpose.value) {
        purpose.style.borderColor = 'red';
        valid = false;
    }
    if (!meetingDate.value || isPastDate(meetingDate.value)) {
        if (!meetingDate.value) meetingDate.style.borderColor = 'red';
        if (isPastDate(meetingDate.value)) {
            meetingDate.style.borderColor = 'red';
        }
        valid = false;
    }
    if (!meetingHour.value || !meetingMinute.value || !meetingAMPM.value) {
        if (!meetingHour.value) meetingHour.style.borderColor = 'red';
        if (!meetingMinute.value) meetingMinute.style.borderColor = 'red';
        if (!meetingAMPM.value) meetingAMPM.style.borderColor = 'red';
        valid = false;
    }

    return valid;
}

document.getElementById('location').addEventListener('input', function(event) {
    let value = event.target.value;
            value = value.replace(/[^a-zA-Z0-9#@.\s]/g, '');

            if (value.startsWith(' ')) {
                value = value.slice(1);
            }

            event.target.value = value;
});
document.getElementById('purpose').addEventListener('input', function(event) {
    let value = event.target.value;
            value = value.replace(/[^a-zA-Z\s]/g, '');

            if (value.startsWith(' ')) {
                value = value.slice(1);
            }

            event.target.value = value;
});

// Validation for Cold Call
function validateColdCall() {
    let mobileNumber = document.getElementById('mobileNumber');
    let callPurpose = document.getElementById('callPurpose');
    let callingDate = document.getElementById('callingDate');
    let callingHour = document.getElementById('callingHour');
    let callingMinute = document.getElementById('callingMinute');

    // Reset borders before validation
    resetInputBorders();

    let valid = true;

    if (!mobileNumber.value || !callPurpose.value || !callingDate.value || !callingHour.value || !callingMinute.value) {
        if (!mobileNumber.value) mobileNumber.style.borderColor = 'red';
        if (!callPurpose.value) callPurpose.style.borderColor = 'red';
        if (!callingDate.value || isPastDate(callingDate.value)) {
            if (!callingDate.value) callingDate.style.borderColor = 'red';
            if (isPastDate(callingDate.value)) {
                callingDate.style.borderColor = 'red';
            }
            valid = false;
        }
        if (!callingHour.value) callingHour.style.borderColor = 'red';
        if (!callingMinute.value) callingMinute.style.borderColor = 'red';
        valid = false;
    }

    // Validate the mobile number (basic validation)
    let phonePattern = /^[0-9]{10}$/;
    if (mobileNumber.value && !phonePattern.test(mobileNumber.value)) {
        mobileNumber.style.borderColor = 'red';
        valid = false;
    }

    return valid;
}
document.getElementById('mobileNumber').addEventListener('input', function(event) {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
});
document.getElementById('callPurpose').addEventListener('input', function(event) {
    let value = event.target.value;
            value = value.replace(/[^a-zA-Z\s]/g, '');

            if (value.startsWith(' ')) {
                value = value.slice(1);
            }

            event.target.value = value;
});

// Validation for Email
function validateEmail() {
    let emailAddress = document.getElementById('emailAddress');
    let emailDate = document.getElementById('emailDate');
    let emailHour = document.getElementById('emailHour');
    let emailMinute = document.getElementById('emailMinute');
    let emailAMPM = document.getElementById('emailAMPM');

    // Reset borders before validation
    resetInputBorders();

    let valid = true;

    if (!emailAddress.value || !emailDate.value || !emailHour.value || !emailMinute.value || !emailAMPM.value) {
        if (!emailAddress.value) emailAddress.style.borderColor = 'red';
        if (!emailDate.value || isPastDate(emailDate.value)) {
            if (!emailDate.value) emailDate.style.borderColor = 'red';
            if (isPastDate(emailDate.value)) {
                emailDate.style.borderColor = 'red';
            }
            valid = false;
        }
        if (!emailHour.value) emailHour.style.borderColor = 'red';
        if (!emailMinute.value) emailMinute.style.borderColor = 'red';
        if (!emailAMPM.value) emailAMPM.style.borderColor = 'red';
        valid = false;
    }

    // Validate the email address format
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailAddress.value && !emailPattern.test(emailAddress.value)) {
        emailAddress.style.borderColor = 'red';
        valid = false;
    }
    return valid;
    
}
document.getElementById("fetch-details").addEventListener("click", () => {
    const cust = document.getElementById("customer-id").value;
    if (cust) {
        document.querySelector(".main-client-det").style.display = "block";
    } else {
        alert("Enter the Customer ID");
    }
});