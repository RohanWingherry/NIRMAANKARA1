
  
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
  document.querySelector('#customer-hover-heading').addEventListener('mouseenter', function() {
    document.getElementById('customer-hover').style.display = 'block';
  });
  
  document.querySelector('#customer-hover-heading').addEventListener('mouseleave', function() {
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
  
  
  // Login logout
  // Handling mouseenter and mouseleave events for the profile hover menu
  document.getElementById('nav-profile-heading').addEventListener('mouseenter', function() {
    // Get the text content of the nav-profile element
    const profileText = document.querySelector('.nav-profile').textContent.trim();
    
    // Show the correct hover element depending on whether the user is logged in or not
    if (profileText === 'Login') {
      document.querySelector('.nav-login-hover').style.display = 'block';
      document.querySelector('.nav-logout-hover').style.display = 'none';
    } else {
      document.querySelector('.nav-logout-hover').style.display = 'block';
      document.querySelector('.nav-login-hover').style.display = 'none';
    }
  });
  
  document.getElementById('nav-profile-heading').addEventListener('mouseleave', function() {
    // Hide both hover elements when the mouse leaves the profile heading, with a small delay
    setTimeout(function() {
      // Check if the hover is still active
      if (!document.querySelector('.nav-login-hover:hover') && !document.querySelector('.nav-logout-hover:hover')) {
        document.querySelector('.nav-login-hover').style.display = 'none';
        document.querySelector('.nav-logout-hover').style.display = 'none';
      }
    }, 100);
  });
  
  // Handling mouseenter and mouseleave for the login hover element
  document.querySelector('.nav-login-hover').addEventListener('mouseenter', function() {
    document.querySelector('.nav-login-hover').style.display = 'block';
  });
  
  document.querySelector('.nav-login-hover').addEventListener('mouseleave', function() {
    setTimeout(function() {
      // Hide login hover if not hovered
      if (!document.querySelector('.nav-login-hover:hover')) {
        document.querySelector('.nav-login-hover').style.display = 'none';
      }
    }, 100);
  });
  
  // Handling mouseenter and mouseleave for the logout hover element
  document.querySelector('.nav-logout-hover').addEventListener('mouseenter', function() {
    document.querySelector('.nav-logout-hover').style.display = 'block';
  });
  
  document.querySelector('.nav-logout-hover').addEventListener('mouseleave', function() {
    setTimeout(function() {
      // Hide logout hover if not hovered
      if (!document.querySelector('.nav-logout-hover:hover')) {
        document.querySelector('.nav-logout-hover').style.display = 'none';
      }
    }, 100);
  });
  
  
  
  // menu mouseover effect
  const menuIcon = document.getElementById('menu');
  const menuContents = document.querySelector('.main-menu-contents');
  const closeMenu = document.getElementById('close-menu');
  
  menuIcon.addEventListener('click', () => {
      menuContents.classList.toggle('open');
  });
  
  closeMenu.addEventListener('click', () => {
      menuContents.classList.remove('open');
  });



  document.getElementById("myactivity-main-click").addEventListener("click",()=>{
    window.location.href="../html/myactivityrecentsearch.html"
  })
  document.getElementById("search-activity").addEventListener("click",()=>{
    window.location.href="../html/myactivityrecentsearch.html"
  })
  document.getElementById("recently-browsed").addEventListener("click",()=>{
    window.location.href="../html/myactivityrecentlybrowsed.html"
  })
  document.getElementById("shortlisted").addEventListener("click",()=>{
    window.location.href="../html/myactivityshortlisted.html"
  })
  document.getElementById("recently-contacted").addEventListener("click",()=>{
    window.location.href="../html/myactivityrecentlycontacted.html"
  })
  
  