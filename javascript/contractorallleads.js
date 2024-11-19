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
        showModal(content);
    });
});

span.onclick = function() {
    modal.style.display = "none";
    document.getElementById("text-copy").innerText="Copy"
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("text-copy").innerText="Copy"
    }
}
function copyText() {
    var copyText = document.getElementById("copy");
    copyText.disabled = false;
    copyText.select();
    document.execCommand("copy");
    copyText.disabled = true;
    document.getElementById("text-copy").innerText="Copied"
    document.getElementById("text-copy").style.backgroundColor="palevioletred"
    document.getElementById("text-copy").style.color="white"
}


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
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".add-person").addEventListener("click", function(event) {
        event.stopPropagation(); // Prevent event bubbling
        var contractorList = document.querySelector(".contractor-list");
        contractorList.style.display = "block"; // Show the list
    });

    // Close contractor list when clicking outside of it
    document.addEventListener("click", function(event) {
        var contractorList = document.querySelector(".contractor-list");
        if (contractorList.style.display === "block" && !contractorList.contains(event.target) && !event.target.matches('.add-person')) {
            contractorList.style.display = "none"; // Hide the list
        }
    });

    // Prevent closing when clicking on the search input
    document.getElementById("search").addEventListener("click", function(event) {
        event.stopPropagation(); // Prevent click from closing the list
    });

    // Prevent closing when clicking on the contractor list itself
    document.querySelector(".contractor-list").addEventListener("click", function(event) {
        event.stopPropagation(); // Prevent closing the list when clicking inside
    });

    // Close contractor list when clicking the close icon
    document.querySelector(".close-contractor").addEventListener("click", function() {
        var contractorList = document.querySelector(".contractor-list");
        contractorList.style.display = "none"; // Hide the list
    });
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
        'Contractor 3': '../assets/Aparna3.png',
        'Contractor 4': '../assets/Aparna4.png',        
        'Contractor 5': '../assets/Aparna2.png',
        'Contractor 6': '../assets/Aparna5.png',        
        'Contractor 7': '../assets/Aparna5.png',
        'Contractor 8': '../assets/Aparna5.png',        
        'Contractor 9': '../assets/Aparna5.png',
        // Additional contractors...
    };
    
    // User's profile image (for right-side messages)
    const userProfileImage = '../assets/profile-pic.png'; // Change to your user's profile image path
    // Show menu on dots click
    
    
    chatPersons.forEach(person => {
        person.addEventListener('click', function () {
            const personName = person.getAttribute('data-person');
            let personImg;

            // Check if the clicked person is a contractor or a user
            if (contractorImages[personName]) {
                personImg = contractorImages[personName]; // Get contractor image
            } else if (personImages[personName]) {
                personImg = personImages[personName]; // Get user image
            } else {
                console.error(`Image not found for ${personName}`);
                return; // Exit if no image is found
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


    // Hide menus when clicking outside
    document.addEventListener('click', function (event) {
        document.querySelectorAll('.menu').forEach(m => m.style.display = 'none');
    });

    // Add click event to the person element to open the chat window
    person.addEventListener('click', function () {
        // Open chat window logic
        const chatWindow = document.getElementById('chat-window');
        chatWindow.style.display = 'block';
        contractorList.style.display = 'none';
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

const optionsDots = document.getElementById('options-dots');
const dropdownMenu = document.getElementById('dropdown-menu');
const clearChat = document.getElementById('clear-chat');

optionsDots.addEventListener('click', () => {
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

clearChat.addEventListener('click', () => {
    const confirmation = confirm("Do you want to clear the chat?");
    if (confirmation) {
        const chatMessages = document.getElementById('chat-messages');
        chatMessages.innerHTML = ''; // Clear all messages
    }
    dropdownMenu.style.display = 'none'; // Close dropdown
});




// Close dropdown if clicking outside
document.addEventListener('click', (event) => {
    if (!optionsDots.contains(event.target) && !dropdownMenu.contains(event.target)) {
        dropdownMenu.style.display = 'none';
    }
});