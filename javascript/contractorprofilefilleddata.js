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
function updateImage(event) {
    const profileImage = document.getElementById("profile-image");
    const updateBtnContainer = document.getElementById("update-btn-container");
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profileImage.src = e.target.result;
            // Display the update button once an image is loaded
            updateBtnContainer.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
}

function handleUpdateClick() {
    // Show the alert when the Update button is clicked
    showNotification("Changes saved!");

    // Hide the update button after the alert
    const updateBtnContainer = document.getElementById("update-btn-container");
    updateBtnContainer.style.display = "none";
}

// Handle changes in the h3 text
function handleTextChange() {
    const updateBtnContainer = document.getElementById("update-btn-container");
    updateBtnContainer.style.display = "block";  // Show the update button when the text is edited
}


 // Add remove functionality to each existing service (Building & Renovation Services)
 const constructionServices = document.querySelectorAll('.remove-service');
 constructionServices.forEach(service => {
     service.addEventListener('click', removeService);
 });
 // Function to remove a service
 function removeService(event) {
    const serviceElement = event.target.closest('.single-service');
    if (serviceElement) {
        serviceElement.remove();
    }
}   
  // Handle Add More for Building & Renovation Services
  const addConstructionButton = document.getElementById("add-construction-service");
  const constructionInputContainer = document.getElementById("construction-input-container");
  const addConstructionServiceBtn = document.getElementById("add-construction-button");

  addConstructionButton.addEventListener("click", function() {
      constructionInputContainer.style.display = "block"; // Show input
  });

  addConstructionServiceBtn.addEventListener("click", function() {
      const inputValue = document.getElementById("construction-input").value;
      if (inputValue.trim() !== "") {
          const newService = document.createElement("div");
          newService.classList.add("single-service");
          newService.innerHTML = `<span>${inputValue}</span><span class="remove-service">x</span>`;
          document.getElementById("construction-services-list").appendChild(newService);

          // Add event listener to the new cross mark
          newService.querySelector('.remove-service').addEventListener('click', removeService);
          document.getElementById("construction-input").value = ""; // Clear input
          constructionInputContainer.style.display = "none"; // Hide input
      }
  });

 // Handle the first edit icon (organisation info)
const editIcon = document.getElementById('edit-icon1');
const inputs = document.querySelectorAll('.form-group1 input, .form-group1 textarea');

editIcon.addEventListener('click', () => {
    inputs.forEach(input => {
        input.disabled = !input.disabled;
    });
    const fileInput = document.getElementById('file-input');
    // Toggle the disabled property on the file input as well
    fileInput.disabled = !fileInput.disabled;
});

document.addEventListener("DOMContentLoaded", function () {
    const editIcon2 = document.querySelector('.personal-info-container .header .material-symbols-rounded');
    const inputs2 = document.querySelectorAll('.personal-info-container .form-group input, .personal-info-container .form-group textarea, .personal-info-container .form-group select');
    const updateButton = document.getElementById("personal-details-update");
    
    // Store initial values of the input fields
    const initialValues = {};
    inputs2.forEach(input => {
        initialValues[input.id] = input.value || input.selectedIndex;
    });

    // Country, State, City data
    const countryData = {
        "India": {
            "Andhra Pradesh": { cities: ["Hyderabad", "Visakhapatnam", "Vijayawada", "Guntur"] },
            "Arunachal Pradesh": { cities: ["Itanagar", "Tawang", "Ziro", "Pasighat"] },
            "Assam": { cities: ["Guwahati", "Dibrugarh", "Jorhat", "Silchar"] },
            "Bihar": { cities: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"] },
            "Chhattisgarh": { cities: ["Raipur", "Bhilai", "Bilaspur", "Korba"] },
            "Goa": { cities: ["Panaji", "Margao", "Vasco da Gama", "Mapusa"] },
            "Gujarat": { cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"] },
            "Haryana": { cities: ["Chandigarh", "Faridabad", "Gurugram", "Ambala"] },
            "Himachal Pradesh": { cities: ["Shimla", "Manali", "Kullu", "Dharamshala"] },
            "Jharkhand": { cities: ["Ranchi", "Jamshedpur", "Dhanbad", "Hazaribagh"] },
            "Karnataka": { cities: ["Bangalore", "Mysore", "Hubli", "Mangalore"] },
            "Kerala": { cities: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Trivandrum"] },
            "Madhya Pradesh": { cities: ["Bhopal", "Indore", "Gwalior", "Jabalpur"] },
            "Maharashtra": { cities: ["Mumbai", "Pune", "Nagpur", "Aurangabad"] },
            "Manipur": { cities: ["Imphal", "Thoubal", "Churachandpur", "Ukhrul"] },
            "Meghalaya": { cities: ["Shillong", "Tura", "Jowai", "Nongpoh"] },
            "Mizoram": { cities: ["Aizawl", "Lunglei", "Saiha", "Kolasib"] },
            "Nagaland": { cities: ["Kohima", "Dimapur", "Mokokchung", "Tuensang"] },
            "Odisha": { cities: ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur"] },
            "Punjab": { cities: ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar"] },
            "Rajasthan": { cities: ["Jaipur", "Udaipur", "Jodhpur", "Ajmer"] },
            "Sikkim": { cities: ["Gangtok", "Namchi", "Jorethang", "Pakyong"] },
            "Tamil Nadu": { cities: ["Chennai", "Coimbatore", "Madurai", "Trichy"] },
            "Telangana": { cities: ["Hyderabad", "Warangal", "Khammam", "Karimnagar"] },
            "Tripura": { cities: ["Agartala", "Udaipur", "Ambassa", "Dhalai"] },
            "Uttar Pradesh": { cities: ["Lucknow", "Kanpur", "Varanasi", "Agra"] },
            "Uttarakhand": { cities: ["Dehradun", "Haridwar", "Nainital", "Rishikesh"] },
            "West Bengal": { cities: ["Kolkata", "Darjeeling", "Siliguri", "Howrah"] }
        }
    };

    // Function to populate states based on country selection
    const populateStates = (country) => {
        const stateSelect = document.getElementById("cont-state-1");
        const cityInput = document.getElementById("cont-city-1");

        stateSelect.innerHTML = '<option value="" disabled>Select your State</option>';  // Clear existing states
        const states = Object.keys(countryData[country]);

        states.forEach(state => {
            const option = document.createElement("option");
            option.value = state;
            option.textContent = state;
            stateSelect.appendChild(option);
        });

        // Reset City when Country is changed
        cityInput.disabled = true;
    };

    // Function to populate cities based on state selection
    const populateCities = (country, state) => {
        const cityInput = document.getElementById("cont-city-1");
        const selectedStateData = countryData[country][state];

        // Set city input
        cityInput.disabled = false;
        cityInput.value = ''; // Reset city input
        const cities = selectedStateData.cities;

        // Populate city input
        cityInput.value = cities[0]; // Set default city as the first city in the list (you can also create a dropdown here if preferred)
    };

    // Toggle input fields on Edit icon click
    editIcon2.addEventListener('click', () => {
        inputs2.forEach(input => {
            input.disabled = !input.disabled;
        });

        // When editing starts, enable the state dropdown and populate states
        const countrySelect = document.getElementById("cont-country-1");
        if (!countrySelect.disabled) {
            countrySelect.disabled = false;
            populateStates("India"); // Default to India
        }
    });

    // Event listener to populate cities based on state selection
    document.getElementById("cont-state-1").addEventListener("change", function () {
        const selectedCountry = "India"; // Assuming only India is available in the country field
        const selectedState = this.value;
        populateCities(selectedCountry, selectedState);
    });

    // Function to check if any field has been modified
    const checkForChanges = () => {
        let modified = false;
        inputs2.forEach(input => {
            const initialValue = initialValues[input.id];
            const currentValue = input.value || input.selectedIndex;

            // Check if value has changed (for select elements, we use selectedIndex)
            if (initialValue !== currentValue) {
                modified = true;
            }
        });

        // Show or hide the update button based on modification
        if (modified) {
            updateButton.style.display = 'block';
        } else {
            updateButton.style.display = 'none';
        }
    };

    // Add event listeners to input fields to track changes
    inputs2.forEach(input => {
        input.addEventListener('input', checkForChanges); // For text fields and textarea
        if (input.tagName === "SELECT") {
            input.addEventListener('change', checkForChanges); // For select fields
        }
    });

    // Initialize country selection (India) and populate states and cities on load
    const initialCountry = "India";
    populateStates(initialCountry);
    populateCities(initialCountry, "Karnataka"); // Default to Karnataka state and city

    // Add event listener for update button click
    updateButton.addEventListener("click", () => {
        showNotification("Updated successfully");

        // Hide the Update button after update
        updateButton.style.display = 'none';
    });
});




// Initialize the currentIndex for each slider container
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

// Service
document.addEventListener("DOMContentLoaded", function() {
    // Function to remove a service
    function removeService(event) {
      const serviceElement = event.target.closest('.single-service');
      if (serviceElement) {
        serviceElement.remove();
        toggleUpdateButton();  // Call to toggle the update button visibility
      }
    }
  
    // Function to show/hide the update button
    function toggleUpdateButton() {
      const updateButton = document.getElementById("update-button");
      updateButton.style.display = "block";  // Show the update button
    }
  
    // Function to handle Update button click
    function handleUpdateButtonClick() {
      showNotification("Services have been updated.");
      const updateButton = document.getElementById("update-button");
      updateButton.style.display = "none";  // Hide the update button after clicking
    }
  
    // Add remove functionality to each existing service (Building & Renovation Services)
    const constructionServices = document.querySelectorAll('.remove-service');
    constructionServices.forEach(service => {
      service.addEventListener('click', removeService);
    });
  
    // Add remove functionality to each existing service (Finishing & Maintenance Services)
    const otherServices = document.querySelectorAll('.remove-service');
    otherServices.forEach(service => {
      service.addEventListener('click', removeService);
    });
  
    // Handle Add More for Building & Renovation Services
    const addConstructionButton = document.getElementById("add-construction-service");
    const constructionInputContainer = document.getElementById("construction-input-container");
    const addConstructionServiceBtn = document.getElementById("add-construction-button");
  
    addConstructionButton.addEventListener("click", function() {
      constructionInputContainer.style.display = "block"; // Show input
    });
  
    addConstructionServiceBtn.addEventListener("click", function() {
        toggleUpdateButton();
      const inputValue = document.getElementById("construction-input").value;
      if (inputValue.trim() !== "") {
        const newService = document.createElement("div");
        newService.classList.add("single-service");
        newService.innerHTML = `<span>${inputValue}</span><span class="remove-service">x</span>`;
        document.getElementById("construction-services-list").appendChild(newService);
  
        // Add event listener to the new cross mark
        newService.querySelector('.remove-service').addEventListener('click', removeService);
        document.getElementById("construction-input").value = ""; // Clear input
        constructionInputContainer.style.display = "none"; // Hide input
  
         // Show the update button after adding a new service
      }
    });
  
    // Handle Add More for Finishing & Maintenance Services
    const addOtherButton = document.getElementById("add-other-service");
    const otherInputContainer = document.getElementById("other-input-container");
    const addOtherServiceBtn = document.getElementById("add-other-button");
  
    addOtherButton.addEventListener("click", function() {
      otherInputContainer.style.display = "block"; // Show input
    });
  
    addOtherServiceBtn.addEventListener("click", function() {
      const inputValue = document.getElementById("other-input").value;
      if (inputValue.trim() !== "") {
        const newService = document.createElement("div");
        newService.classList.add("single-service");
        newService.innerHTML = `<span>${inputValue}</span><span class="remove-service">x</span>`;
        document.getElementById("other-services-list").appendChild(newService);
  
        // Add event listener to the new cross mark
        newService.querySelector('.remove-service').addEventListener('click', removeService);
        document.getElementById("other-input").value = ""; // Clear input
        otherInputContainer.style.display = "none"; // Hide input
  
        toggleUpdateButton();  // Show the update button after adding a new service
      }
    });
  
    // Attach event listener to the Update button
    const updateButton = document.getElementById("update-button");
    updateButton.addEventListener("click", handleUpdateButtonClick);
  });
  

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



