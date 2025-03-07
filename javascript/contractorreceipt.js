// notification or pop up
function showNotification(message, type = 'success') {
    const notification = document.getElementById('customNotification');
    const notificationMessage = document.getElementById('notificationMessage');
    const okButton = document.getElementById('okButton');

    notificationMessage.textContent = message;

    // Add error class if the type is 'error'
    if (type === 'error') {
        notification.classList.add('error');
    } else {
        notification.classList.remove('error');
    }

    // Show the notification with a fade-in effect
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.opacity = '1';  // Fade-in effect
    }, 10);

    // When "OK" button is clicked, hide the notification with a fade-out effect
    okButton.addEventListener('click', function () {
        notification.style.opacity = '0';  // Fade-out effect
        setTimeout(() => {
            notification.style.display = 'none';  // Ensure it's hidden after fading out
        }, 500);  // Wait for the transition duration before hiding completely
    });
}
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


    // Show showNotification and submit if valid
    if (isValid) {
        showNotification('Receipt Submitted');
        window.location.href = "../html/contractorreceipthistory.html";
    } else {
        showNotification('Please fill out all required fields correctly.');
    }
});

// Customer ID fetch details
document.getElementById("fetch-details").addEventListener("click", () => {
    const cust = document.getElementById("customer-id").value;
    if (cust) {
        document.querySelector(".main-client-det").style.display = "block";
    } else {
        showNotification("Enter the Customer-id");
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
        document.querySelector(".all-invoice-fetching").style.display="block"
    }
    else{
        showNotification("Enter the Invoice number");
    }
})

 // Get elements
const totalAmountElement = document.getElementById("total-amount");
const paidAmountInput = document.getElementById('paid-amount');
const dueAmountInput = document.getElementById('arrer-amount');
const paymentError = document.getElementById('paymentError');

// Extract the numeric value from the total amount (remove ₹ and parse as number)
const totalAmount = parseFloat(totalAmountElement.textContent.replace('₹', '').trim());

paidAmountInput.addEventListener('input', function() {
    let paidAmount = parseFloat(paidAmountInput.value);

    // If the paid amount exceeds the total amount, show error and reset
    if (paidAmount > totalAmount) {
        paidAmountInput.setCustomValidity("Amount paid cannot exceed total amount.");
        paidAmountInput.reportValidity(); 
        paidAmountInput.value = totalAmount;
        paidAmount = totalAmount; 
    } else {
        paidAmountInput.setCustomValidity(""); 
    }

    // Calculate the due amount
    const dueAmount = totalAmount - paidAmount;
    dueAmountInput.value = dueAmount > 0 ? dueAmount : 0; 
});
