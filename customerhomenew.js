window.onscroll = function() {
    changeNavbarBackground();
  };
  
  function changeNavbarBackground() {
    var navbar = document.querySelector(".navigation-bar");
  
    if (window.scrollY > 50) { 
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  }
  