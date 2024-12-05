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

// signinsignup
const showPopup = document.querySelectorAll('#login-popup');
const popupContainer = document.querySelector('.popup-container');
const closeBtn = document.querySelector('.close-btn');
showPopup.onclick = () => {
  popupContainer.classList.add('active-popup');
}
closeBtn.onclick = () => {
  popupContainer.classList.remove('active-popup');
}



