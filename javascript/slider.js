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

// Handle the like button functionality
// Initialize like counts on page load based on data-likes attribute
document.querySelectorAll('.slide').forEach(slide => {
    const likes = parseInt(slide.getAttribute('data-likes'), 10) || 0;
    slide.querySelector('.like-count').textContent = likes;
});

// Like/Unlike functionality
function likeSlide(event) {
    const button = event.currentTarget;
    const slide = button.closest('.slide');
    const likeCountElement = button.querySelector('.like-count');
    const heartIcon = button.querySelector('i');

    // Retrieve the current like count from data-likes attribute
    let likes = parseInt(slide.getAttribute('data-likes'), 10) || 0;

    // Toggle like/unlike
    if (button.classList.contains('liked')) {
        // Unlike: decrement the count, remove 'liked' class, and reset icon color
        likes -= 1;
        button.classList.remove('liked');
        heartIcon.style.color = ''; // Reset to default color
    } else {
        // Like: increment the count, add 'liked' class, and change icon color
        likes += 1;
        button.classList.add('liked');
        heartIcon.style.color = 'red'; // Fill with red color
    }

    // Update the like count in data attribute and visually
    slide.setAttribute('data-likes', likes);
    likeCountElement.textContent = likes;
}






// sep
// reset
// Function to reset borders
function resetBorders() {
    document.querySelectorAll(".cat-box").forEach(function(box) {
        box.style.border = 'none';
    });
}

// Function to hide all category blocks
function hideAllBlocks() {
    document.querySelectorAll(".cat-main-contractor, .cat-main-builder, .cat-main-sell-property, .cat-main-buy-property, .cat-main-levying-rent, .cat-main-leasing-out").forEach(function(block) {
        block.style.display = 'none';
    });
}

// Contractor block function
function contractorBlock(element) {
    resetBorders();
    hideAllBlocks();
    document.querySelector(".cat-main-contractor").style.display = 'block';
    
    if (window.innerWidth <= 768) { 
        element.style.border = '1px solid red';
        document.querySelector(".cat-main-contractor").scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }
}

// Builder block function
function builderBlock(element) {
    resetBorders();
    hideAllBlocks();
    document.querySelector(".cat-main-builder").style.display = 'block';
    
    if (window.innerWidth <= 768) { 
        element.style.border = '1px solid red';
        document.querySelector(".cat-main-builder").scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }
}

// Sell property block function
function sellPropertyBlock(element) {
    resetBorders();
    hideAllBlocks();
    document.querySelector(".cat-main-sell-property").style.display = 'block';
    
    if (window.innerWidth <= 768) { 
        element.style.border = '1px solid red';
        document.querySelector(".cat-main-sell-property").scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }
}

// Buy property block function
function buyPropertyBlock(element) {
    resetBorders();
    hideAllBlocks();
    document.querySelector(".cat-main-buy-property").style.display = 'block';
    
    if (window.innerWidth <= 768) { 
        element.style.border = '1px solid red';
        document.querySelector(".cat-main-buy-property").scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }
}

// Levying rent block function
function levingRentBlock(element) {
    resetBorders();
    hideAllBlocks();
    document.querySelector(".cat-main-levying-rent").style.display = 'block';
    
    if (window.innerWidth <= 768) { 
        element.style.border = '1px solid red';
        document.querySelector(".cat-main-levying-rent").scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }
}

// Leasing out block function
function leasingOutBlock(element) {
    resetBorders();
    hideAllBlocks();
    document.querySelector(".cat-main-leasing-out").style.display = 'block';
    
    if (window.innerWidth <= 768) { 
        element.style.border = '1px solid red';
        document.querySelector(".cat-main-leasing-out").scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    }
}

// Hide blocks when clicking outside of the category
document.addEventListener('click', function(event) {
    if (!event.target.closest('.cat-box') && !event.target.closest('.cat-main-contractor, .cat-main-builder, .cat-main-sell-property, .cat-main-buy-property, .cat-main-levying-rent, .cat-main-leasing-out')) {
        hideAllBlocks();
        resetBorders();
    }
});

// dropdowns

//contractor drop
function dropdiv() {
    document.querySelector(".con-sub-div").style.display = "block";
    document.querySelector(".con-sub-div2").style.display = "none";
    document.querySelector(".con-select").classList.add("con-active");
    document.querySelector(".con-select2").classList.remove("con-active");
  }
  
  function dropdiv2() {
    document.querySelector(".con-sub-div2").style.display = "block";
    document.querySelector(".con-sub-div").style.display = "none";
    document.querySelector(".con-select2").classList.add("con-active");
    document.querySelector(".con-select").classList.remove("con-active");
  }

//builder drop
function dropBuilderDiv1(){
    document.querySelector(".builder-sub-div").style.display = "block";
    document.querySelector(".builder-sub-div2").style.display = "none";
    document.querySelector(".builder-select").classList.add("builder-active");
    document.querySelector(".builder-select2").classList.remove("builder-active");
}
function dropBuilderDiv2(){
    document.querySelector(".builder-sub-div2").style.display = "block";
    document.querySelector(".builder-sub-div").style.display = "none";
    document.querySelector(".builder-select2").classList.add("builder-active");
    document.querySelector(".builder-select").classList.remove("builder-active");
}

//property sell drop
function dropSellDiv1(){
    document.querySelector(".sell-sub-div").style.display = "block";
    document.querySelector(".sell-sub-div2").style.display = "none";
    document.querySelector(".sell-sub-div3").style.display = "none";
    document.querySelector(".sell-select").classList.add("sell-active");
    document.querySelector(".sell-select2").classList.remove("sell-active");
    document.querySelector(".sell-select3").classList.remove("sell-active");
}
function dropSellDiv2(){
    document.querySelector(".sell-sub-div2").style.display = "block";
    document.querySelector(".sell-sub-div").style.display = "none";
    document.querySelector(".sell-sub-div3").style.display = "none";
    document.querySelector(".sell-select2").classList.add("sell-active");
    document.querySelector(".sell-select").classList.remove("sell-active");
    document.querySelector(".sell-select3").classList.remove("sell-active");
}
function dropSellDiv3(){
    document.querySelector(".sell-sub-div3").style.display = "block";
    document.querySelector(".sell-sub-div2").style.display = "none";
    document.querySelector(".sell-sub-div").style.display = "none";
    document.querySelector(".sell-select3").classList.add("sell-active");
    document.querySelector(".sell-select2").classList.remove("sell-active");
    document.querySelector(".sell-select").classList.remove("sell-active");
}

//property sell drop
function dropBuyDiv1(){
    document.querySelector(".buy-sub-div").style.display = "block";
    document.querySelector(".buy-sub-div2").style.display = "none";
    document.querySelector(".buy-sub-div3").style.display = "none";
    document.querySelector(".buy-select").classList.add("buy-active");
    document.querySelector(".buy-select2").classList.remove("buy-active");
    document.querySelector(".buy-select3").classList.remove("buy-active");
}
function dropBuyDiv2(){
    document.querySelector(".buy-sub-div2").style.display = "block";
    document.querySelector(".buy-sub-div").style.display = "none";
    document.querySelector(".buy-sub-div3").style.display = "none";
    document.querySelector(".buy-select2").classList.add("buy-active");
    document.querySelector(".buy-select").classList.remove("buy-active");
    document.querySelector(".buy-select3").classList.remove("buy-active");
}
function dropBuyDiv3(){
    document.querySelector(".buy-sub-div3").style.display = "block";
    document.querySelector(".buy-sub-div2").style.display = "none";
    document.querySelector(".buy-sub-div").style.display = "none";
    document.querySelector(".buy-select3").classList.add("buy-active");
    document.querySelector(".buy-select2").classList.remove("buy-active");
    document.querySelector(".buy-select").classList.remove("buy-active");
}
//Rentor
function dropLevyingDiv1(){
    document.querySelector(".levying-sub-div").style.display = "block";
    document.querySelector(".levying-sub-div2").style.display = "none";
    document.querySelector(".levying-sub-div3").style.display = "none";
    document.querySelector(".levying-select").classList.add("leving-active");
    document.querySelector(".levying-select2").classList.remove("leving-active");
    document.querySelector(".levying-select3").classList.remove("leving-active");
}
function dropLevyingDiv2(){
    document.querySelector(".levying-sub-div2").style.display = "block";
    document.querySelector(".levying-sub-div").style.display = "none";
    document.querySelector(".levying-sub-div3").style.display = "none";
    document.querySelector(".levying-select2").classList.add("leving-active");
    document.querySelector(".levying-select").classList.remove("leving-active");
    document.querySelector(".levying-select3").classList.remove("leving-active");
}
function dropLevyingDiv3(){
    document.querySelector(".levying-sub-div3").style.display = "block";
    document.querySelector(".levying-sub-div2").style.display = "none";
    document.querySelector(".levying-sub-div").style.display = "none";
    document.querySelector(".levying-select3").classList.add("leving-active");
    document.querySelector(".levying-select2").classList.remove("leving-active");
    document.querySelector(".levying-select").classList.remove("leving-active");
}
//Rental
function dropLeasingDiv1(){
    document.querySelector(".leasing-sub-div").style.display = "block";
    document.querySelector(".leasing-sub-div2").style.display = "none";
    document.querySelector(".leasing-select").classList.add("leasing-active");
    document.querySelector(".leasing-select2").classList.remove("leasing-active");
}
function dropLeasingDiv2(){
    document.querySelector(".leasing-sub-div2").style.display = "block";
    document.querySelector(".leasing-sub-div").style.display = "none";
    document.querySelector(".leasing-select2").classList.add("leasing-active");
    document.querySelector(".leasing-select").classList.remove("leasing-active");
}

  

// pop up modal
// Wait for DOM to load
// Wait for DOM to load
// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('popup'); // The single modal
    const closeButton = modal.querySelector('.close');

    // Open modal on button click
    document.querySelectorAll('.get-quote-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            modal.style.display = 'block'; // Show the modal
        });
    });

    // Close modal on close button click
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none'; // Hide the modal
    });

    // Close modal when clicking outside modal content
    modal.addEventListener('click', (event) => {
        const content = modal.querySelector('.popup-content');
        if (event.target === modal) {
            modal.style.display = 'none'; // Hide modal
        }
    });
});


// Open popup function
function openPopup() {
    document.getElementById("popup").style.display = "block";
}

// Close popup function
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// Handle dropdown logic
const form = document.getElementById("constructionForm");
const nameTypeSelect = document.getElementById("nameType");
const otherNameTypeInput = document.getElementById("otherNameType");

nameTypeSelect.addEventListener("change", function () {
    if (this.value === "other") {
        otherNameTypeInput.style.display = "block";
        otherNameTypeInput.setAttribute("required", "true");
    } else {
        otherNameTypeInput.style.display = "none";
        otherNameTypeInput.removeAttribute("required");
    }
});

// Handle form submission
// form.addEventListener("submit", function (event) {
//     event.preventDefault(); // Prevent form submission for validation

//     const fullName = document.getElementById("fullName").value.trim();
//     const phoneNumber = document.getElementById("phoneNumber").value.trim();
//     const nameType = document.getElementById("nameType").value;
//     const landSize = document.getElementById("landSize").value.trim();
//     const landAddress = document.getElementById("landAddress").value.trim();

//     if (!fullName || !phoneNumber || nameType === "select" || !landSize || !landAddress || 
//         (nameType === "other" && !otherNameTypeInput.value.trim())) {
//         alert("Please fill in all required fields.");
//     } else {
//         alert("Get Quote Sent");
//         // Reset form or close modal logic here
//         form.reset(); // Reset form fields
//         closePopup(); // Close the popup
//     }
// });


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
        alert("Phone Number must be exactly 10 digits.");
        return false;
    }

    // Land Size: Only positive numbers allowed
    const landSize = document.getElementById("landSize").value.trim();
    if (isNaN(landSize) || landSize <= 0) {
        alert("Land Size must be a positive number.");
        return false;
    }

    // Address: Letters, numbers, and '#' allowed
    const landAddress = document.getElementById("landAddress").value.trim();
    const addressRegex = /^[a-zA-Z0-9#\s]+$/;
    if (!addressRegex.test(landAddress)) {
        alert("Address can only contain letters, numbers, spaces, and '#'.");
        return false;
    }

    // Ensure Construction Type is selected
    const nameType = document.getElementById("nameType").value;
    if (nameType === "select") {
        alert("Please select a Construction Type.");
        return false;
    }

    // If all validations passed
    if (isValid) {
        alert("Get quote sent successfully!");

        // Reset the form
        document.getElementById("constructionForm").reset();

        // Close the popup
        closePopup();
    }

    return true;
}

// Function to close the popup
function closePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none"; // Hide the popup
}


