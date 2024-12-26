function showNotification(message, type = 'success') {
  const notification = document.getElementById('customNotification');
  const notificationMessage = document.getElementById('notificationMessage');
  const okButton = document.getElementById('okButton');

  notificationMessage.textContent = message;

  if (type === 'error') {
    notification.classList.add('error');
  } else {
    notification.classList.remove('error');
  }

  notification.style.display = 'block';
  setTimeout(() => {
    notification.style.opacity = '1';
  }, 10);

  okButton.addEventListener('click', function () {
    notification.style.opacity = '0';
    setTimeout(() => {
      notification.style.display = 'none';
    }, 500);
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
let customerIdInput = document.getElementById("customer-id");

let fontList = [
  "Arial",
  "Verdana",
  "Times New Roman",
  "Garamond",
  "Georgia",
  "Courier New",
  "cursive",
];

const validateAndSubmit = (event) => {
  event.preventDefault();

  const requiredInputs = document.querySelectorAll('input[required], select[required]');
  let isFormValid = true;

  requiredInputs.forEach(input => {
    input.style.border = ""; // Reset border style
    if (input.value.trim() === "") {
      isFormValid = false;
      input.style.border = "1px solid red"; 
    }
  });

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

document.querySelector('.submittion span').addEventListener('click', validateAndSubmit);

const initializer = () => {
  writingArea.addEventListener("input", function() {
    let text = writingArea.innerText.trim();
    let words = text.split(/\s+/).filter(function(word) {
      return word.length > 0;
    });

    let wordCount = words.length;

    wordCountDisplay.textContent = "Word Count: " + wordCount;

    if (wordCount < 80 || wordCount > 160) {
      wordCountDisplay.style.color = "red";
    } else {
      wordCountDisplay.style.color = "green";
    }
  });

  writingArea.dispatchEvent(new Event('input'));

  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);

  fontList.forEach((value) => {
    let option = document.createElement("option");
    option.value = value;
    option.innerHTML = value;
    fontName.appendChild(option);
  });

  for (let i = 1; i <= 7; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    fontSizeRef.appendChild(option);
  }

  fontSizeRef.value = 3;
};

const modifyText = (command, defaultUi, value) => {
  document.execCommand(command, defaultUi, value);
};

optionsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modifyText(button.id, false, null);
  });
});

advancedOptionButton.forEach((button) => {
  button.addEventListener("change", () => {
    modifyText(button.id, false, button.value);
  });
});

linkButton.addEventListener("click", () => {
  let userLink = prompt("Enter a URL");
  if (/http/i.test(userLink)) {
    modifyText(linkButton.id, false, userLink);
  } else {
    userLink = "http://" + userLink;
    modifyText(linkButton.id, false, userLink);
  }
});

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
