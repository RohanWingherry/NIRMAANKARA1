// Authorised signature input handling
document.getElementById('authorisedSignature').addEventListener('input', function(e) {
    let value = this.value;
    value = value.replace(/^\s+/, ''); // Remove leading spaces
    value = value.replace(/[^a-zA-Z\s]/g, ''); // Allow only letters and spaces
    value = value.replace(/\s{2,}/g, ' '); // Replace multiple spaces with a single space
    this.value = value;
});

// Utility to set border red or clear
function setBorder(input, isValid) {
    if (isValid) {
        input.style.border = '';
    } else {
        input.style.border = '1px solid red';
    }
}

// Validate form on submission
document.getElementById('submitBtn').addEventListener('click', function() {
    let isValid = true; // Define isValid variable here
    
    const paymentModeInputs = document.querySelectorAll('input[name="paymentMode"]');
    const paymentError = document.getElementById('paymentError');
    const authorisedSignatureInput = document.getElementById('authorisedSignature');
    const customerIdInput = document.getElementById('customer-id'); // Add customer ID input
    const authSign = /^[A-Za-z\s]+$/; // Regex for validating the signature

    // Payment mode validation
    let paymentSelected = false;
    for (const payment of paymentModeInputs) {
        if (payment.checked) {
            paymentSelected = true;
            break;
        }
    }
    if (!paymentSelected) {
        paymentError.style.display = 'block';
        isValid = false;
    } else {
        paymentError.style.display = 'none';
    }

    // Customer ID validation
    if (!customerIdInput.value.trim()) {
        setBorder(customerIdInput, false);
        isValid = false;
    } else {
        setBorder(customerIdInput, true);
    }

    // Authorized signature validation
    if (!authSign.test(authorisedSignatureInput.value)) {
        setBorder(authorisedSignatureInput, false);
        isValid = false;
    } else {
        setBorder(authorisedSignatureInput, true);
    }

    // Validate table rows
    if (!validateTableRows()) {
        isValid = false;
    }

    // Show alert and submit if valid
    if (isValid) {
        alert('Receipt Submitted');
        // Redirect to the next page
        window.location.href = "../html/contractorreceipthistory.html";
    } else {
        alert('Please fill out all required fields correctly.');
    }
});

// Customer ID fetch details
document.getElementById("fetch-details").addEventListener("click", () => {
    const cust = document.getElementById("customer-id").value;
    if (cust) {
        document.querySelector(".main-client-det").style.display = "block";
    } else {
        alert("Enter the Customer-id");
    }
});

// Set today's date for date input
const dateInput = document.getElementById('dateInput');
const today = new Date().toISOString().split('T')[0]; 
dateInput.value = today;
dateInput.style.textAlign = 'center';



document.getElementById("invoice-fetching-table-btn").addEventListener("click",()=>{
    const tableValue=document.getElementById("invoice-number").value;
    if(tableValue)
    {
        document.getElementById("invoice-table").style.display="block";
        document.querySelector(".grand-total").style.display="flex";
    }
    else{
        alert("Enter the Invoice number");
    }
})