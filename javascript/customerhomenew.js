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
        showNotification("Full Name can only contain letters and spaces, and cannot start with a space.");
        return false;
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
    const otherInput = document.getElementById("otherConstructionType");

    // If "Others" is selected, the additional input must be filled and contain at least one letter
    const otherRegex = /[a-zA-Z]/; // Ensures there’s at least one letter

    if (nameType === "others") {
        if (otherInput.value.trim() === "") {
            showNotification("Please specify the Construction Type.");
            return false;
        }
        if (!otherRegex.test(otherInput.value.trim())) {
            showNotification("Construction Type must contain at least one letter.");
            return false;
        }
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

// Show or hide custom input field based on Construction Type selection
document.getElementById("nameType").addEventListener("change", function () {
    const otherInputWrapper = document.getElementById("otherConstructionTypeWrapper"); // The wrapper div for better control
    const otherInput = document.getElementById("otherConstructionType");

    if (this.value === "others") {
        otherInputWrapper.style.display = "block"; // Show the input field
    } else {
        otherInputWrapper.style.display = "none"; // Hide the input field
        otherInput.value = ""; // Clear input when hidden
    }
});

// location
document.addEventListener('DOMContentLoaded', () => {
    const inputContainer = document.getElementById('input-container');

    // Function to create a new input
    function createNewInput() {
        const inputs = document.querySelectorAll('.location-input');

        // Check if there are already 3 inputs
        if (inputs.length < 3) {
            const newInputWrapper = document.createElement('div');
            newInputWrapper.className = 'input-wrapper2';

            const newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.placeholder = 'Enter Location';
            newInput.className = 'location-input';

            const removeButton = document.createElement('button');
            removeButton.className = 'remove-input';
            removeButton.innerHTML = '&times;';
            removeButton.setAttribute('aria-label', 'Remove input');

            // Append the input and button to the wrapper
            newInputWrapper.appendChild(newInput);
            newInputWrapper.appendChild(removeButton);
            inputContainer.appendChild(newInputWrapper);

            // Add event listeners
            newInput.addEventListener('focus', () => {
                newInput.addEventListener('input', handleInput);
            });

            removeButton.addEventListener('click', () => {
                inputContainer.removeChild(newInputWrapper);
            });
        }
    }

    // Handle input event
    function handleInput(event) {
        if (event.target.value) {
            createNewInput();
            event.target.removeEventListener('input', handleInput); // Prevent multiple inputs
        }
    }

    // Initial event listener for the first input
    const firstInput = document.querySelector('.location-input');
    firstInput.addEventListener('focus', () => {
        firstInput.addEventListener('input', handleInput);
    });
});

// get Experts
document.querySelector('.getexperts').addEventListener('click', function() {
    var selectedPropertyType = document.getElementById('select').value;
    var locationInput = document.getElementById('location-input-new').value;
    if (!selectedPropertyType && !locationInput) {
      showNotification("Please select a property type or enter a location.");
    } else {
      window.location.href='../html/customercontractorlist.html';
    }
  });


