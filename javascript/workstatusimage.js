document.addEventListener('DOMContentLoaded', () => {
    const maxFileSize = 5 * 1024 * 1024; // 5MB for images and videos
    const videoMaxFileSize = 5 * 1024 * 1024; // 5MB for individual videos

    // Image upload sections
    const fileDropAreas = [
        document.getElementById('fileDropArea1'),
        document.getElementById('fileDropArea2'),
        document.getElementById('fileDropArea3')
    ];
    const fileInputs = [
        document.getElementById('fileInput1'),
        document.getElementById('fileInput2'),
        document.getElementById('fileInput3')
    ];
    const filePreviews = [
        document.getElementById('filePreview1'),
        document.getElementById('filePreview2'),
        document.getElementById('filePreview3')
    ];

    // Video upload sections
    const videoDropAreas = [
        document.getElementById('videoDropArea1'),
        document.getElementById('videoDropArea2')
    ];
    const videoInputs = [
        document.getElementById('videoInput1'),
        document.getElementById('videoInput2')
    ];
    const videoPreviews = [
        document.getElementById('videoPreview1'),
        document.getElementById('videoPreview2')
    ];

    // Handle image uploads
    fileDropAreas.forEach((fileDropArea, index) => {
        fileDropArea.addEventListener('click', () => fileInputs[index].click());
        fileInputs[index].addEventListener('change', (event) => handleImageFiles(event.target.files, index));

        fileDropArea.addEventListener('dragover', (event) => {
            event.preventDefault();
            fileDropArea.classList.add('drag-over');
        });

        fileDropArea.addEventListener('dragleave', () => fileDropArea.classList.remove('drag-over'));

        fileDropArea.addEventListener('drop', (event) => {
            event.preventDefault();
            fileDropArea.classList.remove('drag-over');
            handleImageFiles(event.dataTransfer.files, index);
        });
    });

    // Handle image files
    function handleImageFiles(files, index) {
        if (files.length > 1) {
            alert('You can only upload one image per section.');
            return;
        }

        Array.from(files).forEach(file => {
            if (file.size > maxFileSize) {
                alert(`File size exceeds 5MB: ${file.name}`);
            } else if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                img.onload = () => URL.revokeObjectURL(img.src);
                filePreviews[index].innerHTML = '';
                filePreviews[index].appendChild(img);
            } else {
                alert('Only JPEG, PNG, and JPG image formats are allowed!');
            }
        });
    }

    // Handle video uploads
    videoDropAreas.forEach((videoDropArea, index) => {
        videoDropArea.addEventListener('click', () => videoInputs[index].click());
        videoInputs[index].addEventListener('change', (event) => handleVideoFiles(event.target.files, index));

        videoDropArea.addEventListener('dragover', (event) => {
            event.preventDefault();
            videoDropArea.classList.add('drag-over');
        });

        videoDropArea.addEventListener('dragleave', () => videoDropArea.classList.remove('drag-over'));

        videoDropArea.addEventListener('drop', (event) => {
            event.preventDefault();
            videoDropArea.classList.remove('drag-over');
            handleVideoFiles(event.dataTransfer.files, index);
        });
    });

    // Handle video files
    function handleVideoFiles(files, index) {
        if (files.length > 1) {
            alert('You can only upload one video per section.');
            return;
        }

        Array.from(files).forEach(file => {
            if (file.size > videoMaxFileSize) {
                alert(`Video file size exceeds 5MB: ${file.name}`);
            } else if (file.type === 'video/mp4' || file.type === 'video/avi' || file.type === 'video/mov') {
                const video = document.createElement('video');
                video.src = URL.createObjectURL(file);
                video.controls = true;
                video.onload = () => URL.revokeObjectURL(video.src);
                videoPreviews[index].innerHTML = '';
                videoPreviews[index].appendChild(video);
            } else {
                alert('Only MP4, AVI, and MOV video formats are allowed!');
            }
        });
    }

    // Validation before form submission
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.addEventListener('click', (event) => {
        let valid = true;

        // Check Time of Day
        const timeOfDay = document.getElementById('timeOfDay');
        if (timeOfDay.value === 'Select') {
            valid = false;
            timeOfDay.style.border = '1px solid red';
        } else {
            timeOfDay.style.border = '';
        }

        // Check Note
        const note = document.getElementById('desp');
        if (note.value.trim() === '') {
            valid = false;
            note.style.border = '1px solid red';
        } else {
            note.style.border = '';
        }

        // Check Customer ID
        const customerId = document.getElementById('customer-id');
        if (customerId.value.trim() === '') {
            valid = false;
            customerId.style.border = '1px solid red';
        } else {
            customerId.style.border = '';
        }

        const imageUploaded = filePreviews.some(preview => preview.innerHTML !== '');
        if (!imageUploaded) {
            valid = false;
        }

        // Check if at least one video is uploaded
        const videoUploaded = videoPreviews.some(preview => preview.innerHTML !== '');
        if (!videoUploaded) {
            valid = false;
        }

        // If validation fails, show alert with error message
        if (!valid) {
            event.preventDefault();
            alert("Fill all the required fields and upload alteast one video and one image"); // Display all error messages at once
        }
        else{
            alert("Form Submitted Successfully")
            window.location.href="../html/contractorworkstatushistory.html"
        }
    });
});
document.getElementById("fetch-details").addEventListener("click", () => {
    const cust = document.getElementById("customer-id").value;
    if (cust) {
        document.querySelector(".main-client-det").style.display = "block";
    } else {
        alert("Enter the Customer ID");
    }
});
const dateInput = document.getElementById('dateInput');
const today = new Date().toISOString().split('T')[0]; 
dateInput.value = today;
dateInput.style.textAlign = 'center';
