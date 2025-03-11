// notification or pop up
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

// const profile = document.getElementById("toggleProfile");
// const profileview = document.querySelector(".main-profileview");

// profile.addEventListener("click", () => {
//     // Toggle the display of the profile view
//     if (profileview.style.display === "none" || profileview.style.display === "") {
//         profileview.style.display = "block";
//     } else {
//         profileview.style.display = "none";
//     }
// });
// like
document.querySelectorAll('.bookmark').forEach(bookmark => {
    bookmark.addEventListener('click', function() {
        // Check if the bookmark is already active
        const isActive = this.classList.toggle('active');

        // Show shownotifications based on the state
        if (isActive) {
            shownotifications('Added to shortlist');
        } else {
            shownotifications('Removed from shortlist');
        }
    });
});


document.querySelectorAll('.sort-option').forEach(option => {
    option.addEventListener('click', function() {
            // Remove 'active' class from all options
        document.querySelectorAll('.sort-option').forEach(opt => {
                opt.classList.remove('active');
        });
            // Add 'active' class to the clicked option
        this.classList.add('active');
    });
});

document.querySelectorAll('.share').forEach(function (shareButton) {
    shareButton.addEventListener('click', function () {
        // Get the associated modal content ID
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block'; // Show the modal
        }
    });
});

// Close the modal when the close button is clicked
document.querySelectorAll('.close').forEach(function (closeButton) {
    closeButton.addEventListener('click', function () {
        const modal = this.closest('.modal-content-share');
        if (modal) {
            modal.style.display = 'none'; // Hide the modal
        }
    });
});

// Copy the URL to the clipboard when the "Copy" button is clicked
document.querySelectorAll('.copyButton').forEach(function (copyButton) {
    copyButton.addEventListener('click', function () {
        const inputField = this.closest('.copy-content').querySelector('input');
        if (inputField) {
            inputField.select();
            document.execCommand('copy'); // Copy the URL
            alert('URL copied to clipboard!');
        }
    });
});

const allExplore=document.querySelectorAll(".exp")

allExplore.forEach(explore => {
    explore.addEventListener("click",()=>{
        window.location.href="../html/buyerpropertyexplore.html"
    })
});


// filter code
function openFilter() {
    document.querySelector(".filt-by-overlay").style.display = "block";
    document.querySelector(".filt-by-sidebar").style.right = "0";
}
function closeFilter() {
    document.querySelector(".filt-by-overlay").style.display = "none";
    document.querySelector(".filt-by-sidebar").style.right = "-350px";
}
function toggleSubOptions(id) {
    let subOptions = document.getElementById(id);
    let mainCheckbox = document.getElementById(id.replace("-options", ""));
    subOptions.style.display = mainCheckbox.checked ? "block" : "none";
}









