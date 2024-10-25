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
        // Toggle liked state
        this.classList.toggle('liked');
        
        // Change icon based on state
        if (this.classList.contains('liked')) {
            this.innerHTML = '<span class="material-icons">bookmark_added</span>';
        } else {
            this.innerHTML = '<span class="material-icons">bookmark</span>';
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