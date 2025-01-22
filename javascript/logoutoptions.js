
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
    document.querySelector(".changeotpshow").style.display='none';
    document.getElementById("send-otp").style.display="block";
    document.getElementById("otpverifiedmsg").style.display = "none";

  });
  
  // Handle the "Change User Type" button click
  const sendOtpBtn1 = document.getElementById("send-otp");
  const verifyOtpBtn1 = document.getElementById("verifyOtpBtn");
  const resendOtpBtn1 = document.getElementById("resendOtpBtn");
  const emailTimer1 = document.getElementById("email-timer");
  const otpInput1 = document.getElementById("otpInput");
  const changeOtpShow1 = document.querySelector(".changeotpshow");
  const changeUserTypeBtn1 = document.getElementById("changeUserTypeButton");
  const otpVerifiedMsg = document.getElementById("otpverifiedmsg");
  
  document.getElementById("editMobileBtn").addEventListener("click",()=>{
    window.location.href="../html/myprofile.html";
  })
  let timer = 60;
  let countdownInterval;
  let isOtpVerified = false; // Track OTP verification status
  
  // Show OTP input section and start timer on "Send OTP"
  sendOtpBtn1.addEventListener("click", () => {
    showNotification("Sent OTP to registered Mobile Number")
    changeOtpShow1.style.display = "block"; 
    startTimer(); 
  });
  
  // Start the resend OTP timer
  function startTimer() {
    timer = 60;
    resendOtpBtn1.disabled = true; // Disable the button initially
    emailTimer1.style.display = "inline";
    emailTimer1.textContent = `(${timer}s)`;
    clearInterval(countdownInterval);
  
    countdownInterval = setInterval(() => {
      timer--;
      emailTimer1.textContent = `(${timer}s)`;
  
      if (timer === 0) {
        clearInterval(countdownInterval);
        resendOtpBtn1.disabled = false; // Enable the button when the timer ends
        emailTimer1.style.display = "none"; // Hide the timer display
      }
    }, 1000);
  }
  
  // Resend OTP functionality
  resendOtpBtn1.addEventListener("click", () => {
    if(timer==0){
      showNotification("Resent the OTP to registred Mobile Number");
      startTimer();
    }
  });
  
  // Verify OTP and handle Change User Type button
  verifyOtpBtn1.addEventListener("click", () => {
    const enteredOtp = otpInput1.value;
    if (enteredOtp === "123456") {
      showNotification("Successsfully Verified OTP");
      isOtpVerified = true; // Set OTP verification status
      changeOtpShow1.style.display = "none"; // Hide OTP section
      sendOtpBtn1.style.display = "none";
      otpVerifiedMsg.style.display = "flex";
      document.getElementById("editMobileBtn").style.display = "none";
  
      otpInput1.value = ""; 
    } else {
      showNotification("Please enter Valid OTP");
    }
  });
  
  // Handle Change User Type button
  changeUserTypeBtn1.addEventListener("click", () => {
    if (isOtpVerified) {
      showNotification("Successfully Changed the User Type");
      document.querySelector(".changeotpshow").style.display='none';
      document.getElementById('userTypeModal').style.display = 'none';
      document.getElementById("send-otp").style.display="block";
      otpVerifiedMsg.style.display = "none";

    } else {
      showNotification("Please verify OTP before changing User Type");
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
  