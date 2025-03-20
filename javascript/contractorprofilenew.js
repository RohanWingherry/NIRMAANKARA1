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
const menuItems = {
  org: document.getElementById("org-txt"),
  projects: document.getElementById("projects-txt"),
  payment: document.getElementById("payment-txt"),
  personal: document.getElementById("personal-txt"),
};

const personalSubmitBtn = document.getElementById("personal-submit-btn");
const orgSubmitBtn = document.getElementById("org-submit-btn");
const personalTxt = document.getElementById("personal-txt");
const organisationTxt = document.getElementById("org-txt");
const projectsTxt = document.getElementById("projects-txt");

// Function to check if all personal details are filled
const isPersonalDetailsComplete = () =>
  [
    "contractor-name",
    "mobile-no",
    "email-id",
    "work-exp",
    "aadhaar-number",
    "contractor-address",
    "contractor-city",
    "contractor-pincode",
    "contractor-state",
    "contractor-country",
    "response-time",
  ].every((id) => document.getElementById(id).value.trim());

// Function to check if all organisation details are filled
const isOrganisationDetailsComplete = () =>
  [
    "org-name",
    "gst-no",
    "working-from",
    "working-to",
    "org-address",
    "org-state",
    "org-desc",
  ].every((id) => document.getElementById(id).value.trim());

// Generalized navigation handler
const handleNavigation = (targetDiv) => {
  if (targetDiv === menuItems.projects) {
    showNotification("You can only access this section after completing organisation details.");
  } else if (targetDiv === menuItems.org) {
    if (isPersonalDetailsComplete()) {
      document.querySelectorAll(
        ".personal-all-details, .organisation-all-details, .project-all-details, .payment-all-details"
      ).forEach(
        (div) => (div.style.display = "none")
      );
      document.querySelector(".organisation-all-details").style.display = "flex";
      organisationTxt.classList.add("profile-txt-finished");
    } else {
      showNotification("Please complete all personal details before accessing organisation details.");
    }
  } else if (targetDiv === menuItems.personal) {
    document.querySelectorAll(
      ".personal-all-details, .organisation-all-details, .project-all-details, .payment-all-details"
    ).forEach(
      (div) => (div.style.display = "none")
    );
    document.querySelector(".personal-all-details").style.display = "flex";
    personalTxt.classList.add("profile-txt-finished");
  }
};

// Handle menu navigation clicks
menuItems.org.addEventListener("click", () => {
  if (isPersonalDetailsComplete()) {
    handleNavigation(menuItems.org);
  } else {
    showNotification("You need to fill out all personal details before accessing organisation details.");
  }
});

menuItems.projects.addEventListener("click", () => {
  showNotification("You can only access this section after completing organisation details.");
});

// Handle Next click on personal details
personalSubmitBtn.addEventListener("click", () => {
  if (isPersonalDetailsComplete()) {
    const mobileNo = document.getElementById('mobile-no').value;
    const aadhaar=document.getElementById('aadhaar-number').value;
    
    // Check if the mobile number is exactly 10 digits
    if (mobileNo.length === 10 && aadhaar.length==12 ) {
      handleNavigation(menuItems.org);
      document.getElementById("personal-txt").style.color = "green";
    } else {
      showNotification("Please enter correct inputs before proceeding.");
    }
  } else {
    showNotification("Please fill in all required fields before proceeding.");
  }
});

// States and Cities Data (for all the states mentioned in your list)
const countryData = {
  "India": {
      "Andhra Pradesh": ["Hyderabad", "Vijayawada", "Visakhapatnam", "Rajahmundry", "Kakinada"],
      "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Bomdila", "Aalo"],
      "Assam": ["Guwahati", "Jorhat", "Dibrugarh", "Silchar", "Tezpur"],
      "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Munger"],
      "Chhattisgarh": ["Raipur", "Bilaspur", "Durg", "Korba", "Jagdalpur"],
      "Goa": ["Panaji", "Vasco da Gama", "Margao", "Mapusa", "Ponda"],
      "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
      "Haryana": ["Chandigarh", "Gurugram", "Faridabad", "Ambala", "Hisar"],
      "Himachal Pradesh": ["Shimla", "Manali", "Kullu", "Dharamshala", "Solan"],
      "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh"],
      "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"],
      "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kottayam", "Malappuram"],
      "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"],
      "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
      "Manipur": ["Imphal", "Thoubal", "Churachandpur", "Bishnupur", "Kakching"],
      "Meghalaya": ["Shillong", "Tura", "Nongstoin", "Jowai", "Baghmara"],
      "Mizoram": ["Aizawl", "Lunglei", "Siaha", "Champhai", "Kolasib"],
      "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Mon", "Wokha"],
      "Odisha": ["Bhubaneswar", "Cuttack", "Berhampur", "Rourkela", "Sambalpur"],
      "Punjab": ["Chandigarh", "Amritsar", "Ludhiana", "Jalandhar", "Patiala"],
      "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur", "Kota", "Ajmer"],
      "Sikkim": ["Gangtok", "Namchi", "Mangan", "Rangpo", "Pakyong"],
      "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Trichy"],
      "Telangana": ["Hyderabad", "Warangal", "Khammam", "Nizamabad", "Karimnagar"],
      "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Ambassa", "Kailashahar"],
      "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Ghaziabad"],
      "Uttarakhand": ["Dehradun", "Haridwar", "Nainital", "Rishikesh", "Roorkee"],
      "West Bengal": ["Kolkata", "Howrah", "Siliguri", "Durgapur", "Asansol"]
  }
};

document.addEventListener("DOMContentLoaded", function() {
  const countrySelect = document.getElementById("contractor-country");
  const stateSelect = document.getElementById("contractor-state");
  const cityInput = document.getElementById("contractor-city");
  const cityList = document.getElementById("city-list");

  // Function to populate the states dropdown based on country selection
  countrySelect.addEventListener("change", function() {
      const selectedCountry = countrySelect.value;
      stateSelect.innerHTML = '<option value="" hidden>Select your State</option>'; // Reset states dropdown
      cityInput.value = ''; // Clear city input

      if (selectedCountry && countryData[selectedCountry]) {
          // Populate states dropdown
          const states = Object.keys(countryData[selectedCountry]);
          states.forEach(state => {
              const option = document.createElement("option");
              option.value = state;
              option.textContent = state;
              stateSelect.appendChild(option);
          });
      }
  });

  // Function to provide city suggestions based on state selection
  stateSelect.addEventListener("change", function() {
      const selectedState = stateSelect.value;
      cityList.innerHTML = ''; // Clear previous cities
      cityInput.value = ''; // Clear city input

      if (selectedState && countryData["India"][selectedState]) {
          const cities = countryData["India"][selectedState];
          cities.forEach(city => {
              const option = document.createElement("option");
              option.value = city;
              cityList.appendChild(option);
          });
      }
  });
});


// Handle Next click on organisation details
orgSubmitBtn.addEventListener("click", () => {
  if (isOrganisationDetailsComplete()) {
    const gstNo = document.getElementById('gst-no').value.toUpperCase();

    // GST validation pattern: 2 digits + 5 uppercase letters + 4 digits + 1 uppercase letter + 1 digit (1-9) + 'Z' + 1 alphanumeric
    const gstPattern = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9]{1}Z[A-Z0-9]{1}$/;

    if (gstPattern.test(gstNo)) {
      organisationTxt.classList.add("profile-txt-finished");
      document.querySelectorAll(
        ".personal-all-details, .organisation-all-details, .project-all-details, .payment-all-details"
      ).forEach((div) => (div.style.display = "none"));
      
      document.querySelector(".project-all-details").style.display = "flex";
    } else {
      showNotification("Please enter a valid GST number in the correct format.");
      organisationTxt.classList.remove("profile-txt-finished");
    }
  } else {
    showNotification("Please complete all fields in the organisation details to proceed.");
    organisationTxt.classList.remove("profile-txt-finished");
  }
});

// Handle personal text click within organisation-all-details
document.getElementById("personal-txt").addEventListener("click", () => {
  document.querySelectorAll(
    ".personal-all-details, .organisation-all-details, .project-all-details, .payment-all-details"
  ).forEach((div) => (div.style.display = "none"));
  document.querySelector(".personal-all-details").style.display = "flex";
  personalTxt.classList.add("profile-txt-finished");
});

const openModalBtn = document.querySelector(".openModalBtn");
const modal = document.getElementById("conpro-modal-add-project");
const closeModalBtn = modal.querySelector(".close");
const saveProjectBtn = modal.querySelector(".save-project");
const mainUpload = document.getElementById("conpro-main-upload");
const formSubmitBtn = document.getElementById("conpro-form-submit");

let projectCount = 0;
const maxProjects = 5;

function validateName(name) {
  return /^[A-Za-z ]+$/.test(name);
}

function validateLocation(location) {
  return /^[A-Za-z0-9 ,.-]+$/.test(location);
}

function validateArea(area) {
  return /^[0-9]+$/.test(area);
}

// Open modal
openModalBtn.addEventListener("click", () => {
  if (projectCount >= maxProjects) {
    showNotification("Upload limit exceeded. You cannot add more than 5 projects.");
  } else {
    // Clear fields/reset previews
    document.getElementById("conpro-project-name").value = "";
    document.getElementById("conpro-project-location").value = "";
    document.getElementById("conpro-project-area").value = "";
    document.getElementById("conpro-project-image").value = "";
    document.getElementById("conpro-img-preview").style.display = "none";
    document.getElementById("conpro-remove-image").style.display = "none";
    document.getElementById("conpro-project-video").value = "";
    document.getElementById("conpro-video-preview").style.display = "none";
    document.getElementById("conpro-remove-video").style.display = "none";

    modal.style.display = "block";
  }
});

// Close modal
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Image change preview
document.getElementById("conpro-project-image").addEventListener("change", function () {
  const imgPreview = document.getElementById("conpro-img-preview");
  const removeImage = document.getElementById("conpro-remove-image");
  const file = this.files[0];

  if (file && file.type.startsWith("image/")) {
    imgPreview.src = URL.createObjectURL(file);
    imgPreview.style.display = "block";
    removeImage.style.display = "block";
  } else {
    showNotification("Please upload a valid image file.");
    this.value = "";
  }
});

// Remove image
document.getElementById("conpro-remove-image").addEventListener("click", function () {
  document.getElementById("conpro-project-image").value = "";
  document.getElementById("conpro-img-preview").style.display = "none";
  this.style.display = "none";
});

// Video change preview
document.getElementById("conpro-project-video").addEventListener("change", function () {
  const vidPreview = document.getElementById("conpro-video-preview");
  const removeVideo = document.getElementById("conpro-remove-video");
  const file = this.files[0];

  if (file && file.type.startsWith("video/")) {
    vidPreview.src = URL.createObjectURL(file);
    vidPreview.style.display = "block";
    removeVideo.style.display = "block";
  } else {
    showNotification("Please upload a valid video file.");
    this.value = "";
  }
});

// Remove video
document.getElementById("conpro-remove-video").addEventListener("click", function () {
  document.getElementById("conpro-project-video").value = "";
  document.getElementById("conpro-video-preview").style.display = "none";
  this.style.display = "none";
});

// Reset form function
function resetForm() {
  document.getElementById("conpro-project-name").value = "";
  document.getElementById("conpro-project-location").value = "";
  document.getElementById("conpro-project-area").value = "";
  document.getElementById("conpro-project-image").value = "";
  document.getElementById("conpro-img-preview").style.display = "none";
  document.getElementById("conpro-remove-image").style.display = "none";
  document.getElementById("conpro-project-video").value = "";
  document.getElementById("conpro-video-preview").style.display = "none";
  document.getElementById("conpro-remove-video").style.display = "none";
}

// Save Project logic
let isEditing = false;
let currentEditingCard = null;

saveProjectBtn.addEventListener("click", () => {
  const projName = document.getElementById("conpro-project-name").value.trim();
  const projLoc = document.getElementById("conpro-project-location").value.trim();
  const projArea = document.getElementById("conpro-project-area").value.trim();
  const projImage = document.getElementById("conpro-project-image").files[0];
  const projVideo = document.getElementById("conpro-project-video").files[0];

  if (!projName || !projLoc || !projArea) {
    showNotification("Please fill in all required fields.");
    return;
  }
  if (!validateName(projName)) {
    showNotification("Project name should only contain letters and spaces.");
    return;
  }
  if (!validateLocation(projLoc)) {
    showNotification("Project location should contain only letters, numbers, spaces, commas, dots, and hyphens.");
    return;
  }
  if (!validateArea(projArea)) {
    showNotification("Project area should only contain numbers.");
    return;
  }

  if (!projImage && !isEditing) {
    showNotification("Please upload an image.");
    return;
  }
  if (!projVideo && !isEditing) {
    showNotification("Please upload a video.");
    return;
  }

  if (isEditing && currentEditingCard) {
    const nameElem = currentEditingCard.querySelector(".project-name");
    const locElem = currentEditingCard.querySelector(".project-location");
    const areaElem = currentEditingCard.querySelector(".project-area");
    const imgElem = currentEditingCard.querySelector(".project-image");
    const vidElem = currentEditingCard.querySelector(".project-video");

    nameElem.textContent = `Name: ${projName}`;
    locElem.textContent = `Location: ${projLoc}`;
    areaElem.textContent = `Area: ${projArea}`;

    if (projImage) {
      imgElem.src = URL.createObjectURL(projImage);
    }
    if (projVideo) {
      vidElem.src = URL.createObjectURL(projVideo);
    }

    isEditing = false;
    currentEditingCard = null;
  } else {
    const projectCard = document.createElement("div");
    projectCard.className = "project-card";

    const nameElem = document.createElement("p");
    nameElem.className = "project-name";
    nameElem.textContent = `Name: ${projName}`;

    const locElem = document.createElement("p");
    locElem.className = "project-location";
    locElem.textContent = `Location: ${projLoc}`;

    const areaElem = document.createElement("p");
    areaElem.className = "project-area";
    areaElem.textContent = `Area: ${projArea}`;

    const imgElem = document.createElement("img");
    imgElem.className = "project-image";
    imgElem.src = URL.createObjectURL(projImage);

    const vidElem = document.createElement("video");
    vidElem.className = "project-video";
    vidElem.src = URL.createObjectURL(projVideo);
    vidElem.controls = true;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit Project";
    editBtn.addEventListener("click", () => {
      isEditing = true;
      currentEditingCard = projectCard;
      document.getElementById("conpro-project-name").value = projName;
      document.getElementById("conpro-project-location").value = projLoc;
      document.getElementById("conpro-project-area").value = projArea;
      document.getElementById("conpro-img-preview").src = imgElem.src;
      document.getElementById("conpro-video-preview").src = vidElem.src;
      modal.style.display = "block";
    });

    projectCard.appendChild(nameElem);
    projectCard.appendChild(locElem);
    projectCard.appendChild(areaElem);
    projectCard.appendChild(imgElem);
    projectCard.appendChild(vidElem);
    projectCard.appendChild(editBtn);

    mainUpload.appendChild(projectCard);
    projectCount++;
  }

  resetForm();
  modal.style.display = "none";
});



// Handle form submission
formSubmitBtn.addEventListener("click", () => {
  if (projectCount > 0) {
    window.location.href = "../html/contractorleadpackageplans.html";
  } else {
    showNotification("Please upload at least one project before proceeding.");
  }
});

// Close modal when clicking outside
window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

// Personal Profile Picture Handling
const personalProfilePic = document.querySelector("#personal-profile-img");
const personalUserFile = document.querySelector("#personal-file-path");
const personalDeleteBtn = document.getElementById("personal-delete-btn");

personalUserFile.onchange = function () {
  if (personalUserFile.files.length > 0) {
    personalProfilePic.src = URL.createObjectURL(personalUserFile.files[0]);
    personalDeleteBtn.style.display = "block";
  }
};

personalDeleteBtn.onclick = function () {
  personalProfilePic.src = "../assets/profile.jpg";
  personalUserFile.value = "";
  personalDeleteBtn.style.display = "none";
};

// Organisation Profile Picture Handling
const organisationProfilePic = document.querySelector("#organisation-profile-img");
const organisationUserFile = document.querySelector("#organisation-file-path");
const organisationDeleteBtn = document.getElementById("organisation-delete-btn");

organisationUserFile.onchange = function () {
  if (organisationUserFile.files.length > 0) {
    organisationProfilePic.src = URL.createObjectURL(organisationUserFile.files[0]);
    organisationDeleteBtn.style.display = "block";
  }
};

organisationDeleteBtn.onclick = function () {
  organisationProfilePic.src = "../assets/build.png";
  organisationUserFile.value = "";
  organisationDeleteBtn.style.display = "none";
};

// Input field restrictions
document.getElementById('contractor-name').addEventListener('input', function(event) {
  let value = event.target.value;
          value = value.replace(/[^a-zA-Z\s]/g, '');
          if (value.startsWith(' ')) {
              value = value.slice(1);
          }
          event.target.value = value;
});

document.getElementById('mobile-no').addEventListener('input', function(event) {
  event.target.value = event.target.value.replace(/[^0-9]/g, '');
  
  if (event.target.value.length > 0 && !['6', '7', '8', '9'].includes(event.target.value[0])) {
    event.target.value = '';
  }
  
  if (event.target.value.length > 10) {
    event.target.value = event.target.value.substring(0, 10);
  }
});
document.getElementById('email-id').addEventListener('input', function(event) {
  event.target.value = event.target.value.replace(/[^a-zA-Z0-9.@]/g, '');
});
document.getElementById('work-exp').addEventListener('input', function(event) {
  event.target.value = event.target.value.replace(/[^0-9]/g, '');

  if (event.target.value.length > 2) {
    event.target.value = event.target.value.substring(0, 2);
  }
});

document.getElementById('aadhaar-number').addEventListener('input', function(event) {
  event.target.value = event.target.value.replace(/[^0-9]/g, '');

  if (event.target.value.length > 0 && ['0', '1'].includes(event.target.value[0])) {
    event.target.value = '';
  }

  if (event.target.value.length > 12) {
    event.target.value = event.target.value.substring(0, 12);
  }
});

document.getElementById('contractor-address').addEventListener('input', function(event) {
  let value = event.target.value;
          value = value.replace(/[^a-zA-Z0-9#,\s]/g, '');

          if (value.startsWith(' ')) {
              value = value.slice(1);
          }

          event.target.value = value;
});
document.getElementById('contractor-city').addEventListener('input', function(event) {
  event.target.value = event.target.value.replace(/[^a-zA-Z]/g, '');
});
document.getElementById('contractor-pincode').addEventListener('input', function(event) {
  event.target.value = event.target.value.replace(/[^0-9]/g, '');

  if (event.target.value.length > 6) {
    event.target.value = event.target.value.substring(0, 6);
  }
});

document.getElementById('org-name').addEventListener('input', function(event) {
  let value = event.target.value;
          value = value.replace(/[^a-zA-Z\s]/g, '');

          if (value.startsWith(' ')) {
              value = value.slice(1);
          }

          event.target.value = value;
});
document.getElementById('gst-no').addEventListener('input', function(event) {
  let value = event.target.value.toUpperCase(); // Convert input to uppercase

  // Allow only numbers and uppercase letters
  value = value.replace(/[^0-9A-Z]/g, '');

  event.target.value = value; // Update input field with valid characters only
});



// Remove service when X is clicked
document.addEventListener("DOMContentLoaded", function() {
  // Function to remove a service
  function removeService(event) {
      const serviceElement = event.target.closest('.single-service');
      if (serviceElement) {
          serviceElement.remove();
      }
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
      const inputValue = document.getElementById("construction-input").value;
      if (inputValue.trim() !== "") {
          const newService = document.createElement("div");
          newService.classList.add("single-service");
          newService.innerHTML = `<span>${inputValue}</span><span class="remove-service">X</span>`;
          document.getElementById("construction-services-list").appendChild(newService);

          // Add event listener to the new cross mark
          newService.querySelector('.remove-service').addEventListener('click', removeService);
          document.getElementById("construction-input").value = ""; // Clear input
          constructionInputContainer.style.display = "none"; // Hide input
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
          newService.innerHTML = `<span>${inputValue}</span><span class="remove-service">X</span>`;
          document.getElementById("other-services-list").appendChild(newService);

          // Add event listener to the new cross mark
          newService.querySelector('.remove-service').addEventListener('click', removeService);
          document.getElementById("other-input").value = ""; // Clear input
          otherInputContainer.style.display = "none"; // Hide input
      }
  });
});




