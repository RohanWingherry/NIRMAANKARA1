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

//List of fontlist
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

    const contactNumber = document.getElementById('contact-number');
    const pincode = document.getElementById('client-pincode');
    const orgPincode = document.getElementById('org-pincode');
    const clientName = document.getElementById('client-name');
    const clientAddress=document.getElementById('client-address');
    const clientCity=document.getElementById('client-city');
    const orgName=document.getElementById("org-name");
    const gstName=document.getElementById('gst-reg-no');
    const orgAddress=document.getElementById('org-address');
    const orgCity=document.getElementById('org-city');

    // Check if the contact number is exactly 10 digits
    if (contactNumber.value.length !== 10) {
        isFormValid = false;
        contactNumber.style.border = "1px solid red";
        document.getElementById("error-message").style.display="block"
    }else {
      contactNumber.style.border = "";
      document.getElementById("error-message").style.display = "none";
    }

    // Check if the pincode is exactly 6 digits for both client and organization
    [pincode, orgPincode].forEach(pin => {
        if (pin.value.length !== 6) {
            isFormValid = false;
            pin.style.border = "1px solid red";
            document.getElementById("error-pincode").style.display="block"
        }
        else {
          pin.style.border = ""; // Reset border if input is valid
          document.getElementById("error-pincode").style.display = "none";
      }
    });

    const nameRegex = /^[a-zA-Z][a-zA-Z\s]*$/;
    if (!nameRegex.test(clientName.value.trim())) {
        isFormValid = false;
        clientName.style.border = "1px solid red";
    } else {
        clientName.style.border = "";
    }
    // organisation name
    if (!nameRegex.test(orgName.value.trim())) {
        isFormValid = false;
        orgName.style.border = "1px solid red";
    } else {
        orgName.style.border = "";
    }
// client city
    if (!nameRegex.test(clientCity.value.trim())) {
        isFormValid = false;
        clientCity.style.border = "1px solid red";
    } else {
        clientCity.style.border = "";
    }
    //org city
    if (!nameRegex.test(orgCity.value.trim())) {
        isFormValid = false;
        orgCity.style.border = "1px solid red";
    } else {
        orgCity.style.border = "";
    }
//client address
    const addressRegex = /^[a-zA-Z0-9][a-zA-Z0-9\s]*$/;
    if (!addressRegex.test(clientAddress.value.trim())) {
        isFormValid = false;
        clientAddress.style.border = "1px solid red";
    } else {
        clientAddress.style.border = "";
    }

    //contractor address
    if (!addressRegex.test(orgAddress.value.trim())) {
        isFormValid = false;
        orgAddress.style.border = "1px solid red";
    } else {
        orgAddress.style.border = "";
    }

    //org-gst
    if (!addressRegex.test(gstName.value.trim())) {
        isFormValid = false;
        gstName.style.border = "1px solid red";
    } else {
        gstName.style.border = "";
    }



    if (!isFormValid) {
        alert("Please fill out all required fields correctly.");
        return;
    }
  let text = writingArea.innerText.trim();
  let words = text.split(/\s+/).filter(word => word.length > 0);
  let wordCount = words.length;
  let secondPartySignature = document.getElementById('builder-signature').value.trim();

  if (wordCount < 80 || wordCount > 160) {
    alert("The agreement text must be between 120 and 300 words.");
    return false;
  }

  if (!secondPartySignature) {
    alert("Second party e-signature is mandatory.");
    return false;
  }

  alert("Form is submitted successfully");
  window.location.href = "../html/contractoragreementhistory.html";
  return true;
};

// Attach validateAndSubmit to submit button
document.querySelector('.submittion span').addEventListener('click', validateAndSubmit);


// Initial Settings
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

  // Initial word count check
  writingArea.dispatchEvent(new Event('input'));

  // Function calls for highlighting buttons
  // No highlights for link, unlink, lists, undo, redo since they are one-time operations
  highlighter(alignButtons, true);
  highlighter(spacingButtons, true);
  highlighter(formatButtons, false);
  highlighter(scriptButtons, true);

  // Create options for font names
  fontList.map((value) => {
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
  // execCommand executes command on selected text
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
  // If link has http then pass directly, else add https
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
      // needsRemoval = true means only one button should be highlighted, and others would be normal
      if (needsRemoval) {
        let alreadyActive = false;

        // If currently clicked button is already active
        if (button.classList.contains("active")) {
          alreadyActive = true;
        }

        // Remove highlight from other buttons
        highlighterRemover(className);
        if (!alreadyActive) {
          // Highlight clicked button
          button.classList.add("active");
        }
      } else {
        // If other buttons can be highlighted
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

window.onload = initializer();



//modal
var modal = document.getElementById("myModal");
var btn1 = document.getElementById("sample");
var span = document.getElementsByClassName("close")[0];
btn1.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}