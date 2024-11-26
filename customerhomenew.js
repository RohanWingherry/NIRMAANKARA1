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
// Get the elements
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


