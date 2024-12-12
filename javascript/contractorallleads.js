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
document.getElementById("chat-list-header").addEventListener("click", function () {
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

document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".add-person").addEventListener("click", function () {
        document.querySelector(".chat-window").style.display = "none";
    });

    // Sample message data for each person
    const messagesData = {
        "Person 1": [
            { text: "Any updates on interview schedules?", time: "Today 9:38 am", side: "left" },
            { text: "I will let you know soon.", time: "Today 9:40 am", side: "right" }
        ],
        "Person 2": [
            { text: "How’s everything going?", time: "Yesterday 10:00 am", side: "left" },
            { text: "Pretty good, just busy.", time: "Yesterday 10:05 am", side: "right" }
        ]
        // Add more messages for other persons as needed
    };

    // Mapping of person names to their images
    const personImages = {
        "Person 1": "../assets/contractor.png",
        "Person 2": "../assets/circle.png"
    };

    // User's profile image (for right-side messages)
    const userProfileImage = "../assets/profile-pic.png";

    const chatPersons = document.querySelectorAll(".chat-person");
    const chatMessagesContainer = document.getElementById("chat-messages");
    const sendChatBtn = document.getElementById("send-chat-btn");
    const chatInput = document.getElementById("chat-input");

    chatPersons.forEach((person) => {
        person.addEventListener("click", function () {
            const personName = person.getAttribute("data-person");
            const personImg = personImages[personName];

            // Update chat window header with the selected person's info
            document.getElementById("chat-person-name").innerText = personName;
            document.getElementById("chat-person-image").src = personImg;

            // Clear previous messages
            chatMessagesContainer.innerHTML = "";

            // Load messages for the selected person (if any)
            const messages = messagesData[personName] || [];
            messages.forEach((message) => {
                const messageContainer = document.createElement("div");
                messageContainer.className = `message-container ${message.side}`;
                const profilePic = message.side === "left" ? personImg : userProfileImage;

                messageContainer.innerHTML = `
                    <img src="${profilePic}" alt="Profile" class="profile-pic">
                    <div>
                        <p class="message-text">${message.text}</p>
                        <span class="message-time">${message.time}</span>
                    </div>
                `;
                chatMessagesContainer.appendChild(messageContainer);
            });

            // Show the chat window
            document.getElementById("chat-window").style.display = "block";
        });
    });

    // Handle sending messages
    sendChatBtn.addEventListener("click", function () {
        const userMessage = chatInput.value.trim();

        if (userMessage) {
            const messageContainer = document.createElement("div");
            messageContainer.className = "message-container right";

            messageContainer.innerHTML = `
                <img src="${userProfileImage}" alt="Profile" class="profile-pic">
                <div>
                    <p class="message-text">${userMessage}</p>
                    <span class="message-time">Just now</span>
                </div>
            `;

            chatMessagesContainer.appendChild(messageContainer);
            chatInput.value = ""; // Clear input field
            chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight; // Scroll to the bottom
        }
    });

    // Close chat window functionality
    document.getElementById("close-chat").addEventListener("click", function () {
        document.getElementById("chat-window").style.display = "none";
    });
});

// Dropdown menu functionality
const optionsDots = document.getElementById("options-dots");
const dropdownMenu = document.getElementById("dropdown-menu");
const clearChat = document.getElementById("clear-chat");

optionsDots.addEventListener("click", () => {
    dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
});

clearChat.addEventListener("click", () => {
    const confirmation = confirm("Do you want to clear the chat?");
    if (confirmation) {
        const chatMessages = document.getElementById("chat-messages");
        chatMessages.innerHTML = ""; // Clear all messages
    }
    dropdownMenu.style.display = "none"; // Close dropdown
});

// Close dropdown if clicking outside
document.addEventListener("click", (event) => {
    if (!optionsDots.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = "none";
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const chatListUl = document.querySelector("#chat-list-content ul");
    const chatMessagesContainer = document.getElementById("chat-messages");
    const chatInput = document.getElementById("chat-input");
    const sendChatBtn = document.getElementById("send-chat-btn");

    // Store chat messages for each person
    const chatMessagesData = {};

    document.querySelectorAll(".chat-customer").forEach((customerElement) => {
        customerElement.addEventListener("click", function (event) {
            event.stopPropagation();

            // Find the parent article element
            const article = customerElement.closest(".lead-details");
            const personName = article.querySelector(".lead-link").innerText.trim();
            const personImg = article.querySelector(".profile-img img").src;

            // Check if the lead is already in the chat list
            let chatListItem = Array.from(chatListUl.children).find((child) =>
                child.getAttribute("data-person") === personName
            );

            // Open the chat window for the selected person
            openChatWindow(personName, personImg, chatListItem);
        });
    });

    function openChatWindow(personName, personImg, chatListItem) {
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

        if (!chatListItem) {
            addToChatList(personName, personImg);
        }

        // Scroll to the bottom of the chat messages
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }

    function addToChatList(personName, personImg) {
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

        // Prepend the new <li> to the chat list
        chatListUl.insertBefore(chatListItem, chatListUl.firstChild);

        // Add click event to open chat for the new person
        chatListItem.addEventListener("click", function () {
            openChatWindow(personName, personImg, chatListItem);
        });
    }

    // Handle sending messages
    sendChatBtn.addEventListener("click", function () {
        const userMessage = chatInput.value.trim();

        if (userMessage) {
            const personName = document.getElementById("chat-person-name").innerText;
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
                profileImg: "../assets/profile-pic.png"
            });

            // Update the chat list time
            let chatListItem = Array.from(chatListUl.children).find((child) =>
                child.getAttribute("data-person") === personName
            );
            if (chatListItem) {
                chatListItem.querySelector(".time-received").innerText = "Just now"; // Add dynamic time if needed

                // Move the chatted person to the top of the list
                chatListUl.removeChild(chatListItem);
                chatListUl.insertBefore(chatListItem, chatListUl.firstChild);
            } else {
                addToChatList(personName, personImg);
            }

            // Clear the input field and scroll to the bottom
            chatInput.value = "";
            chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
        }
    });

    // Close chat window functionality
    document.getElementById("close-chat").addEventListener("click", function () {
        document.getElementById("chat-window").style.display = "none";
    });
});








