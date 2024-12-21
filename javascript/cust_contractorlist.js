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

var popup = document.getElementById("popup");
popup.style.display = "none"; 

var closeBtn = document.getElementsByClassName("close")[0];

closeBtn.onclick = function() {
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
            showNotification("Please fill in all required fields.");
        } else {
            showNotification("Form submitted successfully!");
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




  