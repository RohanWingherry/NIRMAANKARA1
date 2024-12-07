// FOR FILLED DATA



// Get the image and overlay elements
const paymentImages = document.querySelectorAll('.payment-status img');
const overlay = document.createElement('div');
overlay.classList.add('fullscreen-overlay');
const closeButton = document.createElement('button');
closeButton.classList.add('close-btn');
closeButton.textContent = 'X';

// Add the close button and overlay to the document body
overlay.appendChild(closeButton);
document.body.appendChild(overlay);

// Event listener to open image in fullscreen when clicked
paymentImages.forEach(img => {
    img.addEventListener('click', function() {
        const clonedImage = img.cloneNode();  // Clone the clicked image
        overlay.innerHTML = '';  // Clear the previous content
        overlay.appendChild(closeButton);  // Re-add the close button
        overlay.appendChild(clonedImage);  // Add the clicked image in full size
        overlay.style.display = 'flex';  // Display the overlay
    });
});

// Event listener to close the overlay when the close button is clicked
closeButton.addEventListener('click', function() {
    overlay.style.display = 'none';
});

// Event listener to close the overlay when clicking outside the image
overlay.addEventListener('click', function(event) {
    if (event.target === overlay) {
        overlay.style.display = 'none';
    }
});


