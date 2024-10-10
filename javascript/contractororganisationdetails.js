//profilepic
const profilePic = document.querySelector(".image img");
const userFile = document.querySelector(".file-path");
const deleteBtn = document.getElementById("delete-btn");

userFile.onchange = function () {
  if (userFile.files.length > 0) {
    profilePic.src = URL.createObjectURL(userFile.files[0]);
    deleteBtn.style.display = "block";
  }
};

deleteBtn.onclick = function () {
  profilePic.src = "../assets/build.png";
  userFile.value = "";
  deleteBtn.style.display = "none"; 
};


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

    if (type == 'success') {
        document.getElementById("next").style.cursor = "pointer";
        document.getElementById("next").style.backgroundColor = "#286DB3";
        document.getElementById("next").addEventListener("click", () => {
        window.location.href = "../html/contractorservices.html";
        });
        document.getElementById("services").addEventListener("click",()=>{
            window.location.href = "../html/contractorservices.html";
        })
    }
}

saveBtn.addEventListener("click", () => {
    let requiredFields = document.querySelectorAll('input[required], select[required], textarea[required]');
    let isFormValid = true;

    requiredFields.forEach(function(field) {
        let isFieldValid = true;

        // Validate specific fields

        if (field.id === "client-pincode" && field.value.length !== 6) {
            isFieldValid = false;
            document.getElementById("error-pincode").style.display="block"
        }

        if (!field.value || !isFieldValid) {
            field.style.borderColor = "red";
            isFormValid = false;
        } else {
            field.style.borderColor = "gray";
            document.getElementById("error-pincode").style.display="none";

             // Reset to normal
        }
    });

    if (isFormValid) {
        createToast('success', 'fa-solid fa-circle-check', 'Success', 'Your Changes have been Saved');
    } else {
        createToast('failed', 'fa-solid fa-triangle-exclamation', 'Failed', 'Some details are missing or incorrect');
        document.getElementById("next").style.cursor='not-allowed'
        document.getElementById("next").style.backgroundColor="#547faa"
        document.getElementById("next").addEventListener("click",()=>{
            window.location.href=""
        })
    }
});
document.getElementById('organisation-name').addEventListener('input', function(event) {
    let value = event.target.value;
            value = value.replace(/[^a-zA-Z\s]/g, '');

            if (value.startsWith(' ')) {
                value = value.slice(1);
            }

            event.target.value = value;
});
document.getElementById('organisation-address').addEventListener('input', function(event) {
    let value = event.target.value;
            value = value.replace(/[^a-zA-Z0-9\s]/g, '');

            if (value.startsWith(' ')) {
                value = value.slice(1);
            }

            event.target.value = value;
});
document.getElementById('gst-number').addEventListener('input', function(event) {
    let value = event.target.value;
            value = value.replace(/[^a-zA-Z0-9\s]/g, '');

            if (value.startsWith(' ')) {
                value = value.slice(1);
            }

            event.target.value = value;
});
document.getElementById('description').addEventListener('input', function(event) {
    let value = event.target.value;
            value = value.replace(/[^a-zA-Z\s]/g, '');

            if (value.startsWith(' ')) {
                value = value.slice(1);
            }

            event.target.value = value;
});

