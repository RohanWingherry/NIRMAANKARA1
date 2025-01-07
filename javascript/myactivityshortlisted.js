function shownotifications(message, type = 'success') {
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
function hideProperty(bookmark) {
    var property = bookmark.closest('.singleproperty');
    
    if (property) {
        let remove=confirm("Are you sure want to remoove this property from your shortlist")
        if(remove)
        {
            property.style.display = 'none';
        }
    }
}

const shareButtons = document.querySelectorAll('.share'); 
const shareModals = document.querySelectorAll('.share-modal-content'); 
const closeButtons = document.querySelectorAll('.share-close');

shareButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
        const modal = shareModals[index];
        modal.classList.add('show'); // Show the corresponding modal
    });
});

closeButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
        const modal = shareModals[index];
        modal.classList.remove('show'); // Hide the modal
    });
});

// Function to copy text to clipboard
function copyToClipboard(inputField) {
    inputField.select();
    document.execCommand('copy');
    shownotifications('Copied: ' + inputField.value);
}

// Copy functionality for each button
const copyButtons = document.querySelectorAll('button.share-copyButton');
copyButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
        const inputField = document.getElementById(`share-inputField${index + 1}`);
        if (inputField) {
            copyToClipboard(inputField);
        } else {
            shownotifications('Input field not found.');
        }
    });
});
    const allExplore=document.querySelectorAll(".exp")

    allExplore.forEach(explore => {
        explore.addEventListener("click",()=>{
            window.location.href="../html/buyerpropertyexplore.html"
        })
    });