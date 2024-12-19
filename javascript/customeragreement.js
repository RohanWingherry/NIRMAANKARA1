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

document.getElementById('agreementForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting
        const firstPartySignature = this.querySelector('input[type="text"]').value;

        if (firstPartySignature) {
            showNotification('Thank you for agreeing!');
            window.location.href='../html/customeragreementhistory.html'
        } else {
            showNotification('Please fill out all required fields.');
        }
    });
document.getElementById('firstparty').addEventListener('input', function(event) {
    let value = event.target.value;
            value = value.replace(/[^a-zA-Z\s]/g, '');

            if (value.startsWith(' ')) {
                value = value.slice(1);
            }

            event.target.value = value;
});