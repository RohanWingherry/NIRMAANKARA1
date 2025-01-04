function showNotification(message, type = 'success') {
    const notification = document.getElementById('customNotification');
    const notificationMessage = document.getElementById('notificationMessage');
    const okButton = document.getElementById('okButton');
  
    notificationMessage.textContent = message;
  
    if (type === 'error') {
      notification.classList.add('error');
    } else {
      notification.classList.remove('error');
    }
  
    notification.style.display = 'block';
    setTimeout(() => {
      notification.style.opacity = '1';
    }, 10);

    // Remove any previous click event to avoid multiple listeners
    okButton.removeEventListener('click', closeNotification);
    
    // Add event listener to close notification
    okButton.addEventListener('click', closeNotification);

    function closeNotification() {
      notification.style.opacity = '0';
      setTimeout(() => {
        notification.style.display = 'none';
      }, 500);
    }
}

const buyNow = document.querySelectorAll(".buy-now");

buyNow.forEach(buy => {
    buy.addEventListener("click", () => {
        window.location.href = '../html/paymentoptionscreen.html';
    });
});

document.getElementById("free-package").addEventListener("click", () => {
    showNotification("Free Package Activated");
    setTimeout(() => {
        window.location.href = "../html/contractorshomepage.html";
    }, 2500);  // Make sure the redirect happens after the notification has time to fade out
});
