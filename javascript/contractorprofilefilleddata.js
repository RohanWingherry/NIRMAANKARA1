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




// Organisation Logo and Organisation Text
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


//Organisation Edit Button
const editIcon = document.getElementById('edit-icon');  // Updated ID
const inputs = document.querySelectorAll('.form-group1 input, .form-group1 textarea');
const updateBtnContainer = document.getElementById('update-btn-container');
const updateBtn = document.getElementById('update-btn');

let hasChanges = false;

editIcon.addEventListener('click', () => {
    if (!hasChanges) {
        inputs.forEach(input => {
            input.disabled = !input.disabled;
        });

        const fileInput = document.getElementById('file-input');
        if (fileInput) {
            fileInput.disabled = !fileInput.disabled;
        }

        updateBtnContainer.style.display = 'none';
    }
});

inputs.forEach(input => {
    input.addEventListener('input', () => {
        hasChanges = true;
        updateBtnContainer.style.display = 'block';
    });
});

function handleUpdateClick1() {
    showNotification('Updated successfully');
    inputs.forEach(input => {
        input.disabled = true;  // Disable all input fields after update
    });

    const fileInput = document.getElementById('file-input');
    if (fileInput) {
        fileInput.disabled = true;  // Disable the file input after update
    }

    updateBtnContainer.style.display = 'none';
    hasChanges = false;
}

// profile pic
    // Select the file input element and update button container
    const profilePicInput = document.getElementById("profile-pic-input");
    const updatePicBtnContainer = document.getElementById("update-pic-btn-container");

    // Function to update the profile picture
    function updateProfilePic(event) {
        const profilePic = document.getElementById("profile-pic");
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profilePic.src = e.target.result;
                // Display the update button once an image is loaded
                updatePicBtnContainer.style.display = "block";
            };
            reader.readAsDataURL(file);
        }
    }

    // Add event listener for the file input change
    profilePicInput.addEventListener("change", updateProfilePic);

    // Handle the update button click
    function handlePicUpdateClick() {
        // Show a notification when the Update button is clicked
        showNotification("Profile picture updated!");

        // Hide the update button after the alert
        updatePicBtnContainer.style.display = "none";
    }


    // Add event listener for the update button click
    const updatePicBtn = document.getElementById("update-pic-btn");
    if (updatePicBtn) {
        updatePicBtn.addEventListener("click", handlePicUpdateClick);
    }


// Personal Info 
document.addEventListener("DOMContentLoaded", function () {
    
    const editIcon2 = document.querySelector('.personal-info-container .header .material-symbols-rounded');
    const inputs2 = document.querySelectorAll('.personal-info-container .form-group input, .personal-info-container .form-group textarea, .personal-info-container .form-group select');
    const updateButton = document.getElementById("personal-details-update");
    const initialValues = {};

    // Store initial values of the input fields
    inputs2.forEach(input => {
        initialValues[input.id] = input.value || input.selectedIndex;
    });

    // Country data (already defined)
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

    const populateStates = (country) => {
        const stateSelect = document.getElementById("cont-state-1");
        const cityInput = document.getElementById("cont-city-1");

        stateSelect.innerHTML = '<option value="" disabled>Select your State</option>';
        const states = Object.keys(countryData[country]);

        states.forEach(state => {
            const option = document.createElement("option");
            option.value = state;
            option.textContent = state;
            stateSelect.appendChild(option);
        });

        cityInput.disabled = true;
    };

    const populateCities = (country, state) => {
        const cityInput = document.getElementById("cont-city-1");
        const selectedStateData = countryData[country][state];

        cityInput.disabled = false;
        cityInput.value = '';
        const cities = selectedStateData.cities;

        cityInput.value = cities[0];
    };

    const checkForChanges = () => {
        let modified = false;
        inputs2.forEach(input => {
            const initialValue = initialValues[input.id];
            const currentValue = input.value || input.selectedIndex;

            if (initialValue !== currentValue) {
                modified = true;
            }
        });

        if (modified) {
            editIcon2.style.pointerEvents = 'none'; // Disable the Edit button if any change occurs
        } else {
            editIcon2.style.pointerEvents = 'auto'; // Enable the Edit button if no changes
        }

        if (modified) {
            updateButton.style.display = 'block'; // Show Update button if any field is modified
        } else {
            updateButton.style.display = 'none'; // Hide Update button if no changes
        }
    };

    inputs2.forEach(input => {
        input.addEventListener('input', checkForChanges);
        if (input.tagName === "SELECT") {
            input.addEventListener('change', checkForChanges);
        }
    });

    editIcon2.addEventListener('click', () => {
        inputs2.forEach(input => {
            input.disabled = !input.disabled;
        });

        const countrySelect = document.getElementById("cont-country-1");
        if (!countrySelect.disabled) {
            countrySelect.disabled = false;
            populateStates("India");
        }
    });

    document.getElementById("cont-state-1").addEventListener("change", function () {
        const selectedCountry = "India";
        const selectedState = this.value;
        populateCities(selectedCountry, selectedState);
    });

    const initialCountry = "India";
    populateStates(initialCountry);
    populateCities(initialCountry, "Karnataka");

    // Validation function for all fields
    const validateFields = () => {
        let isValid = true;

        // Reset the input borders to default
        inputs2.forEach(input => {
            input.style.border = ''; // Remove any previous red borders
        });

        // Check Mobile Number (must be 10 digits)
        const mobileNumber = document.getElementById("phone-number");
        if (mobileNumber.value.length !== 10 || !/^\d{10}$/.test(mobileNumber.value)) {
            mobileNumber.style.border = '2px solid red';
            isValid = false;
        }

        // Check Pincode (must be 6 digits)
        const pincode = document.getElementById("cont-pincode-1");
        if (pincode.value.length !== 6 || !/^\d{6}$/.test(pincode.value)) {
            pincode.style.border = '2px solid red';
            isValid = false;
        }

        // Check Aadhaar Number (must be 12 digits)
        const aadhaarNumber = document.getElementById("aadhaar-number");
        if (aadhaarNumber.value.length !== 12 || !/^\d{12}$/.test(aadhaarNumber.value)) {
            aadhaarNumber.style.border = '2px solid red';
            isValid = false;
        }

        // Check Work Experience (should not exceed 60 years)
        const workExperience = document.getElementById("work-exp");
        if (parseInt(workExperience.value, 10) > 60) {
            workExperience.style.border = '1px solid red';
            isValid = false;
        }

        return isValid;
    };

    updateButton.addEventListener("click", () => {
        if (validateFields()) {
            showNotification("Updated successfully");

            inputs2.forEach(input => {
                input.disabled = true;
            });

            const fileInput = document.getElementById('file-input');
            if (fileInput) {
                fileInput.disabled = true;
            }

            updateButton.style.display = 'none';
            editIcon2.style.pointerEvents = 'auto'; // Enable the Edit button after update
        } else {
            showNotification("Please fix the highlighted errors and try again.");
        }
    });
});


// Service
// Function to toggle the update button visibility
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
  
  // Function to check if any checkbox is deselected
  function checkDeselectedCheckboxes() {
    const checkboxes = document.querySelectorAll('.service-checkbox');
    let isDeselected = false;
  
    checkboxes.forEach(checkbox => {
      if (!checkbox.checked) {
        isDeselected = true;
      }
    });
  
    if (isDeselected) {
      toggleUpdateButton();  // Show the update button if any checkbox is deselected
    } else {
      const updateButton = document.getElementById("update-button");
      updateButton.style.display = "none";  // Hide the update button if no checkboxes are deselected
    }
  }
  
  // Add event listeners to all checkboxes to track deselect action
  const allCheckboxes = document.querySelectorAll('.service-checkbox');
  allCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', checkDeselectedCheckboxes);
  });
  
  // Function to add new service to the list (Building & Renovation Services)
  const addConstructionButton = document.getElementById("add-construction-service");
  const constructionInputContainer = document.getElementById("construction-input-container");
  const addConstructionServiceBtn = document.getElementById("add-construction-button");
  
  addConstructionButton.addEventListener("click", function() {
    constructionInputContainer.style.display = "block"; // Show input
  });
  
  addConstructionServiceBtn.addEventListener("click", function() {
    const inputValue = document.getElementById("construction-input").value;
    if (inputValue.trim() === "") {
      showNotification("Please enter a service name.");
    } else {
      toggleUpdateButton();
      const newService = document.createElement("div");
      newService.classList.add("single-service");
      newService.innerHTML = `
        <input type="checkbox" class="service-checkbox" checked>
        <span>${inputValue}</span>`;
      document.getElementById("construction-services-list").appendChild(newService);
  
      // Add event listener to the new checkbox
      newService.querySelector('.service-checkbox').addEventListener('change', checkDeselectedCheckboxes);
  
      // Reset input field and hide it after adding the service
      document.getElementById("construction-input").value = "";
      constructionInputContainer.style.display = "none"; // Hide input
    }
  });
  
  // Function to add new service to the list (Finishing & Maintenance Services)
  const addOtherButton = document.getElementById("add-other-service");
  const otherInputContainer = document.getElementById("other-input-container");
  const addOtherServiceBtn = document.getElementById("add-other-button");
  
  addOtherButton.addEventListener("click", function() {
    otherInputContainer.style.display = "block"; // Show input
  });
  
  addOtherServiceBtn.addEventListener("click", function() {
    const inputValue = document.getElementById("other-input").value;
    if (inputValue.trim() === "") {
      showNotification("Please enter a service name.");
    } else {
      const newService = document.createElement("div");
      newService.classList.add("single-service");
      newService.innerHTML = `
        <input type="checkbox" class="service-checkbox" checked>
        <span>${inputValue}</span>`;
      document.getElementById("other-services-list").appendChild(newService);
  
      // Add event listener to the new checkbox
      newService.querySelector('.service-checkbox').addEventListener('change', checkDeselectedCheckboxes);
  
      // Reset input field and hide it after adding the service
      document.getElementById("other-input").value = "";
      otherInputContainer.style.display = "none"; // Hide input
  
      toggleUpdateButton(); // Show the update button after adding a new service
    }
  });
  
  // Attach event listener to the Update button
  const updateButton = document.getElementById("update-button");
  updateButton.addEventListener("click", handleUpdateButtonClick);
  

// Slider
// Initialize all sliders
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
  
  // Function to open the edit modal and populate it with the current project details
  function openEditModal(button) {
    const projectBox = button.closest('.project-box');
    const projectName = projectBox.querySelector('.pro-name').innerText;
    const projectPrice = projectBox.querySelector('.price').innerText;
    const projectAddress = projectBox.querySelector('.pro-address').innerText;
    const contractorName = projectBox.querySelector('.con-name').innerText;
  
    // Set the modal values to current project details
    document.getElementById('projects1ProjectName').value = projectName;
    document.getElementById('projects1ProjectPrice').value = projectPrice;
    document.getElementById('projects1ProjectAddress').value = projectAddress;
    document.getElementById('projects1ContractorName').value = contractorName;
  
    // Open the modal
    document.getElementById('projects1EditModal').style.display = "block";
  
    // Store the reference to the current project box for later use
    document.getElementById('projects1EditForm').onsubmit = function(event) {
      event.preventDefault();
      updateProject(projectBox);
    };
  }
  
  // Function to close the modal
  function closeModal() {
    document.getElementById('projects1EditModal').style.display = "none";
  }
  
  // Function to update the project details after the user clicks "Update"
  function updateProject(projectBox) {
    const updatedName = document.getElementById('projects1ProjectName').value;
    const updatedPrice = document.getElementById('projects1ProjectPrice').value;
    const updatedAddress = document.getElementById('projects1ProjectAddress').value;
    const updatedContractorName = document.getElementById('projects1ContractorName').value;
    const updatedImage = document.getElementById('projects1ImageUpload').files[0];
    const updatedVideo = document.getElementById('projects1VideoUpload').files[0];
  
    // Update project name, price, address, and contractor name
    projectBox.querySelector('.pro-name').innerText = updatedName;
    projectBox.querySelector('.price').innerText = updatedPrice;
    projectBox.querySelector('.pro-address').innerText = updatedAddress;
    projectBox.querySelector('.con-name').innerText = `Contractor: ${updatedContractorName}`;
  
    // Update image and video if files are uploaded
    if (updatedImage) {
      const imageElement = projectBox.querySelector('img');
      imageElement.src = URL.createObjectURL(updatedImage); // For demonstration purposes
    }
  
    if (updatedVideo) {
      const videoElement = projectBox.querySelector('video');
      videoElement.src = URL.createObjectURL(updatedVideo); // For demonstration purposes
    }
  
    // Close the modal after updating
    closeModal();
  }
  
  // Close the modal if the user clicks on the close (x) button
  document.querySelector('.projects1Close').onclick = closeModal;
  



