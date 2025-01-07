// notification or pop up
function showNotifications(message, type = 'success') {
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

var popup = document.getElementById("popup-enq");
popup.style.display = "none"; 

var closeBtn1 = document.getElementsByClassName("close")[0];

closeBtn1.onclick = function() {
    popup.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = "none";
    }
}

var enquireButtons = document.querySelectorAll(".enq");

enquireButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        var contractorBox = this.closest(".contractor-box");
        var contractorName = contractorBox.querySelector(".profile-name").textContent;
        var contractorImage = contractorBox.querySelector(".profile-box img").src;
        
        document.getElementById("contractorName").textContent = contractorName;
        document.getElementById("contractorImage").src = contractorImage;
        
        popup.style.display = "block";
    });
});

// sorting part

// Toggle the visibility of filter options when the title is clicked
document.querySelectorAll('.filter-title').forEach(function(title) {
    title.addEventListener('click', function() {
        // Toggle the 'collapsed' class on the parent element (filter-group)
        this.parentElement.classList.toggle('collapsed');
    });
});

// Ensure all filter groups are expanded by default (not collapsed)
document.querySelectorAll('.filter-group').forEach(function(group) {
    group.classList.remove('collapsed');
});


// sort open and close
document.getElementById('filterToggle').addEventListener('click', function() {
    var filterBox = document.getElementById('filterBox');
    if (filterBox.style.display === 'none' || filterBox.style.display === '') {
        filterBox.style.display = 'block';
    } else {
        filterBox.style.display = 'none';
    }
});

document.getElementById('applyFilterBtn').addEventListener('click', function() {
    var filterBox = document.getElementById('filterBox');
    
    // Check if the screen width is less than 750px
    if (window.innerWidth < 750) {
        filterBox.style.display = 'none';
    }
});



// drop down
// in form qoute dropdown
const form = document.getElementById("constructionForm");
    const nameTypeSelect = document.getElementById("nameType");
    const otherNameTypeInput = document.getElementById("otherNameType");

    nameTypeSelect.addEventListener("change", function() {
        if (this.value === "other") {
            otherNameTypeInput.style.display = "block";
            otherNameTypeInput.setAttribute("required", "true");
        } else {
            otherNameTypeInput.style.display = "none";
            otherNameTypeInput.removeAttribute("required");
        }
    });

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission for validation

        const fullName = document.getElementById("fullName").value.trim();
        const phoneNumber = document.getElementById("phoneNumber").value.trim();
        const nameType = document.getElementById("nameType").value;
        const landSize = document.getElementById("landSize").value.trim();
        const landAddress = document.getElementById("landAddress").value.trim();

        if (!fullName || !phoneNumber || nameType === "select" || !landSize || !landAddress || 
            (nameType === "other" && !otherNameTypeInput.value.trim())) {
            showNotifications("Please fill in all required fields.");
        } else {
            showNotifications("Form submitted successfully!");
            // Reset form or close modal logic here
            form.reset(); // Reset form fields
            // Close the modal (assuming you have a modal with id "myModal")
            document.getElementById("popup").style.display = "none";
        }
    });



    // message box cod starts from here
// Toggle main chat list (open/close)
document.getElementById("chat-list-header").addEventListener("click", function() {
    var content = document.getElementById("chat-list-content");
    var arrow = document.getElementById("chat-list-arrow");
    
    // Toggle chat list display
    if (content.style.display === "block") {
        content.style.display = "none";
        arrow.style.transform = "rotate(0deg)";
        document.querySelector(".chat-window").style.display = "none";
    } else {
        content.style.display = "block";
        arrow.style.transform = "rotate(180deg)";
    }
});

// Add event listener to the add-person icon
document.addEventListener("DOMContentLoaded", function () {
    const chatListUl = document.querySelector("#chat-list-content ul");
    const chatMessagesContainer = document.getElementById("chat-messages");
    const chatInput = document.getElementById("chat-input");
    const sendChatBtn = document.getElementById("send-chat-btn");

    // Store chat messages for each person
    const chatMessagesData = {};

    let currentChatPerson = null; // Keep track of the currently active chat person

    function openChatWindow(personName, personImg) {
        // Update current chat person
        currentChatPerson = { name: personName, img: personImg };

        // Update chat window header
        document.getElementById("chat-person-name").innerText = personName;
        document.getElementById("chat-person-image").src = personImg;

        // Clear chat messages and load stored messages
        chatMessagesContainer.innerHTML = "";

        if (chatMessagesData[personName] && chatMessagesData[personName].length > 0) {
            chatMessagesData[personName].forEach((message) => {
                const messageContainer = document.createElement("div");
                messageContainer.className = `message-container ${message.side}`;
                messageContainer.innerHTML = `
                    <img src="${message.profileImg}" alt="Profile" class="profile-pic">
                    <div>
                        <p class="message-text">${message.text}</p>
                        <span class="message-time">${message.time}</span>
                    </div>
                `;
                chatMessagesContainer.appendChild(messageContainer);
            });
        }

        // Show chat window
        document.getElementById("chat-window").style.display = "block";

        // Scroll to the bottom of chat messages
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }

    function addToChatList(personName, personImg) {
        // Check if the person is already in the chat list
        let existingChatListItem = Array.from(chatListUl.children).find(
            (child) => child.getAttribute("data-person") === personName
        );

        if (existingChatListItem) {
            // Update "Just now" time and move to the top
            existingChatListItem.querySelector(".time-received").innerText = "Just now";
            moveToTopOfChatList(personName);
        } else {
            // Add a new chat list item
            const chatListItem = document.createElement("li");
            chatListItem.className = "chat-person";
            chatListItem.setAttribute("data-person", personName);
            chatListItem.setAttribute("data-img", personImg);

            chatListItem.innerHTML = `
                <div class="persontext">
                    <img src="${personImg}" alt="${personName}">
                    <span>${personName}</span>
                </div>
                <div class="time">
                    <span class="time-received">Just now</span>
                </div>
            `;

            // Add click event to open chat for the person
            chatListItem.addEventListener("click", function () {
                openChatWindow(personName, personImg);
            });

            // Prepend the new item to the chat list
            chatListUl.insertBefore(chatListItem, chatListUl.firstChild);
        }
    }

    function moveToTopOfChatList(personName) {
        const chatListItem = Array.from(chatListUl.children).find(
            (child) => child.getAttribute("data-person") === personName
        );

        if (chatListItem) {
            chatListUl.removeChild(chatListItem);
            chatListUl.insertBefore(chatListItem, chatListUl.firstChild);
        }
    }

    // Handle sending messages
    sendChatBtn.addEventListener("click", function () {
        const userMessage = chatInput.value.trim();
        if (!userMessage || !currentChatPerson) return;

        const { name: personName, img: personImg } = currentChatPerson;

        // Create and display the message
        const messageContainer = document.createElement("div");
        messageContainer.className = "message-container right";
        messageContainer.innerHTML = `
            <img src="../assets/profile-pic.png" alt="Profile" class="profile-pic">
            <div>
                <p class="message-text">${userMessage}</p>
                <span class="message-time">Just now</span>
            </div>
        `;
        chatMessagesContainer.appendChild(messageContainer);

        // Save message to chatMessagesData
        if (!chatMessagesData[personName]) {
            chatMessagesData[personName] = [];
        }
        chatMessagesData[personName].push({
            text: userMessage,
            time: "Just now", // Replace with a formatted timestamp if needed
            side: "right",
            profileImg: "../assets/profile-pic.png",
        });

        // Add to chat list or update its position
        addToChatList(personName, personImg);

        // Clear input and scroll to the bottom
        chatInput.value = "";
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    });

    // Chat person selection logic
    document.querySelectorAll(".chat-customer").forEach((customerElement) => {
        customerElement.addEventListener("click", function () {
            const article = customerElement.closest(".lead-details");
            const personName = article.querySelector(".lead-link").innerText.trim();
            const personImg = article.querySelector(".profile-img img").src;

            openChatWindow(personName, personImg);
        });
    });

    document.querySelectorAll(".chatting.add-persons").forEach((chatButton) => {
        chatButton.addEventListener("click", function () {
            const contractorBox = chatButton.closest(".contractor-box");
            const personName = contractorBox.querySelector(".profile-name").innerText.trim();
            const personImg = contractorBox.querySelector(".profile-box img").src;

            openChatWindow(personName, personImg);
        });
    });

    // clear chat
    const optionsDots = document.getElementById('options-dots');
const dropdownMenu = document.getElementById('dropdown-menu');
const clearChat = document.getElementById('clear-chat');
const deletePopup = document.getElementById('deletePopup');
const cancelDelete = document.getElementById('cancelDelete');
const confirmDelete = document.getElementById('confirmDelete');

optionsDots.addEventListener('click', () => {
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

clearChat.addEventListener("click", () => {
    showClearChatPopup();
});

// Function to show the custom confirmation popup for clearing chat
function showClearChatPopup() {
    const popup = document.getElementById('deletePopup');
    const popupMessage = popup.querySelector('.popup-content p');
    const popupTitle = popup.querySelector('.popup-content h3');
    const confirmButton = document.getElementById('confirmDelete');
    const cancelButton = document.getElementById('cancelDelete');

    // Customize popup text for chat clearing
    popupTitle.textContent = 'Clear Chat';
    popupMessage.textContent = 'Do you want to clear the chat?';

    // Show popup
    popup.classList.remove('hide');
    popup.classList.add('show');
    popup.style.display = 'block';

    // Confirm button action
    confirmButton.onclick = function () {
        const chatMessages = document.getElementById("chat-messages");
        chatMessages.innerHTML = ""; // Clear all messages

        const personName = document.getElementById("chat-person-name").innerText;
        if (chatMessagesData && chatMessagesData[personName]) {
            chatMessagesData[personName] = []; // Clear stored messages for the person
        }

        dropdownMenu.style.display = "none"; // Close dropdown
        hidePopup();
    };

    // Cancel button action
    cancelButton.onclick = function () {
        dropdownMenu.style.display = "none"; // Close dropdown
        hidePopup();
    };
}

// Function to hide the popup
function hidePopup() {
    const popup = document.getElementById('deletePopup');
    popup.classList.remove('show');
    popup.classList.add('hide');

    setTimeout(() => {
        popup.style.display = 'none';
    }, 300); // Match CSS animation duration
}

    // Close chat window
    document.getElementById("close-chat").addEventListener("click", function () {
        document.getElementById("chat-window").style.display = "none";
    });
});




//   // Event listener for Apply Filter button
// document.getElementById('applyFilterBtn').addEventListener('click', applyFilters);
// document.getElementById('filterToggle').addEventListener('click', resetFilters);

// // Apply filters dynamically
// function applyFilters() {
//     const contractorList = document.querySelectorAll('.contractor-box');
//     const contractorContainer = document.querySelector('.list');

//     // Collect selected filter values
//     const selectedRatings = getCheckedValues('rating'); // ["5", "4"]
//     const selectedLocations = getCheckedValues('location'); // ["Hyderabad"]
//     const selectedServices = getCheckedValues('service'); // ["Construction", "Renovation"]
//     const selectedExperience = getCheckedRadioValue('experience'); // "1-3", "10+"

//     // Filter contractors dynamically
//     const filteredContractors = Array.from(contractorList).filter(contractor => {
//         const matchesRating = selectedRatings.length === 0 || checkRating(contractor, selectedRatings);
//         const matchesLocation = selectedLocations.length === 0 || checkLocation(contractor, selectedLocations);
//         const matchesService = selectedServices.length === 0 || checkService(contractor, selectedServices);
//         const matchesExperience = !selectedExperience || checkExperience(contractor, selectedExperience);

//         return matchesRating && matchesLocation && matchesService && matchesExperience;
//     });

//     // Clear and update contractor container
//     contractorContainer.innerHTML = '';
//     if (filteredContractors.length > 0) {
//         filteredContractors.forEach(contractor => contractorContainer.appendChild(contractor));
//     } else {
//         contractorContainer.innerHTML = `<div class="no-results">No results found</div>`;
//     }

//     reinitializeEventListeners(); // Reattach event listeners if necessary
// }

// // Helper: Get checked checkbox values
// function getCheckedValues(name) {
//     return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
//         .map(input => input.value);
// }

// // Helper: Get checked radio button value
// function getCheckedRadioValue(name) {
//     const checkedRadio = document.querySelector(`input[name="${name}"]:checked`);
//     return checkedRadio ? checkedRadio.value : null;
// }

// // Check contractor matches rating
// function checkRating(contractor, selectedRatings) {
//     const ratingText = contractor.querySelector('.star')?.textContent.trim();
//     const rating = ratingText ? parseFloat(ratingText) : 0;
//     return selectedRatings.some(selected => rating >= parseFloat(selected));
// }

// // Check contractor matches location
// function checkLocation(contractor, selectedLocations) {
//     const locationText = contractor.querySelector('.org-location')?.textContent.trim();
//     return selectedLocations.some(selected => locationText.includes(selected));
// }

// // Check contractor matches service
// function checkService(contractor, selectedServices) {
//     const services = Array.from(contractor.querySelectorAll('.ser-text')).map(el => el.textContent.trim());
//     return selectedServices.some(selected => services.includes(selected));
// }

// // Check contractor matches experience
// function checkExperience(contractor, selectedExperience) {
//     const experienceText = contractor.querySelector('.response')?.textContent.trim();
//     const experienceMatch = experienceText.match(/(\d+)\+/); // Extract years of experience
//     const experience = experienceMatch ? parseInt(experienceMatch[1]) : 0;

//     switch (selectedExperience) {
//         case '1-3': return experience >= 1 && experience <= 3;
//         case '3-5': return experience >= 3 && experience <= 5;
//         case '5-10': return experience >= 5 && experience <= 10;
//         case '10+': return experience > 10;
//         default: return true;
//     }
// }

// // Reset filters and reapply defaults
// function resetFilters() {
//     document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(input => {
//         input.checked = false;
//     });
//     applyFilters(); // Refresh contractor list
// }

// // Ensure event listeners remain active after DOM changes
// function reinitializeEventListeners() {
//     document.getElementById('applyFilterBtn').removeEventListener('click', applyFilters);
//     document.getElementById('applyFilterBtn').addEventListener('click', applyFilters);
// }


// Function to apply filters
// function applyFilters() {
//     const selectedRatings = [...document.querySelectorAll('input[name="rating"]:checked')].map(el => parseFloat(el.value));
//     const selectedLocations = [...document.querySelectorAll('input[name="location"]:checked')].map(el => el.value);
//     const selectedServices = [...document.querySelectorAll('input[name="service"]:checked')].map(el => el.value);
//     const selectedExperience = document.querySelector('input[name="experience"]:checked')?.value;

//     // Get all contractor boxes
//     const contractorBoxes = document.querySelectorAll('.contractor-box');

//     contractorBoxes.forEach(box => {
//         let isVisible = true;

//         // Filter by Rating
//         if (selectedRatings.length > 0) {
//             const ratingText = box.querySelector('.rating .star').textContent;
//             const rating = parseFloat(ratingText.match(/(\d+(\.\d+)?)/)[0]);
//             isVisible = selectedRatings.some(r => rating >= r) && isVisible;
//         }

//         // Filter by Location
//         if (selectedLocations.length > 0) {
//             const locationText = box.querySelector('.org-location').textContent.toLowerCase();
//             isVisible = selectedLocations.some(location => locationText.includes(location.toLowerCase())) && isVisible;
//         }

//         // Filter by Services
//         if (selectedServices.length > 0) {
//             const servicesText = [...box.querySelectorAll('.ser-text')].map(el => el.textContent.toLowerCase());
//             isVisible = selectedServices.some(service => servicesText.includes(service.toLowerCase())) && isVisible;
//         }

//         // Filter by Experience
//         if (selectedExperience) {
//             const expText = box.querySelector('.mid-side .response:nth-child(1)').textContent;
//             const expMatch = expText.match(/(\d+)/);
//             const experience = expMatch ? parseInt(expMatch[0]) : 0;
//             const [minExp, maxExp] = selectedExperience.split('-').map(Number);
//             if (maxExp) {
//                 isVisible = (experience >= minExp && experience <= maxExp) && isVisible;
//             } else {
//                 isVisible = experience >= minExp && isVisible;
//             }
//         }

//         // Show or Hide the contractor box based on filters
//         box.style.display = isVisible ? '' : 'none';
//     });
// }

// // Event Listener for Apply Button
// document.getElementById('applyFilterBtn').addEventListener('click', applyFilters);


// Function to apply filters
function applyFilters() {
    const selectedRatings = [...document.querySelectorAll('input[name="rating"]:checked')].map(el => parseFloat(el.value));
    const selectedLocations = [...document.querySelectorAll('input[name="location"]:checked')].map(el => el.value);
    const selectedServices = [...document.querySelectorAll('input[name="service"]:checked')].map(el => el.value);
    const selectedExperience = document.querySelector('input[name="experience"]:checked')?.value;

    // Get all contractor boxes
    const contractorBoxes = document.querySelectorAll('.contractor-box');
    let visibleCount = 0;

    contractorBoxes.forEach(box => {
        let isVisible = true;

        // Filter by Rating
        if (selectedRatings.length > 0) {
            const ratingText = box.querySelector('.rating .star').textContent;
            const rating = parseFloat(ratingText.match(/(\d+(\.\d+)?)/)[0]);
            isVisible = selectedRatings.some(r => rating >= r) && isVisible;
        }

        // Filter by Location
        if (selectedLocations.length > 0) {
            const locationText = box.querySelector('.org-location').textContent.toLowerCase();
            isVisible = selectedLocations.some(location => locationText.includes(location.toLowerCase())) && isVisible;
        }

        // Filter by Services
        if (selectedServices.length > 0) {
            const servicesText = [...box.querySelectorAll('.ser-text')].map(el => el.textContent.toLowerCase());
            isVisible = selectedServices.some(service => servicesText.includes(service.toLowerCase())) && isVisible;
        }

        // Filter by Experience
        if (selectedExperience) {
            const expText = box.querySelector('.mid-side .response:nth-child(1)').textContent;
            const expMatch = expText.match(/(\d+)/);
            const experience = expMatch ? parseInt(expMatch[0]) : 0;
            const [minExp, maxExp] = selectedExperience.split('-').map(Number);
            if (maxExp) {
                isVisible = (experience >= minExp && experience <= maxExp) && isVisible;
            } else {
                isVisible = experience >= minExp && isVisible;
            }
        }

        // Show or Hide the contractor box based on filters
        if (isVisible) {
            box.style.display = '';
            visibleCount++;
        } else {
            box.style.display = 'none';
        }
    });

    // Display 'No Results Found' if no contractors match the filters
    let noResultElement = document.getElementById('noResults');
    if (!noResultElement) {
        noResultElement = document.createElement('div');
        noResultElement.id = 'noResults';
        noResultElement.style.textAlign = 'center';
        noResultElement.style.fontSize = '18px';
        noResultElement.style.fontWeight = 'bold';
        noResultElement.style.marginTop = '20px';
        noResultElement.textContent = 'No results found';
        document.querySelector('.list').appendChild(noResultElement);
    }
    noResultElement.style.display = visibleCount === 0 ? '' : 'none';
}

// Event Listener for Apply Button
document.getElementById('applyFilterBtn').addEventListener('click', applyFilters);
