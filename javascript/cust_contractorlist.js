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
