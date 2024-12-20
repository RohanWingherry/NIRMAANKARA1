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
        this.classList.toggle('liked');
        
        const icon = this.querySelector('.material-symbols-rounded');
        if (this.classList.contains('liked')) {
            icon.textContent = 'favorite';
            showNotification("Added this to Shortlist");
        } else {
            icon.textContent = 'favorite_border';
            showNotification("Removed from the Shortlist") 
        }
    });
});

document.querySelectorAll('.bookmark').forEach(bookmark => {
    bookmark.addEventListener('click', function() {
        // Check if the bookmark is already active
        const isActive = this.classList.toggle('active');

        // Show showNotification based on the state
        if (isActive) {
            showNotification('Added to Shortlist!');
        } else {
            showNotification('Removed from Shortlist!');
        }
    });
});
// Share button functionality
document.addEventListener('DOMContentLoaded', function() {
    const shareButton2 = document.getElementById('shareButton');
    const modalContent2 = document.getElementById('modalContent');
    const closeModal2 = document.getElementById('closeModal');

    // Show modal on share button click
    shareButton2.addEventListener('click', function() {
        modalContent2.classList.toggle('show');
    });

    // Close modal on close button click
    closeModal2.addEventListener('click', function() {
        modalContent2.classList.remove('show');
    });
    
    // Optionally close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modalContent) {
            modalContent2.classList.remove('show');
        }
    });
});





// scroll active
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section-part');
    const navLinks = document.querySelectorAll('.link-scroll a');

    function changeActiveLink() {
        let index = sections.length;

        while (--index && window.scrollY + 120 < sections[index].offsetTop) {}

        navLinks.forEach((link) => link.classList.remove('active'));
        if (navLinks[index]) {
            navLinks[index].classList.add('active');
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default anchor click behavior
            const targetId = this.getAttribute('href'); // Get target section ID
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Scroll to the target section with smooth behavior
                window.scrollTo({
                    top: targetSection.offsetTop -120,
                    behavior: 'smooth'
                });
            }
        });
    });

    changeActiveLink();
    window.addEventListener('scroll', changeActiveLink);
});



// property card slider
let currentIndex = 0; // Track the current slide index
const slider = document.querySelector('.buyerlist');
const properties = document.querySelectorAll('.singleproperty');

function moveSlide(direction) {
    const propertyWidth = properties[0].offsetWidth + 15; // Including gap
    const maxIndex = properties.length - 1;
    const maxSlide = maxIndex * propertyWidth;

    if (direction === 1 && Math.abs(currentIndex * propertyWidth) < maxSlide) {
        currentIndex++;
    } else if (direction === -1 && currentIndex > 0) {
        currentIndex--;
    }

    slider.style.transform = `translateX(-${currentIndex * propertyWidth}px)`;
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
    showNotification("Thank you for reporting the issue!");

    // Close the modal
    reportModal.style.display = "none";
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == reportModal) {
        reportModal.style.display = "none";
    }
}
// Function to copy text to clipboard
function copyToClipboard(inputField) {
    inputField.select();
    document.execCommand('copy');
    showNotification('Copied: ' + inputField.value);
}

// Copy functionality for each button
const copyButtons = document.querySelectorAll('button.copyButton');
copyButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
        const inputField = document.getElementById(`inputField${index + 1}`);
        if (inputField) {
            copyToClipboard(inputField);
        } else {
            showNotification('Input field not found.');
        }
    });
});

document.querySelector(".shortlisted").addEventListener("click",()=>{
    window.location.href="../html/buyershorlisted.html"
})

const allExplore=document.querySelectorAll(".exp")

allExplore.forEach(explore => {
    explore.addEventListener("click",()=>{
        window.location.href="../html/buyerpropertyexplore.html"
    })
});