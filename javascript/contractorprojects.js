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

const openModalBtn = document.querySelector(".openModalBtn");
const modal = document.getElementById("modal-add-project");
const closeModalBtn = modal.querySelector(".close");
const saveProjectBtn = modal.querySelector(".save-project");
const mainUpload = document.getElementById("main-upload");
let projectCount = 0;
const maxProjects = 5;

// toastify
let notifications = document.getElementById('notification');
let saveBtn = document.getElementById('save');

function createToast(type, icon, title, content) {
    let newToast = document.createElement('div');
    newToast.innerHTML = `<div class="toast ${type}">
        <i class="${icon}"></i>
        <div class="content">
            <p class="title">${title}</p>
            <p class="content">${content}</p>
        </div>
        <span onclick="(this.parentElement).remove()">&#215;</span>
    </div>`;
    notifications.appendChild(newToast);
    newToast.timeOut = setTimeout(() => newToast.remove(), 5000);

    if (type === 'success') {
        document.getElementById("next").style.cursor = "pointer";
        document.getElementById("next").style.backgroundColor = "#286DB3";
        document.getElementById("next").addEventListener("click", () => {
            window.location.href = "../html/contractorleadpackageplans.html";
        });
        document.getElementById("services").addEventListener("click", () => {
            window.location.href = "../html/contractorleadpackageplans.html";
        });
    }
}

saveBtn.addEventListener("click", () => {
    if (projectCount > 0) {
        createToast('success', 'fa-solid fa-circle-check', 'Success', `You have successfully added ${projectCount} project(s).`);
    } else {
        createToast('failed', 'fa-solid fa-triangle-exclamation', 'Failed', 'Atleast one project need to be added.');
        document.getElementById("next").style.cursor = 'not-allowed';
        document.getElementById("next").style.backgroundColor = "#547faa";
        document.getElementById("next").addEventListener("click", () => {
            window.location.href = "";
        });
    }
});

openModalBtn.addEventListener("click", () => {
    if (projectCount >= maxProjects) {
        showNotification("Upload limit exceeded. You cannot add more than 5 projects.");
    } else {
        // Clear all input fields and reset previews before opening the modal
        document.getElementById("project-name").value = "";
        document.getElementById("project-location").value = "";
        document.getElementById("project-area").value = "";
        document.getElementById("project-image").value = "";
        document.getElementById("img-preview").style.display = "none";
        document.getElementById("remove-image").style.display = "none";
        document.getElementById("project-video").value = "";
        document.getElementById("video-preview").style.display = "none";
        document.getElementById("remove-video").style.display = "none";

        // Open the modal
        modal.style.display = "block";
    }
});

closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

document.getElementById("project-image").addEventListener("change", function () {
    const imgPreview = document.getElementById("img-preview");
    const removeImage = document.getElementById("remove-image");
    const file = this.files[0];

    if (file && file.type.startsWith("image/")) {
        imgPreview.src = URL.createObjectURL(file);
        imgPreview.style.display = "block";
        removeImage.style.display = "block";
    } else {
        showNotification("Please upload a valid image file.");
        this.value = "";  // Clear the invalid file
    }
});

document.getElementById("remove-image").addEventListener("click", function () {
    document.getElementById("project-image").value = "";
    document.getElementById("img-preview").style.display = "none";
    this.style.display = "none";
});

document.getElementById("project-video").addEventListener("change", function () {
    const vidPreview = document.getElementById("video-preview");
    const removeVideo = document.getElementById("remove-video");
    const file = this.files[0];

    if (file && file.type.startsWith("video/")) {
        vidPreview.src = URL.createObjectURL(file);
        vidPreview.style.display = "block";
        removeVideo.style.display = "block";
    } else {
        showNotification("Please upload a valid video file.");
        this.value = "";  // Clear the invalid file
    }
});

document.getElementById("remove-video").addEventListener("click", function () {
    document.getElementById("project-video").value = "";
    document.getElementById("video-preview").style.display = "none";
    this.style.display = "none";
});

let rowToDelete = null; // Holds the reference to the project card to be deleted

saveProjectBtn.addEventListener("click", () => {
    const projName = document.getElementById("project-name").value;
    const projLoc = document.getElementById("project-location").value;
    const projArea = document.getElementById("project-area").value;
    const projImage = document.getElementById("project-image").files[0];
    const projVideo = document.getElementById("project-video").files[0];

    if (projName && projLoc && projArea && projImage && projVideo && projectCount < maxProjects) {
        const projectCard = document.createElement("div");
        projectCard.className = "project-card";

        const nameElem = document.createElement("p");
        nameElem.textContent = `Name: ${projName}`;
        const locElem = document.createElement("p");
        locElem.textContent = `Location: ${projLoc}`;
        const areaElem = document.createElement("p");
        areaElem.textContent = `Area: ${projArea}`;

        const imgElem = document.createElement("img");
        imgElem.src = URL.createObjectURL(projImage);

        const vidElem = document.createElement("video");
        vidElem.src = URL.createObjectURL(projVideo);
        vidElem.controls = true;

        // Add delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete Project";
        deleteBtn.classList.add("btn", "btn-danger");

        deleteBtn.addEventListener("click", () => {
            rowToDelete = projectCard; // Store the project card reference for deletion
            
            // Show the delete popup
            const popup = document.getElementById('deletePopup');
            popup.classList.add('show');
        });

        projectCard.appendChild(nameElem);
        projectCard.appendChild(locElem);
        projectCard.appendChild(areaElem);
        projectCard.appendChild(imgElem);
        projectCard.appendChild(vidElem);
        projectCard.appendChild(deleteBtn);

        mainUpload.appendChild(projectCard);

        projectCount++;
        modal.style.display = "none";

        // Reset modal inputs after saving
        document.getElementById("project-name").value = "";
        document.getElementById("project-location").value = "";
        document.getElementById("project-area").value = "";
        document.getElementById("project-image").value = "";
        document.getElementById("img-preview").style.display = "none";
        document.getElementById("remove-image").style.display = "none";
        document.getElementById("project-video").value = "";
        document.getElementById("video-preview").style.display = "none";
        document.getElementById("remove-video").style.display = "none";

    } else {
        showNotification("Please fill in all details.");
    }
});

// Event listener for Confirm Delete button
document.getElementById('confirmDelete').onclick = function () {
    if (rowToDelete) {
        mainUpload.removeChild(rowToDelete); // Remove the project card
        rowToDelete = null; // Clear reference
        projectCount--;
    }
    closePopup();
};

// Event listener for Cancel Delete button
document.getElementById('cancelDelete').onclick = function () {
    rowToDelete = null; // Clear reference
    closePopup();
};

// Function to close the popup
function closePopup() {
    const popup = document.getElementById('deletePopup');
    popup.classList.remove('show');
}


// Close modal when clicking outside of it
window.addEventListener("click", (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});
