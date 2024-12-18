// notification or pop up
function showNotification(message, type = 'success') {
  const notification = document.getElementById('customNotification');
  const notificationMessage = document.getElementById('notificationMessage');
  const okButton = document.getElementById('okButton');

  notificationMessage.textContent = message;

  // Add error class if the type is 'error'
  if (type === 'error') {
      notification.classList.add('error');
  } else {
      notification.classList.remove('error');
  }

  // Show the notification with a fade-in effect
  notification.style.display = 'block';
  setTimeout(() => {
      notification.style.opacity = '1';  // Fade-in effect
  }, 10);

  // When "OK" button is clicked, hide the notification with a fade-out effect
  okButton.addEventListener('click', function () {
      notification.style.opacity = '0';  // Fade-out effect
      setTimeout(() => {
          notification.style.display = 'none';  // Ensure it's hidden after fading out
      }, 500);  // Wait for the transition duration before hiding completely
  });
}

let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let spacingButtons = document.querySelectorAll(".spacing");
let formatButtons = document.querySelectorAll(".format");
let scriptButtons = document.querySelectorAll(".script");
let wordCountDisplay = document.getElementById("word-count");
let customerIdInput = document.getElementById("customer-id"); // Reference to customer ID input

// List of font list
let fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "cursive",
];

// Validate before submission
const validateAndSubmit = (event) => {
  event.preventDefault();

  const requiredInputs = document.querySelectorAll('input[required], select[required]');
  let isFormValid = true;

  requiredInputs.forEach(input => {
    input.style.border = "";
    if (input.value.trim() === "") {
      isFormValid = false;
      input.style.border = "1px solid red";
    }
  });

  // Check for customer ID
  if (!customerIdInput.value.trim()) {
    isFormValid = false;
    customerIdInput.style.border = "1px solid red";
  }

  if (!isFormValid) {
    showNotification("Please fill out all required fields correctly.");
    return;
  }

  let text = writingArea.innerText.trim();
  let words = text.split(/\s+/).filter(word => word.length > 0);
  let wordCount = words.length;
  let secondPartySignature = document.getElementById('builder-signature').value.trim();

  if (wordCount < 80 || wordCount > 160) {
    showNotification("The agreement text must be between 80 and 160 words.");
    return false;
  }

  if (!secondPartySignature) {
    showNotification("Second party e-signature is mandatory.");
    return false;
  }

  showNotification("Form is submitted successfully");
  window.location.href = "../html/contractoragreementhistory.html";
  return true;
};

// Attach validateAndSubmit to submit button
document.querySelector('.submittion span').addEventListener('click', validateAndSubmit);

// Initial Settings
const initializer = () => {
  writingArea.addEventListener("input", function() {
    // Get the text and trim leading/trailing spaces
    let text = writingArea.innerText.trim();

    // Split the text into words based on whitespace and filter out empty entries
    let words = text.split(/\s+/).filter(function(word) {
      return word.length > 0; // Ensure empty strings are not counted
    });

    // Count the words
    let wordCount = words.length;

    // Update word count display
    wordCountDisplay.textContent = "Word Count: " + wordCount;

    // Apply color styling based on the word count
    if (wordCount < 80 || wordCount > 160) {
      wordCountDisplay.style.color = "red";
    } else {
      wordCountDisplay.style.color = "green";
    }
  });

  // Initial word count check
  writingArea.dispatchEvent(new Event('input'));

  // Function calls for highlighting buttons
  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);

  // Create options for font names
  fontList.forEach((value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
  });

  // FontSize allows only till 7
  for (let i = 1; i <= 7; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    fontSizeRef.appendChild(option);
  }

  // Default size
  fontSizeRef.value = 3;
};


// Main logic
const modifyText = (command, defaultUi, value) => {
  document.execCommand(command, defaultUi, value);
};

// For basic operations which don't need value parameter
optionsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
  });
});

// Options that require value parameter (e.g., colors, fonts)
advancedOptionButton.forEach((button) => {
  button.addEventListener("change", () => {
    modifyText(button.id, false, button.value);
  });
});

// Link
linkButton.addEventListener("click", () => {
  let userLink = prompt("Enter a URL");
  if (/http/i.test(userLink)) {
    modifyText(linkButton.id, false, userLink);
  } else {
    userLink = "http://" + userLink;
    modifyText(linkButton.id, false, userLink);
  }
});

// Highlight clicked button
const highlighter = (className, needsRemoval) => {
  className.forEach((button) => {
    button.addEventListener("click", () => {
      if (needsRemoval) {
        let alreadyActive = button.classList.contains("active");
        highlighterRemover(className);
        if (!alreadyActive) {
          button.classList.add("active");
        }
      } else {
        button.classList.toggle("active");
      }
    });
  });
};

const highlighterRemover = (className) => {
  className.forEach((button) => {
    button.classList.remove("active");
  });
};

window.onload = initializer;

// Modal logic
var modal = document.getElementById("myModal");
var btn1 = document.getElementById("sample");
var span = document.getElementsByClassName("close")[0];

btn1.onclick = function() {
  modal.style.display = "block";
};

span.onclick = function() {
  modal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Fetch details logic
document.getElementById("fetch-details").addEventListener("click", () => {
  const cust = customerIdInput.value;
  if (cust) {
    document.querySelector(".main-client-det").style.display = "block";
  } else {
    showNotification("Enter the Customer-id");
  }
});

const dateInput = document.getElementById('dateInput');
const today = new Date().toISOString().split('T')[0]; 
dateInput.value = today;
dateInput.style.textAlign = 'center';
