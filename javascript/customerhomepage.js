// Toggle main chat list (open/close)
document.getElementById("chat-list-header").addEventListener("click", function() {
    var content = document.getElementById("chat-list-content");
    var arrow = document.getElementById("chat-list-arrow");

    // Close the contractor list and chat window when main chat is toggled
    document.getElementById("contractor-list-box").style.display = 'none';
    document.getElementById("contractor-chat-window").style.display = "none";

    if (content.style.display === "block") {
        content.style.display = "none";
        arrow.style.transform = "rotate(0deg)";
    } else {
        content.style.display = "block";
        arrow.style.transform = "rotate(180deg)";
    }
});

// Open chat window for selected person in the main chat
const chatPersons = document.querySelectorAll(".chat-person");
const chatWindow = document.getElementById("chat-window");
const chatPersonName = document.getElementById("chat-person-name");
const chatPersonImage = document.getElementById("chat-person-image");
const chatMessages = document.getElementById("chat-messages");

chatPersons.forEach(person => {
    person.addEventListener("click", function() {
        const personName = this.dataset.person;
        const personImg = this.dataset.img;

        chatPersonName.textContent = personName;
        chatPersonImage.src = personImg;
        chatWindow.style.display = "block";

        // Close the contractor chat window if it's open
        document.getElementById("contractor-chat-window").style.display = "none";
    });
});

// Close the main chat window
document.getElementById("close-chat").addEventListener("click", function() {
    chatWindow.style.display = "none";
});

// Show contractor list when 'add-person' is clicked
document.querySelector('.add-person').addEventListener('click', function() {
    const contractorListBox = document.getElementById('contractor-list-box');
    const chatListBox = document.getElementById('chat-list-box');
    const chatWindow = document.getElementById('chat-window');
    const contractorChatWindow = document.getElementById('contractor-chat-window');
    
    // Hide chat-related sections
    chatListBox.style.display = 'none'; // Hide the chat list
    chatWindow.style.display = 'none'; // Hide the chat window

    // Make the contractor list box visible
    contractorListBox.style.display = 'block'; // Show the contractor section
    contractorChatWindow.style.display = 'none'; // Ensure contractor chat is initially hidden
});

// Add click event listeners to contractor persons
const contractorPersons = document.querySelectorAll(".contractor-person");
const contractorWindow = document.getElementById("contractor-chat-window");
const contractorPersonName = document.getElementById("contractor-person-name");
const contractorPersonImage = document.getElementById("contractor-person-image");
const contractorMessages = document.getElementById("contractor-chat-messages");

contractorPersons.forEach(person => {
    person.addEventListener("click", function() {
        const contractorName = this.dataset.person;
        const contractorImg = this.dataset.img;

        // Close the chat window when contractor is opened
        chatWindow.style.display = "none";

        // Open contractor chat window
        contractorPersonName.textContent = contractorName;
        contractorPersonImage.src = contractorImg;
        contractorWindow.style.display = "block"; // Make contractor chat visible

        // Hide contractor list box when contractor chat opens
        document.getElementById("contractor-list-box").style.display = 'none';
    });
});
document.getElementById("add-person-btn").addEventListener("click", function() {
    // Hide chat list
    document.querySelector(".chat-list-box").style.display = "none"; // hide chat list box
    // Show contractor list
    document.querySelector(".contractor-list-box").style.display = "block"; // show contractor list box
});

document.getElementById("chat-list-btn").addEventListener("click", function() {
    // Hide contractor list
    document.querySelector(".contractor-list-box").style.display = "none"; // hide contractor list box
    // Show chat list
    document.querySelector(".chat-list-box").style.display = "block"; // show chat list box
});


// Close contractor chat window
document.getElementById("close-contractor-chat").addEventListener("click", function() {
    contractorWindow.style.display = "none";
    document.getElementById('contractor-list-box').style.display = 'block'; // Show the contractor list again
});

// Send message in contractor chat
document.getElementById('send-contractor-chat-btn').addEventListener('click', function() {
    const contractorMessageText = document.getElementById('contractor-chat-input').value.trim();
    if (contractorMessageText !== "") {
        const contractorNewMessage = document.createElement('div');
        contractorNewMessage.classList.add('message-container', 'right');

        contractorNewMessage.innerHTML = `
            <img src="../assets/profile-pic.png" alt="Profile" class="profile-pic">
            <div>
                <p class="message-text">${contractorMessageText}</p>
                <span class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
        `;

        contractorMessages.appendChild(contractorNewMessage);
        document.getElementById('contractor-chat-input').value = '';
        contractorMessages.scrollTop = contractorMessages.scrollHeight;
    }
});

// Send message logic for the main chat
document.getElementById('send-chat-btn').addEventListener('click', function() {
    const messageText = document.getElementById('chat-input').value.trim();
    if (messageText !== "") {
        const newMessage = document.createElement('div');
        newMessage.classList.add('message-container', 'right');

        newMessage.innerHTML = `
            <img src="../assets/profile-pic.png" alt="Profile" class="profile-pic">
            <div>
                <p class="message-text">${messageText}</p>
                <span class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
        `;

        document.getElementById('chat-messages').appendChild(newMessage);
        document.getElementById('chat-input').value = '';
        document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight;
    }
});



// end


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


