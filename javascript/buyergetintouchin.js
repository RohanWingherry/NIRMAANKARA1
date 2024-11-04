
document.getElementById('name').addEventListener('input', function(event) {
    let value = event.target.value;
            value = value.replace(/[^a-zA-Z\s]/g, '');

            if (value.startsWith(' ')) {
                value = value.slice(1);
            }

            event.target.value = value;
});
document.getElementById('location').addEventListener('input', function(event) {
    let value = event.target.value;
            value = value.replace(/[^a-zA-Z0-9#\s]/g, '');

            if (value.startsWith(' ')) {
                value = value.slice(1);
            }

            event.target.value = value;
});
document.getElementById('attendees').addEventListener('input', function(event) {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
});
document.getElementById('mobile').addEventListener('input', function(event) {
    let value = event.target.value.replace(/[^0-9]/g, '');

    if (value.length > 0 && !['6', '7', '8', '9'].includes(value[0])) {
        value = ''; 
    }

    if (value.length > 10) {
        value = value.slice(0, 10); 
    }

    event.target.value = value;
});

document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('visit-date').setAttribute('min', today);

    document.getElementById('visit-date').addEventListener('input', function(event) {
        event.target.value = event.target.value.replace(/[^0-9-]/g, '');  
    });
});

function togglePickupLocation() {
    const ownVehicle = document.getElementById('own-vehicle');
    const pickupLocation = document.getElementById('location');

    if (ownVehicle.checked) {
        pickupLocation.disabled = true;
        pickupLocation.value = ''; 
        pickupLocation.placeholder = "Pickup location not required"; 
    } else {
        pickupLocation.disabled = false;
        pickupLocation.placeholder = "Enter your location"; 
    }
}

// Add event listener for form submission
document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const location = document.getElementById('location').value;
    const attendees = document.getElementById('attendees').value;
    const mobile = document.getElementById('mobile').value;
    const visitDate = document.getElementById('visit-date').value;

    if (name && (location || document.getElementById('own-vehicle').checked) && attendees && mobile.length === 10 && visitDate) {
        if (confirm('Do you want to submit?')) {
            alert('Request sent');
            this.reset();
            togglePickupLocation();
            window.location.href = '../html/buyerpackageplan.html';
        }
    } else {
        alert('Please fill in all required fields correctly.');
    }
});
document.querySelector(".shortlisted").addEventListener("click",()=>{
    window.location.href="../html/buyershorlisted.html"
})