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

function updateNextTd(selectElement, tdId) {
    const nextTd = document.getElementById(tdId);
    nextTd.innerHTML = ''; // Clear content initially

    if (selectElement.value === "cash") {
        nextTd.innerHTML = `
            <input type="file" name="documentUpload" id="documentUpload_${tdId}" accept="application/pdf, image/*" onchange="previewFile('${tdId}', 1)" style="display: none;">
            <div class="sideby" style="display: flex; justify-content: center; align-items: center;width: 160px;">
                <button class="upbtn" onclick="document.getElementById('documentUpload_${tdId}').click();"> <i class="fa-solid fa-upload"></i> </button>
                <div id="filePreview_${tdId}" style="margin-left: 10px;"></div>
            </div>
        `;
    } else if (selectElement.value === "online") {
        nextTd.innerHTML = `
                    <div class="sideby" style="display: flex; justify-content: center; align-items: center;width: 160px;">

            <input type="text" name="utrNumber" id="utrNumber_${tdId}" placeholder="Enter UTR Num" required style="width: 100px; border:none; outline:none;">
            <input type="file" name="documentUpload" id="documentUpload_${tdId}" accept="application/pdf, image/*" onchange="previewFile('${tdId}', 2)" style="display: none;">
            <div class="sideby" style="display: flex; justify-content: center; align-items: center;">
                <button class="upbtn" onclick="document.getElementById('documentUpload_${tdId}').click();"> <i class="fa-solid fa-upload"></i> </button>
                <div id="filePreview_${tdId}" style="margin-left: 10px;"></div>
            </div>
            </div>
        `;
    }
}

function previewFile(tdId, fieldNumber) {
    const file = document.getElementById(`documentUpload_${tdId}`).files[0];
    const preview = document.getElementById(`filePreview_${tdId}`);
    preview.innerHTML = ''; // Clear previous preview

    if (file && file.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.style.maxWidth = '20px';
        img.style.maxHeight = '20px';
        img.style.cursor = 'pointer';
        img.onclick = () => enlargePreview(img, tdId, fieldNumber);
        preview.appendChild(img);
    } else if (file && file.type === 'application/pdf') {
        const iframe = document.createElement('iframe');
        iframe.src = URL.createObjectURL(file);
        iframe.style.width = '20px';
        iframe.style.height = '20px';
        iframe.style.cursor = 'pointer';
        iframe.onclick = () => enlargePreview(iframe, tdId, fieldNumber);
        preview.appendChild(iframe);
    }
}

function enlargePreview(element, tdId, fieldNumber) {
    const overlay = document.createElement('div');
    overlay.id = `overlay_${tdId}_${fieldNumber}`;
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '1000';

    const enlargedElement = element.cloneNode();
    enlargedElement.style.maxWidth = '90%';
    enlargedElement.style.maxHeight = '90%';
    enlargedElement.style.zIndex = '1001';

    overlay.appendChild(enlargedElement);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });
}

function saveData() {
    const rows = document.querySelectorAll('.history-table tbody tr');
    let isValid = true;

    rows.forEach((row) => {
        const paymentMethodSelect = row.querySelector('select[name="paymentMethod"]');
        const paymentMethod = paymentMethodSelect.value;
        const paymentMethodTdId = paymentMethodSelect.id.replace('paymentMethod_', 'nextTd_');
        const nextTd = document.getElementById(paymentMethodTdId);
        const inputText = row.querySelector(`#utrNumber_${paymentMethodTdId}`);
        const fileInput = row.querySelector(`#documentUpload_${paymentMethodTdId}`);

        // Check if Cash or Online payment method and ensure the necessary fields are filled
        if (paymentMethod === 'cash' && (!fileInput || fileInput.files.length === 0)) {
            nextTd.style.border = '2px solid red';
            isValid = false;
        } else if (paymentMethod === 'online' && ((!fileInput || fileInput.files.length === 0) || !inputText.value)) {
            if (!inputText.value) {
                inputText.style.border = '2px solid red';
            } else {
                inputText.style.border = 'none';
            }
            if (!fileInput || fileInput.files.length === 0) {
                nextTd.style.border = '2px solid red';
            } else {
                nextTd.style.border = 'none';
            }
            isValid = false;
        } else {
            nextTd.style.border = 'none';
            if (inputText) {
                inputText.style.border = 'none';
            }
        }
    });

    if (!isValid) {
        showNotification('Please fill all the required fields.');
    } else {
        showNotification('Data saved successfully!');
        // Perform save logic here
    }
}


