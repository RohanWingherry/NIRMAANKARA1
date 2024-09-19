document.getElementById('profile-form').addEventListener('submit', function (event) {
  event.preventDefault(); 
  
  let isValid = true;
  
  const fields = ['first-name', 'last-name', 'phone-number', 'email', 'gender', 'address', 'city', 'state', 'pincode'];
  fields.forEach(field => {
      const input = document.getElementById(field);
      if (input.value.trim() === '') {
          isValid = false;
          alert('All fields are required.');
          return;
      }
  });
  
  const phoneNumber = document.getElementById('phone-number');
  const phoneError = document.getElementById('phone-error');
  if (!/^\d{10}$/.test(phoneNumber.value)) {
      isValid = false;
      phoneError.textContent = 'Phone number must be 10 digits.';
  } else {
      phoneError.textContent = '';
  }
  
  const fileInput = document.getElementById('file-input');
  const file = fileInput.files[0];
  const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  
  if (file && !validImageTypes.includes(file.type)) {
      isValid = false;
      alert('Only JPG, JPEG, and PNG files are allowed.');
  }
  
  if (isValid) {
      alert('Form saved successfully!');
      console.log('Form submitted');
  } else {
      alert('Please correct the errors and try again.');
  }
});

document.querySelector('.file-upload-label').addEventListener('click', function() {
  document.getElementById('file-input').click();
});

document.getElementById('file-input').addEventListener('change', function(event) {
  const file = event.target.files[0];
  const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  
  if (file && validImageTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = function(e) {
          document.getElementById('image-preview').style.backgroundImage = `url(${e.target.result})`;
          document.getElementById('image-preview').innerHTML = ''; 
      };
      reader.readAsDataURL(file);
  } else {
      alert('Please select a valid image file (JPG, JPEG, or PNG).');
  }
});
