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
document.querySelector(".add-person").addEventListener("click", function(event) {
    // Prevent the click event from bubbling up to the chat-list-header
    event.stopPropagation();
    
    // Display the contractor list (assuming you have a function or a way to show it)
    var contractorList = document.getElementById("contractor-list");
    contractorList.style.display = "block"; // or whatever method you use to show it
});

document.addEventListener('DOMContentLoaded', function () {
    const chatPersons = document.querySelectorAll('.chat-person');
    const chatMessagesContainer = document.getElementById('chat-messages');
    const sendChatBtn = document.getElementById('send-chat-btn');
    const chatInput = document.getElementById('chat-input');

    // Sample message data for each person
    const messagesData = {
        'Person 1': [
            { text: 'Any updates on interview schedules?', time: 'Today 9:38 am', side: 'left' },
            { text: 'I will let you know soon.', time: 'Today 9:40 am', side: 'right' },
            { text: 'Any updates on interview schedules?', time: 'Today 9:38 am', side: 'left' },
            { text: 'I will let you know soon.', time: 'Today 9:40 am', side: 'right' },
            { text: 'Any updates on interview schedules?', time: 'Today 9:38 am', side: 'left' },
            { text: 'I will let you know soon.', time: 'Today 9:40 am', side: 'right' },
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
        ],
        'Person 4': [
            { text: 'Let’s meet next week.', time: '3 days ago 11:00 am', side: 'left' },
            { text: 'Sounds good!', time: '3 days ago 11:05 am', side: 'right' }
        ],
        'Person 5': [
            { text: 'What are your plans for the weekend?', time: '15 Sept 10:00 am', side: 'left' },
            { text: 'I might go hiking.', time: '15 Sept 10:05 am', side: 'right' }
        ],
        'Person 6': [
            { text: 'Can we reschedule our meeting?', time: '19 Sept 1:00 pm', side: 'left' },
            { text: 'Sure, let me know your available times.', time: '19 Sept 1:05 pm', side: 'right' }
        ],
        'Person 7': [
            { text: 'Can we reschedule our meeting?', time: '19 Sept 1:00 pm', side: 'left' },
            { text: 'Sure, let me know your available times.', time: '19 Sept 1:05 pm', side: 'right' }
        ],
        'Person 8': [
            { text: 'Can we reschedule our meeting?', time: '19 Sept 1:00 pm', side: 'left' },
            { text: 'Sure, let me know your available times.', time: '19 Sept 1:05 pm', side: 'right' }
        ]
        // Add more messages for other persons as needed
    };

    // Mapping of person names to their images
    const personImages = {
        'Person 1': '../assets/contractor.png',
        'Person 2': '../assets/circle.png',
        'Person 3': '../assets/buy.png',
        'Person 4': '../assets/rental.png',
        'Person 5': '../assets/rentor.png',
        'Person 6': '../assets/sell.png',
        'Person 7': '../assets/receipt.jpg',
        'Person 8': '../assets/receipt.jpg',
        'Person 9': '../assets/circle.png',

    };

    // Mapping of contractor names to their images
    const contractorImages = {
        'Contractor 1': '../assets/Aparna1.png',
        'Contractor 2': '../assets/Aparna2.png',
        // Additional contractors...
    };

    // User's profile image (for right-side messages)
    const userProfileImage = '../assets/profile-pic.png'; // Change to your user's profile image path
    // Show menu on dots click
    

    chatPersons.forEach(person => {
        person.addEventListener('click', function () {
            const personName = person.getAttribute('data-person');
            let personImg = personImages[personName]; // Assume you have a personImages object defined

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

        if (userMessage) {
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
        }
    });
    
    // Close chat window functionality
    document.getElementById('close-chat').addEventListener('click', function () {
        document.getElementById('chat-window').style.display = 'none';
    });

    // Close contractor list functionality
    const closeButton = document.querySelector('.close-contractor');
    const contractorList = document.querySelector('.contractor-list');

    closeButton.addEventListener('click', function() {
        contractorList.style.display = 'none'; 
    });

//     const chatPersons = document.querySelectorAll('.chat-person'); // Select all chat persons
// const chatMessagesContainer = document.getElementById('chat-messages'); // Your chat messages container

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
        if (confirm("Do you want to delete?")) {
            person.remove();
            menu.style.display = 'none'; // Hide menu
            chatMessagesContainer.innerHTML = ''; // Clear messages
        }
        document.getElementById('chat-window').style.display = 'none';
    });

    // Clear chat messages
    menu.querySelector('.clear-chat').addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent event bubbling
        chatMessagesContainer.innerHTML = ''; // Clear messages for this chat
        menu.style.display = 'none'; // Hide menu
    });

    // Pin chat at the top
    menu.querySelector('.pin-chat').addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent event bubbling
        const personName = person.getAttribute('data-person');

        // Check if already pinned
        if (person.classList.contains('pinned')) {
            // Unpinning
            person.classList.remove('pinned');
            person.querySelector('.pin-chat').textContent = 'Pin'; // Change text to "Pin"
            const pinSymbol = person.querySelector('.pin-symbol');
            if (pinSymbol) {
                pinSymbol.remove(); // Remove pin symbol if it exists
            }
            menu.style.display = 'none'; // Hide menu
        } else {
            // Pinning
            person.classList.add('pinned');
            person.querySelector('.pin-chat').textContent = 'Unpin'; // Change text to "Unpin"

            // Create and add pin symbol
            const pinSymbol = document.createElement('span');
            pinSymbol.className = 'pin-symbol';
            pinSymbol.textContent = '📌'; // Use any symbol or emoji for the pin
            person.appendChild(pinSymbol);

            const parent = document.querySelector('#chat-list-content ul');
            const pinnedChat = person.cloneNode(true);

            // Ensure the pinned chat retains the dots functionality
            const pinnedDotsIcon = pinnedChat.querySelector('.dots');
            pinnedDotsIcon.addEventListener('click', toggleMenu); // Re-add the event listener for dots

            // Add event listener to open chat window for pinned chat
            pinnedChat.addEventListener('click', function () {
                const personName = pinnedChat.getAttribute('data-person');
                const personImg = personImages[personName];

                // Update chat window header
                document.getElementById('chat-person-name').innerText = personName;
                document.getElementById('chat-person-image').src = personImg;

                // Clear previous messages
                chatMessagesContainer.innerHTML = '';

                // Load messages for the pinned person
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

            parent.insertBefore(pinnedChat, parent.firstChild);
            person.remove(); // Remove the original person
            menu.style.display = 'none'; // Hide menu
        }
    });

    

    // Hide menus when clicking outside
    document.addEventListener('click', function (event) {
        document.querySelectorAll('.menu').forEach(m => m.style.display = 'none');
    });

    // Add click event to the person element to open the chat window
    person.addEventListener('click', function () {
        // Open chat window logic
        const chatWindow = document.getElementById('chat-window');
        chatWindow.style.display = 'block';
        // Load messages for this person if necessary
    });
});

    
    
    
});

document.addEventListener('DOMContentLoaded', function() {
    const closeButton = document.querySelector('.close-contractor');
    const contractorList = document.querySelector('.contractor-list');

    closeButton.addEventListener('click', function() {
        contractorList.style.display = 'none'; 
    });
    contractorList.addEventListener('click', function() {
        contractorList.style.display = 'none';
    })
});

// add=person
document.querySelector(".add-person").addEventListener("click", function() {
    document.querySelector(".contractor-list").style.display="block";
    document.querySelector(".chat-window").style.display="none";
})
// message box code ends here



// cahtbot code start
// chatbot toggle
const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
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
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));

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


