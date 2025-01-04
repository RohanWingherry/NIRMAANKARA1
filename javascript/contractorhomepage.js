const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtns = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const inputInitHeight = chatInput.scrollHeight;

// Function to generate responses based on user input
const generateResponse = (userInput) => {
  userInput = userInput.toLowerCase(); // Convert input to lowercase for easier matching

  if (userInput.includes("services")) {
    return "Nirmaanakaar offers services like profile creation, project display, lead generation, follow-up management, work status updates, procurement, invoicing, and document management.";
} else if (userInput.includes("display projects")) {
    return "To display your projects on the master page, you need to purchase a display package.";
} else if (userInput.includes("lead package")) {
    return "Lead packages help you get more customer inquiries. Purchase one to boost your client base.";
} else if (userInput.includes("follow-up")) {
    return "Manage follow-ups with clients directly through Nirmaanakaar to keep track of your leads.";
} else if (userInput.includes("work status")) {
    return "You can provide daily work status updates, including morning and evening reports, to keep clients informed.";
} else if (userInput.includes("procurement") || userInput.includes("purchasing")) {
    return "Manage purchase orders, procurement, and invoicing easily on Nirmaanakaar.";
} else if (userInput.includes("agreement")) {
    return "Create and manage agreements with clients using our agreement management feature.";
} else if (userInput.includes("invoice") || userInput.includes("receipt")) {
    return "Generate invoices and manage payments for your projects through Nirmaanakaar.";
} else if (userInput.includes("documents")) {
    return "Store and manage all your construction-related documents on the platform.";
} else if (userInput.includes("customer benefits")) {
    return "Customers receive daily work status updates and segmented payment options for transparency and convenience.";
} else {
    return "Sorry, I didn't understand that. Could you please rephrase your question?";
}

};

chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
closeBtns.addEventListener("click", () => document.body.classList.remove("show-chatbot"));

chatInput.addEventListener("input", () => {
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

sendChatBtn.addEventListener("click", () => {
  let userMessage = chatInput.value.trim();
  if (!userMessage) return;

  // Clear the input textarea
  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  // Append user's message to the chatbox
  chatbox.innerHTML += `<li class="chat outgoing"><p>${userMessage}</p></li>`;
  chatbox.scrollTo(0, chatbox.scrollHeight);

  // Generate bot's response and append it to the chatbox after a delay
  setTimeout(() => {
    let botResponse = generateResponse(userMessage);
    chatbox.innerHTML += `<li class="chat incoming"><span class="material-symbols-outlined">smart_toy</span><p>${botResponse}</p></li>`;
    chatbox.scrollTo(0, chatbox.scrollHeight);
  }, 600);
});


//FAQS

document.addEventListener('DOMContentLoaded', function() {
    const questions = document.querySelectorAll('.main-question');

    questions.forEach(question => {
        question.addEventListener('click', function() {
            const currentAnswer = this.nextElementSibling;
            const arrowIcon = this.querySelector('.arrow-icon');
            const isCurrentlyOpen = currentAnswer.style.display === 'block';

            // Close all answers and reset all arrow icons
            document.querySelectorAll('.main-answer').forEach(answer => {
                answer.style.display = 'none';
            });
            document.querySelectorAll('.arrow-icon').forEach(icon => {
                icon.style.transform = 'rotate(0deg)';
            });

            // If the clicked question's answer was not open, open it and rotate the arrow
            if (!isCurrentlyOpen) {
                currentAnswer.style.display = 'block';
                arrowIcon.style.transform = 'rotate(180deg)';
            }
        });
    });
});




// message box code starts from here
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

document.addEventListener('DOMContentLoaded', function () {
    const chatPersons = document.querySelectorAll('.chat-person');
    const chatMessagesContainer = document.getElementById('chat-messages');
    const sendChatBtn = document.getElementById('send-chat-btn');
    const chatInput = document.getElementById('chat-input');
    const chatListUl = document.querySelector("#chat-list-content ul");

    // Sample message data for each person
    const messagesData = {
        'Person 1': [
            { text: 'Any updates on interview schedules?', time: 'Today 9:38 am', side: 'left' },
            { text: 'I will let you know soon.', time: 'Today 9:40 am', side: 'right' }
        ],
        'Person 2': [
            { text: 'How’s everything going?', time: 'Yesterday 10:00 am', side: 'left' },
            { text: 'Pretty good, just busy.', time: 'Yesterday 10:05 am', side: 'right' }
        ],
        'Person 3': [
            { text: 'Did you get the documents?', time: '2 days ago 3:00 pm', side: 'left' },
            { text: 'Yes, I received them!', time: '2 days ago 3:05 pm', side: 'right' }
        ]
        // Add more messages for other persons as needed
    };

    // Mapping of person names to their images
    const personImages = {
        'Person 1': '../assets/profile-pic.png',
        'Person 2': '../assets/person2.png',
        'Person 3': '../assets/person3.png'
        // Additional persons...
    };

    // User's profile image (for right-side messages)
    const userProfileImage = '../assets/profile-pic.png';

    chatPersons.forEach(person => {
        person.addEventListener('click', function () {
            const personName = person.getAttribute('data-person');
            const personImg = personImages[personName];

            if (!personImg) {
                console.error(`Image not found for ${personName}`);
                return;
            }

            // Update chat window header with the selected person's info
            document.getElementById('chat-person-name').innerText = personName;
            document.getElementById('chat-person-image').src = personImg;

            // Clear previous messages
            chatMessagesContainer.innerHTML = '';

            // Load messages for the selected person (if any)
            const messages = messagesData[personName] || [];
            messages.forEach(message => {
                const messageContainer = document.createElement('div');
                messageContainer.className = `message-container ${message.side}`;
                const profilePic = message.side === 'left' ? personImg : userProfileImage;

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
            document.getElementById('chat-window').style.display = 'block';
        });
    });

    // Handle sending messages
    sendChatBtn.addEventListener('click', function () {
        const userMessage = chatInput.value.trim();
        const currentPersonName = document.getElementById('chat-person-name').innerText;
        const currentPersonImg = document.getElementById('chat-person-image').src;

        if (userMessage && currentPersonName) {
            // Create and display the message
            const messageContainer = document.createElement('div');
            messageContainer.className = 'message-container right';

            messageContainer.innerHTML = `
                <img src="${userProfileImage}" alt="Profile" class="profile-pic">
                <div>
                    <p class="message-text">${userMessage}</p>
                    <span class="message-time">Just now</span>
                </div>
            `;

            chatMessagesContainer.appendChild(messageContainer);
            chatInput.value = ''; // Clear input field
            chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight; // Scroll to the bottom

            // Add message to the messagesData object
            if (!messagesData[currentPersonName]) {
                messagesData[currentPersonName] = [];
            }
            messagesData[currentPersonName].push({
                text: userMessage,
                time: 'Just now',
                side: 'right',
                profileImg: userProfileImage
            });

            // Move the person to the top in the chat list (after message sent)
            moveToTopOfChatList(currentPersonName);

        }
    });

    // Function to move the person to the top of the chat list after a message is sent
    function moveToTopOfChatList(personName) {
        const chatListItem = Array.from(chatListUl.children).find(
            (child) => child.getAttribute("data-person") === personName
        );

        if (chatListItem) {
            chatListUl.removeChild(chatListItem);
            chatListUl.insertBefore(chatListItem, chatListUl.firstChild);
        }
    }

    // Handle deleting the person from the chat list
    chatPersons.forEach(person => {
        const menu = person.querySelector('.menu');
        const dotsIcon = person.querySelector('.dots');

        // Function to toggle menu
        const toggleMenu = (event) => {
            event.stopPropagation(); // Prevent event bubbling
            // Hide other menus
            document.querySelectorAll('.menu').forEach(m => {
                if (m !== menu) m.style.display = 'none';
            });
            // Toggle the menu for the clicked person
            menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        };

        // Dots icon click event
        dotsIcon.addEventListener('click', toggleMenu);

        // Delete person from list
        menu.querySelector('.delete-chat').addEventListener('click', function (event) {
            event.stopPropagation(); // Prevent event bubbling
            showDeleteChatPopup();
        });
        
        // Function to show the custom confirmation popup for deleting chat
        function showDeleteChatPopup() {
            const popup = document.getElementById('deletePopup');
            const popupMessage = popup.querySelector('.popup-content p');
            const popupTitle = popup.querySelector('.popup-content h3');
            const confirmButton = document.getElementById('confirmDelete');
            const cancelButton = document.getElementById('cancelDelete');
        
            // Customize popup text for chat deletion
            popupTitle.textContent = 'Delete Chat';
            popupMessage.textContent = 'Do you want to delete this chat?';
        
            // Show popup
            popup.classList.remove('hide');
            popup.classList.add('show');
            popup.style.display = 'block';
        
            // Confirm button action for deleting chat
            confirmButton.onclick = function () {
                person.remove(); // Remove from chat list
                menu.style.display = 'none'; // Hide menu
                chatMessagesContainer.innerHTML = ''; // Clear messages
                document.getElementById('chat-window').style.display = 'none'; // Close chat window
        
                hidePopup();
            };
        
            // Cancel button action
            cancelButton.onclick = function () {
                menu.style.display = 'none'; // Hide menu
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
        

        // Hide menus when clicking outside
        document.addEventListener('click', function () {
            document.querySelectorAll('.menu').forEach(m => m.style.display = 'none');
        });

        // Add click event to the person element to open the chat window
        person.addEventListener('click', function () {
            // Open chat window logic
            const chatWindow = document.getElementById('chat-window');
            chatWindow.style.display = 'block';
        });
    });

    // Close chat window functionality
    document.getElementById('close-chat').addEventListener('click', function (event) {
        event.stopPropagation();
        document.getElementById('chat-window').style.display = 'none';
    });
    
    
    
});



// message box code ends here

const optionsDots = document.getElementById('options-dots');
const dropdownMenu = document.getElementById('dropdown-menu');
const clearChat = document.getElementById('clear-chat');

optionsDots.addEventListener('click', () => {
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

clearChat.addEventListener("click", () => {
    showClearChatPopup();
});

// Function to show the custom confirmation popup
function showCustomPopup(actionType) {
    const popup = document.getElementById('deletePopup');
    const popupMessage = popup.querySelector('.popup-content p');
    const popupTitle = popup.querySelector('.popup-content h3');
    const confirmButton = document.getElementById('confirmDelete');
    const cancelButton = document.getElementById('cancelDelete');

    // Update popup text based on action
    if (actionType === 'clearChat') {
        popupTitle.textContent = 'Clear Chat';
        popupMessage.textContent = 'Do you want to clear the chat?';
    } else if (actionType === 'deleteRow') {
        popupTitle.textContent = 'Delete Confirmation';
        popupMessage.textContent = 'Are you sure you want to delete this row?';
    }

    // Show the popup
    popup.style.display = 'block';
    popup.classList.remove('hide');
    popup.classList.add('show');

    // Confirm button click action
    confirmButton.onclick = function () {
        if (actionType === 'clearChat') {
            clearChatMessages(); // Perform clear chat action
        } else if (actionType === 'deleteRow') {
            deleteRow(); // Perform delete row action
        }

        hidePopup(); // Close the popup
    };

    // Cancel button click action
    cancelButton.onclick = function () {
        hidePopup(); // Close the popup without action
    };
}

// Function to hide the popup
function hidePopup() {
    const popup = document.getElementById('deletePopup');

    // Add hide animation
    popup.classList.remove('show');
    popup.classList.add('hide');

    // Delay to match animation timing before fully hiding
    setTimeout(() => {
        popup.style.display = 'none';
    }, 300); // Ensure this matches your CSS animation duration
}

// Function to clear chat messages
function clearChatMessages() {
    const chatMessages = document.getElementById('chat-messages');

    // Clear messages from the chat
    if (chatMessages) {
        chatMessages.innerHTML = ''; // Empty the chat messages
        console.log('Chat messages cleared!');
    } else {
        console.warn('Chat messages container not found!');
    }
}

// Function to delete a row (example)
function deleteRow() {
    console.log('Row deleted'); // Replace with actual logic to delete a row
}

// Attach event listener to "Clear Chat" button
document.getElementById('clear-chat').addEventListener('click', function () {
    showCustomPopup('clearChat');
});

// Example delete row button
document.getElementById('delete-row-btn')?.addEventListener('click', function () {
    showCustomPopup('deleteRow');
});


// Close dropdown if clicking outside
document.addEventListener('click', (event) => {
    if (!optionsDots.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = 'none';
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const chatWindow = document.getElementById('chat-window');
    const closeChatBtn = document.getElementById('close-chat');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const optionsDots = document.getElementById('options-dots');

    // 📌 Close Chat Window
    closeChatBtn.addEventListener('click', function () {
        chatWindow.style.display = 'none';
    });

    // // 📌 Toggle Dropdown Menu
    // optionsDots.addEventListener('click', function (event) {
    //     event.stopPropagation(); // Prevent the event from bubbling up
    //     dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    // });

    // // 📌 Hide Dropdown When Clicking Outside
    // document.addEventListener('click', function () {
    //     dropdownMenu.style.display = 'none';
    // });
});