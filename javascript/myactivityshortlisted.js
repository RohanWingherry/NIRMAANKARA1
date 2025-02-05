function shownotifications(message, type = 'success') {
    const notification = document.getElementById('customNotification');
    const notificationMessage = document.getElementById('notificationMessage');
    const okButton = document.getElementById('okButton');

    notificationMessage.textContent = message;

    // Toggle error class
    if (type === 'error') {
        notification.classList.add('error');
    } else {
        notification.classList.remove('error');
    }

    // Show notification with fade-in effect
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);

    // Ensure the "OK" button only has one event listener
    okButton.onclick = function () {
        notification.style.opacity = '0'; // Fade-out effect
        setTimeout(() => {
            notification.style.display = 'none';
        }, 500); // Wait for transition to complete
    };
}

document.addEventListener("DOMContentLoaded", function () {
    const bookmarks = document.querySelectorAll(".bookmark");
    const deletePopup = document.getElementById("deletePopup");
    const cancelDelete = document.getElementById("cancelDelete");
    const confirmDelete = document.getElementById("confirmDelete");
    let selectedProperty = null;

    // Function to show popup
    function showPopup() {
        deletePopup.classList.add("show");
    }

    // Function to hide popup
    function hidePopup() {
        deletePopup.classList.remove("show");
    }

    // Handle bookmark click
    bookmarks.forEach(bookmark => {
        bookmark.addEventListener("click", function () {
            selectedProperty = this.closest(".singleproperty");
            showPopup();
        });
    });

    // Handle cancel delete
    cancelDelete.addEventListener("click", function () {
        hidePopup();
    });

    // Handle confirm delete
    confirmDelete.addEventListener("click", function () {
        if (selectedProperty) {
            selectedProperty.style.display = "none";
        }
        hidePopup();
    });

    // Close popup on clicking outside
    deletePopup.addEventListener("click", function (event) {
        if (event.target === deletePopup) {
            hidePopup();
        }
    });
});


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