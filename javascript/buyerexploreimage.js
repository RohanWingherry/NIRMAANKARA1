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
    }, 800); // Matches the transition time for a smoother effect
}

function prevImage() {
    currentImageIndex = (currentImageIndex === 0) ? images.length - 1 : currentImageIndex - 1;
    changeImage(images[currentImageIndex]);
}

function nextImage() {
    currentImageIndex = (currentImageIndex === images.length - 1) ? 0 : currentImageIndex + 1;
    changeImage(images[currentImageIndex]);
}