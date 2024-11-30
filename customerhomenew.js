window.onscroll = function() {
  changeNavbarBackground();
  changeImageOnScroll();
};

function changeNavbarBackground() {
  var navbar = document.querySelector(".navigation-bar");

  if (window.scrollY > 50) { 
      navbar.classList.add("navbar-scrolled");
  } else {
      navbar.classList.remove("navbar-scrolled");
  }
}

function changeImageOnScroll() {
  var nameImg = document.querySelector(".name-img");
  
  if (window.scrollY > 50) { 
      nameImg.src = "../assets/name.png"; 
  } else {
      nameImg.src = "../assets/whitename.png"; 
  }
}
// Get the elements(Buyer)
document.getElementById('buyer-hover-heading').addEventListener('mouseenter', function() {
  document.getElementById('buyer-hover').style.display = 'block';
});

document.getElementById('buyer-hover-heading').addEventListener('mouseleave', function() {
  setTimeout(function() {
      if (!document.querySelector('#buyer-hover:hover')) {
          document.getElementById('buyer-hover').style.display = 'none';
      }
  }, 100);
});
document.getElementById('buyer-hover').addEventListener('mouseenter', function() {
  document.getElementById('buyer-hover').style.display = 'block';
});

document.getElementById('buyer-hover').addEventListener('mouseleave', function() {
  document.getElementById('buyer-hover').style.display = 'none';
});


// Handle mouse enter and leave events for the "Find Contractor/ Builder" section
document.querySelector('.nav-findcontractor').addEventListener('mouseenter', function() {
  document.getElementById('customer-hover').style.display = 'block';
});

document.querySelector('.nav-findcontractor').addEventListener('mouseleave', function() {
  setTimeout(function() {
    if (!document.querySelector('#customer-hover:hover')) {
      document.getElementById('customer-hover').style.display = 'none';
    }
  }, 100);
});

// Handle mouse enter and leave events for the "customer-hover" content
document.getElementById('customer-hover').addEventListener('mouseenter', function() {
  document.getElementById('customer-hover').style.display = 'block';
});

document.getElementById('customer-hover').addEventListener('mouseleave', function() {
  document.getElementById('customer-hover').style.display = 'none';
});

// menu
const menuIcon = document.getElementById('menu');
const menuContents = document.querySelector('.main-menu-contents');
const closeMenu = document.getElementById('close-menu');

menuIcon.addEventListener('click', () => {
    menuContents.classList.toggle('open');
});

closeMenu.addEventListener('click', () => {
    menuContents.classList.remove('open');
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



