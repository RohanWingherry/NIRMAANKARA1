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
    // Add event listeners to each ".chat-customer" element
    document.querySelectorAll(".chat-customer").forEach((customerElement) => {
        customerElement.addEventListener("click", function (event) {
            // Prevent any other event propagation
            event.stopPropagation();

            // Find the parent article element
            const article = customerElement.closest(".lead-details");

            // Extract the customer name and profile image
            const personName = article.querySelector(".lead-link").innerText.trim();
            const personImg = article.querySelector(".profile-img img").src;

            // Update the chat window with the selected customer's details
            const chatWindow = document.getElementById("chat-window");
            document.getElementById("chat-person-name").innerText = personName;
            document.getElementById("chat-person-image").src = personImg;

            // Show the chat window
            chatWindow.style.display = "block";
        });
    });

    // Close chat window functionality
    document.getElementById("close-chat").addEventListener("click", function () {
        document.getElementById("chat-window").style.display = "none";
    });
});


