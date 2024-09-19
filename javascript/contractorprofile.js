// Profile Picture Update
const profilePic = document.querySelector(".image img");
const userFile = document.querySelector(".file-path");

userFile.onchange = function () {
    profilePic.src = URL.createObjectURL(userFile.files[0]);
};

// Toastify Notifications
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
            window.location.href = "../html/contractororganisationdetails.html";
        });
        document.getElementById("organisation-details").addEventListener("click", () => {
            window.location.href = "../html/contractororganisationdetails.html";
        });
    }
}

saveBtn.addEventListener("click", () => {
    let requiredFields = document.querySelectorAll('input[required], select[required]');
    let isFormValid = true;

    requiredFields.forEach(function(field) {
        let isFieldValid = true;

        // Validate specific fields
        if (field.id === "mobile-number") {
            if (field.value.length !== 10) {
                isFieldValid = false;
                document.getElementById("error-message").style.display = "block";
            } else {
                document.getElementById("error-message").style.display = "none";
            }
        }

        if (field.id === "client-pincode") {
            if (field.value.length !== 6) {
                isFieldValid = false;
                document.getElementById("error-pincode").style.display = "block";
            } else {
                document.getElementById("error-pincode").style.display = "none";
            }
        }

        if (field.id === "contractor-email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isFieldValid = false;
                document.getElementById("error-email").style.display = "block";
            } else {
                document.getElementById("error-email").style.display = "none";
            }
        }

        // Aadhaar number validation
        if (field.id === "aadhaar-number") {
            const aadhaarRegex = /^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/;
            if (field.value.trim() === "" || !aadhaarRegex.test(field.value)) {
                isFieldValid = false;
                document.getElementById("error-aadhaar").style.display = "block";
            } else {
                document.getElementById("error-aadhaar").style.display = "none";
            }
        }

        if (!field.value || !isFieldValid) {
            field.style.borderColor = "red";
            isFormValid = false;
        } else {
            field.style.borderColor = "gray";
        }
    });

    if (isFormValid) {
        createToast('success', 'fa-solid fa-circle-check', 'Success', 'Your Changes have been Saved');
    } else {
        document.getElementById("next").style.cursor = 'not-allowed';
        document.getElementById("next").style.backgroundColor = "#547faa";
        document.getElementById("next").addEventListener("click", () => {
            window.location.href = "";
        });
        createToast('failed', 'fa-solid fa-triangle-exclamation', 'Failed', 'Some details are missing or incorrect');
    }
});

// Aadhaar number formatting
document.getElementById("aadhaar-number").addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3').trim();
    e.target.value = value;
});
document.getElementById('contractor-address').addEventListener('input', function(event) {
    let value = event.target.value;
            value = value.replace(/[^a-zA-Z0-9\s]/g, '');

            if (value.startsWith(' ')) {
                value = value.slice(1);
            }

            event.target.value = value;
});
document.getElementById('contractor-name').addEventListener('input', function(event) {
    let value = event.target.value;
            value = value.replace(/[^a-zA-Z\s]/g, '');

            if (value.startsWith(' ')) {
                value = value.slice(1);
            }

            event.target.value = value;
});
document.getElementById('work-experience').addEventListener('input', function(event) {
    let value = event.target.value;
            value = value.replace(/[^a-zA-Z0-9\s]/g, '');

            if (value.startsWith(' ')) {
                value = value.slice(1);
            }

            event.target.value = value;
});