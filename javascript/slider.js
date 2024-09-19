function showSlide(container, index) {
    const slider = container.querySelector('.content-slider');
    const slides = slider.querySelectorAll('.slide');
    const totalSlides = slides.length;

    container.currentIndex = (index + totalSlides) % totalSlides;
    slider.style.transform = `translateX(-${container.currentIndex * 100}%)`;
}

function nextSlide(button) {
    const container = button.closest('.slider-container');
    showSlide(container, container.currentIndex + 1);
}

function prevSlide(button) {
    const container = button.closest('.slider-container');
    showSlide(container, container.currentIndex - 1);
}

function likeSlide(event) {
    const slide = event.target.closest('.slide');
    const likesElement = slide.querySelector('.likes');
    let likes = parseInt(slide.getAttribute('data-likes'), 10);
    likes += 1;
    slide.setAttribute('data-likes', likes);
    likesElement.textContent = `Likes: ${likes}`;
}

document.querySelectorAll('.slider-container').forEach(container => {
    container.currentIndex = 0;
});



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
var popup = document.getElementById("popup");

// Get the button that opens the modal
var btn = document.getElementById("getQuoteBtn");

// Get the <span> element that closes the modal
var closeBtn = document.querySelector(".popup .close");

// When the user clicks on the button, open the modal
btn.onclick = function(event) {
  event.preventDefault();
  popup.style.display = "flex";
}

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function() {
  popup.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == popup) {
    popup.style.display = "none";
  }
}


// in form qoute dropdown
const form = document.getElementById("constructionForm");
    const nameTypeSelect = document.getElementById("nameType");
    const otherNameTypeInput = document.getElementById("otherNameType");

    nameTypeSelect.addEventListener("change", function() {
        if (this.value === "other") {
            otherNameTypeInput.style.display = "block";
            otherNameTypeInput.setAttribute("required", "true");
        } else {
            otherNameTypeInput.style.display = "none";
            otherNameTypeInput.removeAttribute("required");
        }
    });

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission for validation

        const fullName = document.getElementById("fullName").value.trim();
        const phoneNumber = document.getElementById("phoneNumber").value.trim();
        const nameType = document.getElementById("nameType").value;
        const landSize = document.getElementById("landSize").value.trim();
        const landAddress = document.getElementById("landAddress").value.trim();

        if (!fullName || !phoneNumber || nameType === "select" || !landSize || !landAddress || 
            (nameType === "other" && !otherNameTypeInput.value.trim())) {
            alert("Please fill in all required fields.");
        } else {
            alert("Get Quote Sent");
            // Reset form or close modal logic here
            form.reset(); // Reset form fields
            // Close the modal (assuming you have a modal with id "myModal")
            document.getElementById("popup").style.display = "none";
        }
    });


    // individyal
    // Function to open the popup and set the contractor's name
function openPopup(contractorName) {
    const popup = document.getElementById("popup");
    const contractorNameElement = document.getElementById("contractorName");

    contractorNameElement.textContent = contractorName;
    popup.style.display = "block";
}

// Function to close the popup
function closePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
}

// Optional: Close popup when clicking outside of it
window.onclick = function(event) {
    const popup = document.getElementById("popup");
    if (event.target == popup) {
        popup.style.display = "none";
    }
}
