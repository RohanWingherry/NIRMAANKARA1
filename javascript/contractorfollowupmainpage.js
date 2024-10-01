document.querySelector(".followup-form").addEventListener("submit", (event) => {
    event.preventDefault();
    
    const face = document.getElementById('face').checked;
    const coldcall = document.getElementById('coldcall').checked;
    const email = document.getElementById('email').checked;
    const chat = document.getElementById('chat').checked;
    const customerIdInput = document.getElementById("customer-id");
    const errorMessage = document.getElementById("error-message"); // Assuming there's an element for error messages

    const validateForm = () => {
        let isValid = true;

        // Validate if one preferred type is selected
        if (!(face || coldcall || email || chat)) {
            errorMessage.textContent = "Please select a preferred type.";
            errorMessage.style.display = "block";
            isValid = false;
        } else {
            errorMessage.style.display = "none"; // Clear error if valid
        }

        // Validate if customer ID is provided
        if (!customerIdInput.value.trim()) {
            errorMessage.textContent = "Please enter the Customer ID.";
            errorMessage.style.display = "block";
            isValid = false;
        } else {
            errorMessage.style.display = "none"; // Clear error if valid
        }

        return isValid;
    };

    // Run validation
    if (validateForm()) {
        if (face) {
            window.location.href = '../html/contractorfollowupfacetoface.html';
        } else if (coldcall) {
            window.location.href = '../html/contractorfollowupcoldcall.html';
        } else if (email) {
            window.location.href = '../html/contractorfollowupemail.html';
        } else if (chat) {
            window.location.href = '../html/contractorfollowupchat.html';
        }
    }
});

// Fetch details button functionality
document.getElementById("fetch-details").addEventListener("click", () => {
    const cust = document.getElementById("customer-id").value;
    if (cust) {
        document.querySelector(".main-client-det").style.display = "block";
    } else {
        alert("Enter the Customer ID");
    }
});

// Set today's date for date input
const dateInput = document.getElementById('dateInput');
const today = new Date().toISOString().split('T')[0]; 
dateInput.value = today;
dateInput.style.textAlign = 'center';
