document.querySelectorAll('.slider-container').forEach(container => {
    container.currentIndex = 0;
});

// Show a specific slide based on index
function showSlide(container, index) {
    const slider = container.querySelector('.content-slider');
    const slides = slider.querySelectorAll('.slide');
    const totalSlides = slides.length;

    container.currentIndex = (index + totalSlides) % totalSlides;
    slider.style.transform = `translateX(-${container.currentIndex * 100}%)`;
}

// Go to the next slide
function nextSlide(button) {
    const container = button.closest('.slider-container');
    showSlide(container, container.currentIndex + 1);
}

// Go to the previous slide
function prevSlide(button) {
    const container = button.closest('.slider-container');
    showSlide(container, container.currentIndex - 1);
}

// popup get quote

// Open popup function
function openPopup() {
    document.getElementById("popup").style.display = "block";
}

// Close popup function
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function validateForm(event) {
    event.preventDefault(); // Prevent form submission

    let isValid = true; // Initialize isValid flag

    // Full Name: Only letters and spaces allowed
    const fullName = document.getElementById("fullName");
    const nameRegex = /^[a-zA-Z](?!\s)([a-zA-Z\s]*)$/;
    if (!nameRegex.test(fullName.value.trim())) {
        isValid = false;
        fullName.nextElementSibling.textContent = "Full Name can only contain letters and spaces, and cannot start with a space.";
    } else {
        fullName.nextElementSibling.textContent = "";
    }

    // Phone Number: Only 10 digits allowed
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
        showNotification("Phone Number must be exactly 10 digits.");
        return false;
    }

    // Land Size: Only positive numbers allowed
    const landSize = document.getElementById("landSize").value.trim();
    if (isNaN(landSize) || landSize <= 0) {
        showNotification("Land Size must be a positive number.");
        return false;
    }

    // Address: Letters, numbers, and '#' allowed
    const landAddress = document.getElementById("landAddress").value.trim();
    const addressRegex = /^[a-zA-Z0-9#\s]+$/;
    if (!addressRegex.test(landAddress)) {
        showNotification("Address can only contain letters, numbers, spaces, and '#'.");
        return false;
    }

    // Ensure Construction Type is selected
    const nameType = document.getElementById("nameType").value;
    if (nameType === "select") {
        showNotification("Please select a Construction Type.");
        return false;
    }

    // If all validations passed
    if (isValid) {
        showNotification("Get quote sent successfully!");

        // Reset the form
        document.getElementById("constructionForm").reset();

        // Close the popup
        closePopup();
    }

    return true;
}
