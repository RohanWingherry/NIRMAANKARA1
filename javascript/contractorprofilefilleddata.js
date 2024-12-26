function updateImage(event) {
    const profileImage = document.getElementById("profile-image");
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profileImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
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
          newService.innerHTML = `<span>${inputValue}</span><span class="remove-service">X</span>`;
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

// Handle the second edit icon (personal info)
const editIcon2 = document.querySelector('.personal-info-container .header .material-symbols-rounded');
const inputs2 = document.querySelectorAll('.personal-info-container .form-group input, .personal-info-container .form-group textarea');

// Add click event listener to the edit icon for personal info
editIcon2.addEventListener('click', () => {
    // Toggle the disabled property on all input and textarea elements
    inputs2.forEach(input => {
        input.disabled = !input.disabled;
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



