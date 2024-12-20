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

const profile = document.getElementById("toggleProfile");
const profileview = document.querySelector(".main-profileview");

profile.addEventListener("click", () => {
    // Toggle the display of the profile view
    if (profileview.style.display === "none" || profileview.style.display === "") {
        profileview.style.display = "block";
    } else {
        profileview.style.display = "none";
    }
});
// like
document.querySelectorAll('.bookmark').forEach(bookmark => {
    bookmark.addEventListener('click', function() {
        // Check if the bookmark is already active
        const isActive = this.classList.toggle('active');

        // Show showNotification based on the state
        if (isActive) {
            showNotification('Added to shortlist');
        } else {
            showNotification('Removed from shortlist');
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
 
    function showFilter() {
        const filter = document.querySelector('.main-filter');
        filter.classList.toggle('visible'); // Toggle visible class
    
        // Check if the filter is visible to set the correct class
        if (filter.classList.contains('visible')) {
            filter.style.visibility = 'visible'; // Make it interactive
        } else {
            setTimeout(() => {
                filter.style.visibility = 'hidden'; // Hide after transition
            }, 300); // Match the duration of the transition
        }
    }
// filter
document.querySelectorAll('.prop-type').forEach(item => {
    item.addEventListener('click', function() {
        const targetClass = item.getAttribute('data-target');
        const targetElement = document.querySelector(`.${targetClass}`);

        // Check if the target element is currently displayed
        const isVisible = targetElement.style.display === 'flex';
        document.querySelectorAll('.type').forEach(type => {
            type.style.display = 'none';
            // Remove active class from all options
            type.querySelectorAll('div').forEach(option => {
                option.classList.remove('active-option');
                option.style.borderColor="";
            });
        });

        // Remove active class from all property types
        document.querySelectorAll('.prop-type').forEach(prop => {
            prop.classList.remove('active-tag');
        });

        // If it was not visible, show it; otherwise, reset its options
        if (!isVisible) {
            targetElement.style.display = 'flex';
            item.classList.add('active-tag');
            item.style.borderColor="#038598" // Add active class to the clicked item
            
            // Add active-option class to all options in the currently visible type
            targetElement.querySelectorAll('div').forEach(option => {
                option.classList.add('active-option');
                
                // Add click event to toggle individual option color
                option.addEventListener('click', function(e) {
                    e.stopPropagation(); // Prevent event bubbling to parent
                    this.classList.toggle('active-option'); // Toggle active-option class
                });
            });
        } else {
            // Reset all options when the same property type is clicked again
            targetElement.querySelectorAll('div').forEach(option => {
                option.classList.remove('active-option');
            });
        }
    });
});



const mainFilter = document.querySelector('.main-filter');

mainFilter.addEventListener('scroll', () => {
    if (mainFilter.scrollTop > 0) {
        mainFilter.classList.add('scrolled');
    } else {
        mainFilter.classList.remove('scrolled');
    }
});

function toggleColor(selectedElement) {
    const isSelected = selectedElement.classList.toggle('selected');
    
    if (isSelected) {
        selectedElement.style.borderColor = '#038598'; 
    } else {
        selectedElement.style.borderColor = 'transparent'; 
    }
}


document.querySelectorAll('.directions').forEach(direction => {
    direction.addEventListener('click', () => {
        direction.classList.toggle('active');
    });
});


function updateAvailabilityStyles() {
    const divs = document.querySelectorAll('.type-of-prop-aval-desc div');
    const labels = document.querySelectorAll('.type-of-prop-aval-desc label');

    divs.forEach((div, index) => {
        const radio = div.querySelector('input[type="radio"]');
        if (radio.checked) {
            div.classList.add('checked');
            labels[index].classList.add('checked');
        } else {
            div.classList.remove('checked');
            labels[index].classList.remove('checked');
        }
    });
}

// Existing functions for updating styles of the other sections
function updateSizeStyles() {
    const divs = document.querySelectorAll('.type-of-prop-size-desc div');
    const labels = document.querySelectorAll('.type-of-prop-size-desc label');

    divs.forEach((div, index) => {
        const radio = div.querySelector('input[type="radio"]');
        if (radio.checked) {
            div.classList.add('checked');
            labels[index].classList.add('checked');
        } else {
            div.classList.remove('checked');
            labels[index].classList.remove('checked');
        }
    });
}

function updateStyles() {
    const divs = document.querySelectorAll('.type-of-prop-post-desc div');
    const labels = document.querySelectorAll('.type-of-prop-post-desc label');

    divs.forEach((div, index) => {
        const radio = div.querySelector('input[type="radio"]');
        if (radio.checked) {
            div.classList.add('checked');
            labels[index].classList.add('checked');
        } else {
            div.classList.remove('checked');
            labels[index].classList.remove('checked');
        }
    });
    updateSizeStyles();
    updateAvailabilityStyles();
}


// Function to copy text to clipboard
function copyToClipboard(inputField) {
    inputField.select();
    document.execCommand('copy');
    showNotification('Copied: ' + inputField.value);
}

// Copy functionality for each button
const copyButtons = document.querySelectorAll('button.copyButton');
copyButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
        const inputField = document.getElementById(`inputField${index + 1}`);
        if (inputField) {
            copyToClipboard(inputField);
        } else {
            showNotification('Input field not found.');
        }
    });
});

// Share button functionality
const shareButtons = document.querySelectorAll('.share');
const modals = document.querySelectorAll('.modal-content');
const closeButtons = document.querySelectorAll('.close');

shareButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
        const modal = modals[index];
        modal.classList.add('show'); // Show the corresponding modal
    });
});

closeButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
        const modal = modals[index];
        modal.classList.remove('show'); // Hide the corresponding modal
    });
});
document.querySelector(".shortlisted").addEventListener("click",()=>{
    window.location.href="../html/buyershorlisted.html"
})
const allExplore=document.querySelectorAll(".exp")

allExplore.forEach(explore => {
    explore.addEventListener("click",()=>{
        window.location.href="../html/buyerpropertyexplore.html"
    })
});











