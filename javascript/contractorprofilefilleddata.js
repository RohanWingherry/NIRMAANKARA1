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

  const editIcon = document.getElementById('edit-icon');
  const inputs = document.querySelectorAll('.form-group input, .form-group textarea, #file-input');
  
  // Add click event listener to the edit icon
  editIcon.addEventListener('click', () => {
      // Toggle the disabled property on all the input elements
      inputs.forEach(input => {
          input.disabled = !input.disabled;
      });
  });
  const editIcon1 = document.getElementById('edit-icon1');
  const inputs1 = document.querySelectorAll('.form-group1 input, .form-group1textarea, #file-input');
  
  // Add click event listener to the edit icon
  editIcon1.addEventListener('click', () => {
      // Toggle the disabled property on all the input elements
      inputs1.forEach(input => {
          input.disabled = !input.disabled;
      });
  });