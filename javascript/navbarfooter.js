window.onscroll = function () {
  changeNavbarBackground();
  changeImageOnScroll();
};

function changeNavbarBackground() {
  var navbar = document.querySelector(".navigation-bar");

  if (window.scrollY > 50) {
      navbar.classList.add("navbar-scrolled");
      navbar.style.boxShadow = "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px";
  } else {
      navbar.classList.remove("navbar-scrolled");
      navbar.style.boxShadow = "none";
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
  
  const myActivity=document.querySelectorAll(".my-activity-main-click");
  myActivity.forEach(myActivitysingle => {
    myActivitysingle.addEventListener("click",()=>{
      window.location.href="../html/myactivityrecentsearch.html"
    })
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
  
  // logo 
  const mainlogo=document.querySelectorAll('.main-logo');
  mainlogo.forEach(mainlogosingle => {
    mainlogosingle.addEventListener('click',()=>{
        window.location.href = "../html/Nimaankaramasterpage.html";
    
    })
  });
  // navigation for contractor
  const contractorLinks = document.querySelectorAll('.contractornavigation');
  
  contractorLinks.forEach(contractorLink => {
      contractorLink.addEventListener('click', () => {
        const profileText = document.querySelector('.nav-profile').textContent.trim();
          if (profileText === 'Login') {
              popupContainer.classList.add('open', 'active');
              resetForms();
          } else {
            window.location.href = "../html/contractorshomepage.html";
          }
      });
  });
  
  // navigation for buyer
  const buyerlinks=document.querySelectorAll('.buyernavigation');
  buyerlinks.forEach(buyerlink => {
    buyerlink.addEventListener('click',()=>{
        window.location.href = "../html/buyerlist.html";
    
    })
  });
  // navigation for buyerhomenavigation
  const buyerhomelinks=document.querySelectorAll('.buyerhomenavigation');
  buyerhomelinks.forEach(buyerhomelink => {
    buyerhomelink.addEventListener('click',()=>{
      window.location.href = "../html/buyerhome.html";
      })
      });
  // navigation for customercontractornavigation
  const customercontractorlinks=document.querySelectorAll('.customercontractornavigation');
  customercontractorlinks.forEach(customercontractorlink => {
    customercontractorlink.addEventListener('click',()=>{
        window.location.href = "../html/customercontractorlist.html";
    
    })
  });
  const aboutUss=document.querySelectorAll(".about-us-sidebar")
  aboutUss.forEach(aboutUs => {
    aboutUs.addEventListener("click",()=>{
      window.location.href="../html/aboutus.html"

    })
  });

// Sidebar option

document.getElementById('sidebar-login').addEventListener('click', function() {
  const spanElement = this;

  // Check if the text content is 'Login'
  if (spanElement.textContent === 'LOGIN/ REGISTER') {
    // Directly open the popup when 'Login' is clicked
    popupContainer.classList.add('open', 'active');
    resetForms();
    menuContents.classList.remove('open');
  } else {
    // Redirect to 'myprofile.html' when text content is not 'Login'
    window.location.href = "../html/myprofile.html";
    menuContents.classList.remove('open');
  }
});

// Get the modal and the button
const contactModal = document.getElementById('contactModal');
const contactusLink = document.getElementById('contactus-link');
const closeBtn = document.getElementsByClassName('close-contactus')[0];
const sendButton = document.getElementById('sendButton_contact');
const errorMessages = document.getElementById('errorMessages');

// Open the modal when clicking on the "Contact Us" link
contactusLink.addEventListener('click', function() {
  contactModal.style.display = "block";
  menuContents.classList.remove('open');
});

// Close the modal when clicking on the close button (×)
closeBtn.addEventListener('click', function() {
  contactModal.style.display = "none";
});

// Close the modal if clicked outside the modal content
window.addEventListener('click', function(event) {
  if (event.target == contactModal) {
    contactModal.style.display = "none";
  }
});

// Form validation before submission
sendButton.addEventListener('click', function() {
  menuContents.classList.remove('open');
  const fullname = document.getElementById('fullname_contact').value;
  const mobile = document.getElementById('mobile_contact').value;
  const email = document.getElementById('email_contact').value;
  const message = document.getElementById('message_contact').value;
  
  let errors = [];
  
  // Check for empty fields
  if (!fullname || !mobile || !email || !message) {
    errors.push("All fields are mandatory.");
  }

  // Validate mobile number (only 10 digits)
  const mobileRegex = /^[0-9]{10}$/;
  if (!mobileRegex.test(mobile)) {
    errors.push("Mobile number must be exactly 10 digits.");
  }
  
  // If there are errors, show them, otherwise submit and close the modal
  if (errors.length > 0) {
    errorMessages.innerHTML = errors.join('<br>');
  } else {
    showNotification('Details Sent Successfully');
    contactModal.style.display = "none";
  }
});
document.getElementById('fullname_contact').addEventListener('input', function(event) {
  let value = event.target.value;
  value = value.replace(/[^a-zA-Z\s]/g, '');

  if (value.startsWith(' ')) {
      value = value.slice(1);
  }

  event.target.value = value;
});
document.getElementById('mobile_contact').addEventListener('input', function(event) {
  event.target.value = event.target.value.replace(/[^0-9]/g, '');
});
// Post property modal
const postmodal = document.getElementById("post-property-modal");
const postPropertyButton = document.getElementById("post-property-button");
const postcloseModal = document.getElementById("post-close-modal");
const postsellButton = document.getElementById("continue-post-prop-modal-sell");
const postrentButton = document.getElementById("continue-post-prop-modal-rent");

postPropertyButton.addEventListener("click",()=>{
  postmodal.style.display = "block";
})

postcloseModal.addEventListener("click",()=>{
  postmodal.style.display = "none";

})

window.onclick = function(event) {
  if (event.target === postmodal) {
      postmodal.style.display = "none";
  }
}
postsellButton.addEventListener("click",()=>{
  window.location.href = "../html/sellerhomepage.html";  
})
postrentButton.addEventListener("click",()=>{
  window.location.href = "../html/renterhomepage.html";  
})








  