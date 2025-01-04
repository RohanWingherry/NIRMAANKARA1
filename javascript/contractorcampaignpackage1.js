function showNotification(message, type = 'success', callback = null) {
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
        notification.style.opacity = '1'; // Fade-in effect
    }, 10);

    okButton.addEventListener('click', function handleClick() {
        notification.style.opacity = '0'; // Fade-out effect
        setTimeout(() => {
            notification.style.display = 'none'; // Ensure it's hidden
            if (typeof callback === 'function') {
                callback(); // Execute callback after notification is dismissed
            }
        }, 500);
        okButton.removeEventListener('click', handleClick); // Remove listener to prevent duplicates
    });
}

const buyNow = document.querySelectorAll(".buy-now");

buyNow.forEach(buy => {
    buy.addEventListener("click", () => {
        window.location.href = "../html/paymentoptionscreen.html";
    });
});

document.getElementById("usenow").addEventListener("click", () => {
    showNotification("Project Submitted Successfully", 'success', () => {
        setTimeout(() => {
            window.location.href = "../html/contractorcampaignhistory.html";
        }, 2000); 
    });
});
