function filteroptions(){
    document.querySelector(".filters .filter-options>span:first-child").classList.add("filter-options-active")
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var radioButtons = document.querySelectorAll('input[type="radio"]');

    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });

    radioButtons.forEach(function(radio) {
        radio.checked = false;
    });
}

const filter=document.querySelector(".sort")
filter.addEventListener("click",()=>{
    document.querySelector(".filters").classList.add("show");
    document.querySelector(".filters").style.display="block"
    filter.style.display="none"
    document.querySelector(".back").style.display="block"
    document.querySelector(".display-leads").style.display="none"
    document.querySelector(".filters>article").style.display="none"
    document.querySelector(".filter-footer").style.display="block"
})

const back=document.querySelector(".back")
back.addEventListener("click",()=>{
    document.querySelector(".filters").classList.remove("show");
    document.querySelector(".filters").style.display="none"
    filter.style.display="block"
    document.querySelector(".back").style.display="none"
    document.querySelector(".display-leads").style.display="block"
    document.querySelector(".filters>article").style.display="block"
    document.querySelector(".filter-footer").style.display = "none";
})

const apply=document.querySelector(".apply")
apply.addEventListener("click",()=>{
    document.querySelector(".filters").classList.remove("show");
    document.querySelector(".filters").style.display="none"
    filter.style.display="block"
    document.querySelector(".back").style.display="none"
    document.querySelector(".display-leads").style.display="block"
    document.querySelector(".filters>article").style.display="block"
    document.querySelector(".filter-footer").style.display = "none";

})
var modal = document.getElementById("modal");
var modalText = document.getElementById("modal-text");
var span = document.getElementsByClassName("close")[0];

function showModal(content) {
    modalText.innerText = content;
    modal.style.display = "block";
}

document.querySelectorAll('.lead-contact span').forEach(item => {
    item.addEventListener('click', event => {
        let content = item.innerText.trim();
        if (content === "CALL") { // Only show modal for "CALL"
            showModal(content);
        }
    });
});

span.onclick = function() {
    modal.style.display = "none";
    document.getElementById("text-copy").innerText = "Copy";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("text-copy").innerText = "Copy";
    }
}

function copyText() {
    var copyText = document.getElementById("copy");
    copyText.disabled = false;
    copyText.select();
    document.execCommand("copy");
    copyText.disabled = true;
    document.getElementById("text-copy").innerText = "Copied";
    document.getElementById("text-copy").style.backgroundColor = "palevioletred";
    document.getElementById("text-copy").style.color = "white";
}





// message box cod starts from here
// Toggle main chat list (open/close)
// Add event listener to toggle the chat list
const chatListHeader = document.getElementById("chat-list-header");
chatListHeader.addEventListener("click", function () {
    const content = document.getElementById("chat-list-content");
    const arrow = document.getElementById("chat-list-arrow");

    if (content.style.display === "block") {
        content.style.display = "none";
        arrow.style.transform = "rotate(0deg)";
        document.querySelector(".chat-window").style.display = "none";
    } else {
        content.style.display = "block";
        arrow.style.transform = "rotate(180deg)";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const chatListUl = document.querySelector("#chat-list-content ul");
    const chatMessagesContainer = document.getElementById("chat-messages");
    const chatInput = document.getElementById("chat-input");
    const sendChatBtn = document.getElementById("send-chat-btn");

    // Store chat messages for each person
    const chatMessagesData = {};
    let activeChatPerson = null; // Keep track of the currently active chat

    // Event listener for customer chat initiation
    document.querySelectorAll(".chat-customer").forEach((customerElement) => {
        customerElement.addEventListener("click", function (event) {
            event.stopPropagation();

            // Find the parent article element
            const article = customerElement.closest(".lead-details");
            const personName = article.querySelector(".lead-link").innerText.trim();
            const personImg = article.querySelector(".profile-img img").src;

            // Open the chat window for the selected person
            openChatWindow(personName, personImg);
        });
    });

    function openChatWindow(personName, personImg) {
        activeChatPerson = personName; // Update the active chat person

        // Update the chat window header
        document.getElementById("chat-person-name").innerText = personName;
        document.getElementById("chat-person-image").src = personImg;

        // Clear chat messages and load stored messages
        chatMessagesContainer.innerHTML = "";

        if (chatMessagesData[personName] && chatMessagesData[personName].length > 0) {
            // Load stored messages for the selected person
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

        // Show the chat window
        document.getElementById("chat-window").style.display = "block";

        // Scroll to the bottom of the chat messages
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }

    function addToChatList(personName, personImg) {
        // Check if the person is already in the chat list
        let existingChatListItem = Array.from(chatListUl.children).find((child) =>
            child.getAttribute("data-person") === personName
        );

        if (!existingChatListItem) {
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

            // Add click event to open chat for the new person
            chatListItem.addEventListener("click", function () {
                openChatWindow(personName, personImg);
            });

            // Append the new <li> to the chat list
            chatListUl.appendChild(chatListItem);
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

        if (userMessage && activeChatPerson) {
            const personName = activeChatPerson;
            const personImg = document.getElementById("chat-person-image").src;

            // Create message element
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

            // Save message to the chatMessagesData
            if (!chatMessagesData[personName]) {
                chatMessagesData[personName] = [];
            }

            chatMessagesData[personName].push({
                text: userMessage,
                time: "Just now", // Replace with a formatted timestamp if needed
                side: "right",
                profileImg: "../assets/profile-pic.png",
            });

            // Add to chat list and move to top after sending the first message
            addToChatList(personName, personImg);
            moveToTopOfChatList(personName);

            // Clear the input field and scroll to the bottom
            chatInput.value = "";
            chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
        }
    });

    

    // Close chat window functionality
    document.getElementById("close-chat").addEventListener("click", function () {
        document.getElementById("chat-window").style.display = "none";
        activeChatPerson = null; // Clear the active chat person
    });

    // Dropdown menu functionality
    const optionsDots = document.getElementById("options-dots");
    const dropdownMenu = document.getElementById("dropdown-menu");
    const clearChat = document.getElementById("clear-chat");

    optionsDots.addEventListener("click", () => {
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
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
    

    // Close dropdown if clicking outside
    document.addEventListener("click", (event) => {
        if (!optionsDots.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = "none";
        }
    });
});

















