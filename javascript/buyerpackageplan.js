// notification or pop up
function showNotification(message, type = 'success') {
    const notification = document.getElementById('customNotification');
    const notificationMessage = document.getElementById('notificationMessage');
    const okButton = document.getElementById('okButton');

    notificationMessage.textContent = message;

    // Add error class if the type is 'error'
    if (type === 'error') {
        notification.classList.add('error');
    } else {
        notification.classList.remove('error');
    }

    // Show the notification with a fade-in effect
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.opacity = '1';  // Fade-in effect
    }, 10);

    // When "OK" button is clicked, hide the notification with a fade-out effect
    okButton.addEventListener('click', function () {
        notification.style.opacity = '0';  // Fade-out effect
        setTimeout(() => {
            notification.style.display = 'none';  // Ensure it's hidden after fading out
        }, 500);  // Wait for the transition duration before hiding completely
    });
}

document.querySelector(".shortlisted").addEventListener("click",()=>{
    window.location.href="../html/buyershorlisted.html"
})
function free(){
    showNotification("Profile Updated Successfully")
    window.location.href="../html/contractorshomepage.html"
}
const buyNow=document.querySelectorAll(".buy-now")

buyNow.forEach(buy => {
    buy.addEventListener("click",()=>{
        window.location.href='../html/paymentoptionscreen.html'
    })
});