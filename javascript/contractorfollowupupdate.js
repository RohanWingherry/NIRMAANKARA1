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

document.addEventListener("DOMContentLoaded", function () {
    const record = JSON.parse(localStorage.getItem('record'));

    const today = new Date().toISOString().split('T')[0]; 

    const dateInput = document.getElementById('date');
    dateInput.min = today;
    dateInput.max = today;

    if (record) {
        document.getElementById('sno').value = record.sno;
        document.getElementById('date').value = formatDateToInput(record.date) || today;  
        document.getElementById('customerName').value = record.customerName;
        document.getElementById('customerMob').value = record.customerMob;
        document.getElementById('contactMethod').value = record.contactMethod;
        document.getElementById('clientStatus').value=record.clientStatus;
        document.getElementById('status').value = record.status;
    } else {
        dateInput.value = today;  
    }

    document.getElementById('save').addEventListener('click', function (e) {
        e.preventDefault();

        const sno = document.getElementById('sno').value;
        const date = document.getElementById('date').value;
        const customerName = document.getElementById('customerName').value;
        const customerMob = document.getElementById('customerMob').value;
        const contactMethod = document.getElementById('contactMethod').value;
        const clientStatus=document.getElementById('clientStatus').value;
        const status = document.getElementById('status').value;
        
        const isConductedSelected = document.getElementById('conducted').checked;
        const isNotConductedSelected = document.getElementById('notconducted').checked;

        if (!sno || !date || !customerName || !customerMob ||!clientStatus || !contactMethod || !status) {
            showNotification("All fields are mandatory. Please fill out all fields.");
            return;
        }

        if (date !== today) {
            showNotification("The date must be today's date.");
            return;
        }
        
        if (!isConductedSelected && !isNotConductedSelected) {
            showNotification("Please select whether the action was conducted or not.");
            return;
        }

        const updatedRecord = {
            sno: sno,
            date: formatDateToDisplay(date),  
            customerName: customerName,
            customerMob: customerMob,
            contactMethod: contactMethod,
            clientStatus:clientStatus,
            status: status
        };

        localStorage.setItem('updatedRecord', JSON.stringify(updatedRecord));
        window.location.href = '../html/contractorfollowuphistory.html';
    });

    document.getElementById('conducted').addEventListener('change', function () {
        if (this.checked) {
            document.getElementById('status').value = 'Success';
        }
    });

    document.getElementById('notconducted').addEventListener('change', function () {
        if (this.checked) {
            document.getElementById('status').value = 'Closed';
        }
    });
});

function formatDateToInput(dateString) {
    const [day, month, year] = dateString.split("-");
    return `${year}-${month}-${day}`;
}

function formatDateToDisplay(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
}
