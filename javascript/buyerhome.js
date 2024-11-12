const profile = document.getElementById("toggleProfile");
const profileview = document.querySelector(".main-profileview");

profile.addEventListener("click", () => {
    // Toggle the display of the profile view
    if (profileview.style.display === "none" || profileview.style.display === "") {
        profileview.style.display = "block";
    } else {
        profileview.style.display = "none";
    }
});
// property type
document.getElementById("proptype").addEventListener("click", (event) => {
    event.stopPropagation();

    let price = document.querySelector(".main-property-type");
    if (getComputedStyle(price).display === "none") {
        price.style.display = "flex";
        document.querySelector(".main-price-range").style.display = "none";
    } else {
        price.style.display = "none";
    }
});

document.addEventListener("click", (event) => {
    let price = document.querySelector(".main-property-type");
    let priceRange = document.querySelector(".main-price-range");
    let propTypeButton = document.getElementById("proptype");

    if (!price.contains(event.target) && !propTypeButton.contains(event.target) && !priceRange.contains(event.target)) {
        price.style.display = "none";
    }
});

function toggleCheckboxes(checkboxesId, headingElement) {
    const checkboxes = document.getElementById(checkboxesId);
    const icon = headingElement.querySelector('.icon');

    checkboxes.classList.toggle('visible');
    icon.classList.toggle('rotate');
}

function updateSelections() {
    const selectedList = document.getElementById('selectedList');
    selectedList.innerHTML = '';

    const checkboxes = document.querySelectorAll('.property-check input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const li = document.createElement('li');
            li.textContent = checkbox.labels[0].textContent;
            li.onclick = function(event) {
                event.stopPropagation();
                checkbox.checked = false;
                updateSelections();
            };
            const wrongMark = document.createElement('span');
            wrongMark.className = 'material-symbols-rounded crossicon';
            wrongMark.textContent = 'close';

            wrongMark.onclick = function(event) {
                event.stopPropagation();
                checkbox.checked = false;
                updateSelections();
            };

            li.appendChild(wrongMark);
            selectedList.appendChild(li);
            document.getElementById("property-input").style.display = "none";
        }
    });
}

// location
document.addEventListener('DOMContentLoaded', () => {
    const inputContainer = document.getElementById('input-container');

    // Function to create a new input
    function createNewInput() {
        const inputs = document.querySelectorAll('.location-input');

        // Check if there are already 3 inputs
        if (inputs.length < 3) {
            const newInputWrapper = document.createElement('div');
            newInputWrapper.className = 'input-wrapper2';

            const newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.placeholder = 'Enter Location';
            newInput.className = 'location-input';

            const removeButton = document.createElement('button');
            removeButton.className = 'remove-input';
            removeButton.innerHTML = '&times;';
            removeButton.setAttribute('aria-label', 'Remove input');

            // Append the input and button to the wrapper
            newInputWrapper.appendChild(newInput);
            newInputWrapper.appendChild(removeButton);
            inputContainer.appendChild(newInputWrapper);

            // Add event listeners
            newInput.addEventListener('focus', () => {
                newInput.addEventListener('input', handleInput);
            });

            removeButton.addEventListener('click', () => {
                inputContainer.removeChild(newInputWrapper);
            });
        }
    }

    // Handle input event
    function handleInput(event) {
        if (event.target.value) {
            createNewInput();
            event.target.removeEventListener('input', handleInput); // Prevent multiple inputs
        }
    }

    // Initial event listener for the first input
    const firstInput = document.querySelector('.location-input');
    firstInput.addEventListener('focus', () => {
        firstInput.addEventListener('input', handleInput);
    });
});


// budget price range
document.getElementById("budget").addEventListener("click", (e) => {
    let price = document.querySelector(".main-price-range");
    let propertyType = document.querySelector(".main-property-type");

    if (getComputedStyle(price).display === "none") {
        price.style.display = "flex";
        propertyType.style.display = "none";
    } else {
        price.style.display = "none"; 
    }

    e.stopPropagation();
});

document.addEventListener("click", (e) => {
    let price = document.querySelector(".main-price-range");
    let budgetButton = document.getElementById("budget");

    if (!price.contains(e.target) && e.target !== budgetButton) {
        price.style.display = "none"; 
    }
});

const minRangeSlider = document.getElementById("min-range");
const maxRangeSlider = document.getElementById("max-range");
const minValueDisplay = document.getElementById("min-value");
const maxValueDisplay = document.getElementById("max-value");

function formatValue(value) {
    let croreValue = value / 10000000;
    return value >= 30000000 ? '₹ 3Cr+' : `₹ ${croreValue.toFixed(2)}Cr`;
}

minRangeSlider.addEventListener("input", function() {
    let minValue = parseInt(minRangeSlider.value);
    let maxValue = parseInt(maxRangeSlider.value);

    if (minValue >= maxValue) {
        minRangeSlider.value = maxValue - 5000000;  // Ensure min value doesn't exceed max
    }
    minValueDisplay.textContent = formatValue(minRangeSlider.value);
});

maxRangeSlider.addEventListener("input", function() {
    let minValue = parseInt(minRangeSlider.value);
    let maxValue = parseInt(maxRangeSlider.value);

    if (maxValue <= minValue) {
        maxRangeSlider.value = minValue + 5000000;  // Ensure max value doesn't go below min
    }
    maxValueDisplay.textContent = formatValue(maxRangeSlider.value);
});

// FAQ
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
const propertyItems = document.querySelectorAll('.property-names,#my-location,.searchicon');

propertyItems.forEach(item => {
    item.addEventListener('click', () => {
        window.location.href = '../html/buyerlist.html'; 
    });
});

document.querySelector(".shortlisted").addEventListener("click",()=>{
    window.location.href="../html/buyershorlisted.html"
})
