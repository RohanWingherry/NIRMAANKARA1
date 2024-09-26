const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const contactList = document.querySelector("#contact-list");
let activeContactId = 1; // Default active contact
let chatHistory = {
  1: [],
  2: [],
  3: []
};

let inputInitHeight = chatInput.scrollHeight;

// Generate Response (Placeholder for backend logic)
const generateResponse = (userInput, contactId) => {
  return `Message sent to contact ${contactId}: ${userInput}`;
};

// Display chat history for selected contact
const displayChatHistory = (contactId) => {
  chatbox.innerHTML = ''; // Clear current chat
  chatHistory[contactId].forEach(message => {
    chatbox.innerHTML += `<li class="chat outgoing"><p>${message}</p></li>`;
  });
};

// Contact switch event
contactList.addEventListener('click', (e) => {
  if (e.target.classList.contains('contact')) {
    document.querySelectorAll('.contact').forEach(contact => contact.classList.remove('active'));
    e.target.classList.add('active');
    activeContactId = e.target.dataset.id;
    displayChatHistory(activeContactId);
  }
});

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

  // Store user's message in chat history
  chatHistory[activeContactId].push(userMessage);

  // Append user's message to the chatbox
  chatbox.innerHTML += `<li class="chat outgoing"><p>${userMessage}</p></li>`;
  chatbox.scrollTo(0, chatbox.scrollHeight);

  // Simulate backend response and append it to the chatbox after a delay
  setTimeout(() => {
    let botResponse = generateResponse(userMessage, activeContactId);
    chatbox.innerHTML += `<li class="chat incoming"><span class="material-symbols-outlined">smart_toy</span><p>${botResponse}</p></li>`;
    chatbox.scrollTo(0, chatbox.scrollHeight);
  }, 600);
});
