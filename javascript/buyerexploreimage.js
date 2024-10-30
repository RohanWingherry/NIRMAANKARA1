let currentImageIndex = 0;
const images = [
    "../assets/Aparna1.png",
    "../assets/Aparna2.png",
    "../assets/Aparna3.png",
    "../assets/Aparna4.png"
];

function changeImage(src) {
    const mainImage = document.getElementById('main-img');
    mainImage.style.opacity = 0.8; // Start fade-out
    setTimeout(() => {
        mainImage.src = src;
        mainImage.style.opacity = 1; // Fade-in the new image
    }, 200); // Matches the transition time for a smoother effect
}

function prevImage() {
    currentImageIndex = (currentImageIndex === 0) ? images.length - 1 : currentImageIndex - 1;
    changeImage(images[currentImageIndex]);
}

function nextImage() {
    currentImageIndex = (currentImageIndex === images.length - 1) ? 0 : currentImageIndex + 1;
    changeImage(images[currentImageIndex]);
}


// like
const likeBtns = document.querySelectorAll('.like-btn');

likeBtns.forEach(likeBtn => {
    likeBtn.addEventListener('click', function() {
        // Toggle the liked state
        this.classList.toggle('liked');
        
        // Update icon based on state
        const icon = this.querySelector('.material-symbols-rounded');
        if (this.classList.contains('liked')) {
            icon.textContent = 'favorite'; // Filled heart
        } else {
            icon.textContent = 'favorite_border'; // Unfilled heart
        }
    });
});




// scroll active
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section-part');
    const navLinks = document.querySelectorAll('.link-scroll a');

    function changeActiveLink() {
        let index = sections.length;

        while (--index && window.scrollY + 50 < sections[index].offsetTop) {}
        
        navLinks.forEach((link) => link.classList.remove('active'));
        navLinks[index].classList.add('active');
    }

    changeActiveLink();
    window.addEventListener('scroll', changeActiveLink);
});


// property card slider
let currentIndex = 0;

function moveSlide(direction) {
    const slides = document.querySelector('.buyerlist');
    const totalSlides = document.querySelectorAll('.singleproperty').length;
    const cardWidth = document.querySelector('.singleproperty').offsetWidth; // Get the current width of the card
    
    currentIndex += direction;
    
    if (currentIndex < 0) {
        currentIndex = totalSlides - 1; // Wrap around to last slide
    } else if (currentIndex >= totalSlides) {
        currentIndex = 0; // Wrap around to first slide
    }
    
    // Calculate the offset to center the current slide
    const offset = -currentIndex * cardWidth + (window.innerWidth / 2 - cardWidth / 2);
    slides.style.transform = `translateX(${offset}px)`;
}


// review
document.getElementById('addReviewForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const stars = document.getElementById('stars').value;
    const reviewText = document.getElementById('reviewText').value;

    // Create a new review element
    const newReview = document.createElement('div');
    newReview.className = 'review';

    newReview.innerHTML = `
        <div class="profile">
            <img src="../assets/profile-pic.png" alt="Profile Image">
            <div class="profile-details">
                <h3>Your Name</h3>
                <p>Total Review: <strong>1</strong></p>
            </div>
        </div>
        <div class="review-content">
            <div class="review-header">
                <div class="stars">${'★'.repeat(stars)}${'☆'.repeat(5 - stars)}</div>
                <p>${new Date().toLocaleDateString()}</p>
            </div>
            <p>${reviewText}</p>
        </div>
    `;

    // Insert the new review at the top of the review list
    const reviewList = document.getElementById('reviewList');
    reviewList.insertBefore(newReview, reviewList.firstChild);

    // Clear the form
    document.getElementById('addReviewForm').reset();
});


// Get modal elements
const reportButton = document.getElementById('reportButton');
const reportModal = document.getElementById('reportModal');
const closeButton = document.querySelector('.close-button');
const confirmReportButton = document.getElementById('confirmReport');
const cancelReportButton = document.getElementById('cancelReport');

// Open modal
reportButton.onclick = function() {
    reportModal.style.display = "block";
}

// Close modal
closeButton.onclick = function() {
    reportModal.style.display = "none";
}

// Cancel report action
cancelReportButton.onclick = function() {
    reportModal.style.display = "none";
}

// Confirm report action
confirmReportButton.onclick = function() {
    const selectedReasons = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    
    checkboxes.forEach(checkbox => {
        selectedReasons.push(checkbox.value);
    });
    
    const issueDescription = document.getElementById('issueDescription').value;
    
    // Example of how you might handle the report submission
    const reportData = {
        reasons: selectedReasons,
        description: issueDescription
    };

    // Send the reportData to your server or handle it as needed
    console.log("Reported Data:", reportData); // Replace with actual submission logic
    alert("Thank you for reporting the issue!");

    // Close the modal
    reportModal.style.display = "none";
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == reportModal) {
        reportModal.style.display = "none";
    }
}
