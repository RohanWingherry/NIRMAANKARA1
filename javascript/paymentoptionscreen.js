function applyCoupons() {
    document.getElementById("couponModal").style.display = "block";
}

function closeModal() {
    document.getElementById("couponModal").style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById("couponModal");
    if (event.target == modal) {
        closeModal();
    }
}

document.querySelectorAll(".apply-offer").forEach(button => {
    button.addEventListener("click", () => {
        closeModal();
        document.getElementById("coupon-box").style.display="flex"
    });
});


function toggleForm(e) {
    // Get all form sections
    const forms = document.querySelectorAll('.forms1, .formsones, .formstwos');
    
    // Hide all forms
    forms.forEach(form => form.style.display = 'none');

    // Find the target form based on clicked section
    const targetForm = e.target.closest('.debit-creditcard').querySelector('.forms1, .formsones, .formstwos');
    
    // Toggle the target form
    if (targetForm.style.display === 'block') {
        targetForm.style.display = 'none';
    } else {
        targetForm.style.display = 'block';
    }
}

// Add event listeners to all card-heading sections
document.querySelectorAll('.card-heading').forEach(section => {
    section.addEventListener('click', toggleForm);
});