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
            alert("Please fill in all required fields.");
        } else {
            alert("Form submitted successfully!");
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
        // Optionally, you can add your search functionality here
        console.log("Search button clicked!");
    });
    
    // Event listener to close the contractor-list when clicking outside of it
    document.addEventListener("click", function(event) {
        const contractorList = document.getElementById("contractor-list");
        const searchButton = document.getElementById("search");
        
        if (!contractorList.contains(event.target) && !searchButton.contains(event.target)) {
            contractorList.style.display = "none";  // Close the list
        }
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
    // dotsIcon.addEventListener('click', toggleMenu);

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

// document.addEventListener("DOMContentLoaded", function() {
//     // Select all elements with the class "add-persons"
//     const addPersonsElements = document.querySelectorAll('.add-persons');
    
//     // Select the contractor list by ID
//     const contractorList = document.getElementById('contractor-list');
    
//     // Add event listener to each "Add Person" element
//     addPersonsElements.forEach(function(element) {
//       element.addEventListener('click', function() {
//         // Get the current display style of the contractor list using getComputedStyle
//         const currentDisplay = window.getComputedStyle(contractorList).display;
  
//         // Toggle visibility of the contractor list
//         if (currentDisplay === 'none') {
//           contractorList.style.display = 'block';  // Show the list
//         } else {
//           contractorList.style.display = 'none';  // Hide the list
//         }
//       });
//     });
//   });
  
  