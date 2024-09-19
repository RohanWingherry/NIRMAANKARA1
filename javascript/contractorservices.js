document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("modal");
    const addOthersButtons = document.querySelectorAll(".add-others");
    const closeModal = document.querySelector(".close");
    const saveLabelButton = document.getElementById("save-label");
    const modalLabelInput = document.getElementById("modal-label");

    // Function to open the modal
    addOthersButtons.forEach(button => {
        button.addEventListener("click", () => {
            modal.style.display = "block";
        });
    });

    // Function to close the modal
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Function to save the label and add it to the section
    saveLabelButton.addEventListener("click", () => {
        const labelText = modalLabelInput.value.trim();
        if (labelText !== "") {
            const newSection = document.createElement("section");
            newSection.className="new-section"
            newSection.innerHTML = `
                <span class="material-symbols-rounded">settings</span>
                <div class="checkoxes">
                    <input type="checkbox" checked id="${labelText.toLowerCase().replace(/\s+/g, '-')}" class="check">
                    <label for="${labelText.toLowerCase().replace(/\s+/g, '-')}">${labelText}</label>
                </div>
            `;

            // Add the new section before the last "Add Others" section
            const servicesDiv = document.querySelector(".services");
            servicesDiv.insertBefore(newSection, servicesDiv.lastElementChild);

            // Clear the input and close the modal
            modalLabelInput.value = "";
            modal.style.display = "none";
        }
    });

    // Close the modal if the user clicks outside of it
    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    // checkbox color
    function attachCheckboxEvent(checkbox) {
        checkbox.addEventListener('change', (event) => {
            const section = event.target.closest('section');
            const label=event.target.nextElementSibling;
            const icon=section.querySelector('.material-symbols-rounded')
            if (event.target.checked) {
                section.style.backgroundColor = '#286DB3';
                label.style.color='white';
                icon.style.color='#286DB3';
                icon.style.backgroundColor='white'
                
            } else {
                section.style.backgroundColor = ''; 
                label.style.color='';
                icon.style.color='';
                icon.style.backgroundColor='';
            }
        });

    }

    // Attach event listeners to all existing checkboxes
    document.querySelectorAll('.check').forEach(attachCheckboxEvent);

    // Save button click event
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
            window.location.href = "../html/contractorprojects.html";
        });
        document.getElementById("project").addEventListener("click", () => {
            window.location.href = "../html/contractorprojects.html";
        });
    }
}
    saveBtn.addEventListener('click', () => {
        const checkboxes = document.querySelectorAll('.check');
        let isChecked = false;

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                isChecked = true;
            }
        });

        if (isChecked) {
            createToast('success', 'fa-solid fa-circle-check', 'Success', 'Your Changes have been Saved');
        } else {
            createToast('failed', 'fa-solid fa-triangle-exclamation', 'Failed', 'atleast one service should be selected');        }
    });
});

