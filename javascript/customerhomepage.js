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


