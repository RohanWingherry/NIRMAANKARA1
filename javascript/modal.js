document.querySelectorAll('.button').forEach(function (button) {
    button.addEventListener('click', function () {
      var buttonId = this.id;
      var modalContainer = document.getElementById('modal-container');
      modalContainer.className = ''; // Remove all classes
      modalContainer.classList.add(buttonId); // Add the specific button ID as class
      document.body.classList.add('modal-active');
    });
  });
  
//   document.getElementById('modal-container').addEventListener('click', function () {
//     this.classList.add('out');
//     document.body.classList.remove('modal-active');
//   });
  