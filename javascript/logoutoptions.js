document.querySelector(".my-profile-link").addEventListener("click",()=>{
    window.location.href="../html/myprofile.html"
})

// Open the modal when the "Change User Type" button is clicked
document.getElementById('changeUserTypeBtn').addEventListener('click', function() {
    document.getElementById('userTypeModal').style.display = 'block';
  });
  
  // Close the modal when the close button (X) is clicked
  document.getElementById('closeModalBtn').addEventListener('click', function() {
    document.getElementById('userTypeModal').style.display = 'none';
  });
  
  // Handle the "Change User Type" button click
  document.getElementById('changeUserTypeButton').addEventListener('click', function() {
    // Get the selected user type
    const selectedUserType = document.querySelector('input[name="userType"]:checked');
    
    if (!selectedUserType) {
      alert('Please select a user type.');
      return;
    }
  
    // Show OTP verification section
    document.getElementById('otpSection').style.display = 'block';
  
    // You can perform the actual user type change here (e.g., make an API call to update the user type in the database)
    alert('User type changed to: ' + selectedUserType.value);
  });
  
  // Edit mobile number
  document.getElementById('editMobileBtn').addEventListener('click', function() {
    // Allow user to edit mobile number (you can implement an input field for mobile number editing)
    const newMobileNumber = prompt('Enter new mobile number:');
    
    if (newMobileNumber) {
      document.getElementById('mobileNumber').textContent = newMobileNumber;
    }
  });
  
  // Verify OTP (This is a simple mock-up, you'd need to integrate it with your backend OTP verification)
  document.getElementById('verifyOtpBtn').addEventListener('click', function() {
    const otpInput = document.getElementById('otpInput').value;
  
    if (otpInput === '123456') {
      alert('OTP Verified!');
      document.getElementById('userTypeModal').style.display = 'none';
    } else {
      alert('Invalid OTP. Please try again.');
    }
  });
  