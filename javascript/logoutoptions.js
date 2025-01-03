
const myProfile=document.querySelectorAll(".my-profile-link");
myProfile.forEach(myProfileSingle => {
  myProfileSingle.addEventListener("click",()=>{
    window.location.href="../html/myprofile.html"
  })
});

// Open the modal when the "Change User Type" button is clicked
document.getElementById('changeUserTypeBtn').addEventListener('click', function() {
    document.getElementById('userTypeModal').style.display = 'block';
  });

  document.getElementById('change-user-type-side').addEventListener('click', function() {
    document.getElementById('userTypeModal').style.display = 'block';
    menuContents.classList.remove('open');
  });
  
  // Close the modal when the close button (X) is clicked
  document.getElementById('closeModalBtn').addEventListener('click', function() {
    document.getElementById('userTypeModal').style.display = 'none';
  });
  
  // Handle the "Change User Type" button click

  const changeUserButtons=document.querySelectorAll(".change-usertype-popup");
  changeUserButtons.forEach(changeUser => {
    changeUser.addEventListener("click",()=>{
 // Get the selected user type
 const selectedUserType = document.querySelector('input[name="userType"]:checked');
    
 if (!selectedUserType) {
   showNotification('Please select a user type.');
   return;
 }

 // Show OTP verification section
 document.getElementById('otpSection').style.display = 'block';
 showNotification('OTP has been sent to registered mobile number please verify');
 // You can perform the actual user type change here (e.g., make an API call to update the user type in the database)
    })
  });
  
  // Edit mobile number
  document.getElementById('editMobileBtn').addEventListener('click', function() {
    window.location.href="../html/myprofile.html"
  });
  
  // Verify OTP (This is a simple mock-up, you'd need to integrate it with your backend OTP verification)
  document.getElementById('verifyOtpBtn').addEventListener('click', function() {
    const otpInput = document.getElementById('otpInput').value;
    const selectedUserType = document.querySelector('input[name="userType"]:checked');
    if (otpInput === '123456') {
      showNotification('Changed the User Type to: ' + selectedUserType.value);
      document.getElementById('userTypeModal').style.display = 'none';
    } else {
      showNotification('Invalid OTP. Please try again.');
    }
  });

  document.getElementById("myactivity-logout-side").addEventListener("click",()=>{
    menuContents.classList.remove('open');
    showNotification('Logged out successful!');
    document.querySelector('.nav-profile').innerHTML="Login";
    document.getElementById("sidebar-login").innerHTML="LOGIN/ REGISTER";
    document.getElementById("change-user-type-side").style.display="none";
    document.getElementById("myactivity-logout-side").style.opacity='0';
  })
  document.querySelector(".myactivity-logout").addEventListener("click",()=>{
    menuContents.classList.remove('open');
    showNotification('Logged out successful!');
    document.querySelector('.nav-profile').innerHTML="Login";
    document.getElementById("sidebar-login").innerHTML="LOGIN/ REGISTER";
    document.getElementById("change-user-type-side").style.display="none";
    document.getElementById("myactivity-logout-side").style.opacity='0';
  })
  