    // Function to remove leading spaces but allow text, numbers, special characters, and spaces between the text
    function preventLeadingSpaces(input) {
        input.value = input.value.replace(/^\s+/, ''); // Remove leading spaces
    }

    // Attach event listeners to the fields for validation (Site Name, Building Type, Location, Note)
    const fieldsToValidate = ['name', 'buildingname', 'loaction', 'desp'];

    fieldsToValidate.forEach(function(fieldId) {
        var field = document.getElementById(fieldId);
        field.addEventListener('input', function() {
            preventLeadingSpaces(field);
            if (field.value.trim() !== '') {
                field.style.border = ''; // Remove red border when input is valid
            } else {
                field.style.border = '1px solid red'; // Add red border when input is invalid
            }
        });
    });

    // Submit button validation logic
    document.getElementById('submitBtn').addEventListener('click', function () {
        let allFilled = true;
        var dropdown = document.getElementById('timeOfDay');
        var fileInput = document.getElementById('fileInput');
        var videoInput = document.getElementById('videoInput');

        // Validate Site Name, Building Type, Location, and Note
        fieldsToValidate.forEach(function(fieldId) {
            var field = document.getElementById(fieldId);
            field.style.border = ''; // Clear any previous border color
            if (field.value.trim() === '') {
                field.style.border = '1px solid red'; // Add red border for empty fields
                allFilled = false;
            }
        });

        // Validate dropdown
        if (dropdown.value === "Select") {
            dropdown.style.border = '1px solid red'; // Add red border for unselected dropdown
            allFilled = false;
        } else {
            dropdown.style.border = ''; // Clear red border if dropdown is selected
        }

        // Validate image upload (at least one image should be uploaded)
        if (fileInput.files.length === 0) {
            document.getElementById('fileDropArea').style.border = '1px solid red'; // Add red border for no image upload
            allFilled = false;
        } else {
            document.getElementById('fileDropArea').style.border = ''; // Clear red border if image is uploaded
        }

        // Validate video upload (at least one video should be uploaded)
        if (videoInput.files.length === 0) {
            document.getElementById('videoDropArea').style.border = '1px solid red'; // Add red border for no video upload
            allFilled = false;
        } else {
            document.getElementById('videoDropArea').style.border = ''; // Clear red border if video is uploaded
        }

        if (allFilled) {
            alert('Form Submitted Successfully');
            // Redirect logic here
            window.location.href = "../html/contractorworkstatushistory.html"; 

        } else {
            alert('Please fill out all required fields with valid data.');
        }
    });

    // Image and video handling logic
    document.addEventListener('DOMContentLoaded', () => {
        // Image Handling
        const fileDropArea = document.getElementById('fileDropArea');
        const fileInput = document.getElementById('fileInput');
        const filePreview = document.getElementById('filePreview');
        const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes

        fileDropArea.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', (event) => handleFiles(event.target.files));

        fileDropArea.addEventListener('dragover', (event) => {
            event.preventDefault();
            fileDropArea.classList.add('drag-over');
        });

        fileDropArea.addEventListener('dragleave', () => fileDropArea.classList.remove('drag-over'));

        fileDropArea.addEventListener('drop', (event) => {
            event.preventDefault();
            fileDropArea.classList.remove('drag-over');
            handleFiles(event.dataTransfer.files);
        });

        function handleFiles(files) {
            const currentImageCount = filePreview.querySelectorAll('img').length;
            if (currentImageCount + files.length > 3) {
                alert('You can only upload a maximum of 3 images.');
                return;
            }

            Array.from(files).forEach(file => {
                if (file.size > maxFileSize) {
                    alert(`File size exceeds 5MB: ${file.name}`);
                } else if (file.type === 'image/jpeg' || file.type === 'image/png') {
                    const img = document.createElement('img');
                    img.src = URL.createObjectURL(file);
                    img.onload = () => URL.revokeObjectURL(img.src); // free memory
                    filePreview.appendChild(img);
                } else {
                    alert('Only JPG, JPEG, and PNG images are allowed!');
                }
            });
        }

        // Video Handling
        const videoDropArea = document.getElementById('videoDropArea');
        const videoInput = document.getElementById('videoInput');
        const videoPreview = document.getElementById('videoPreview');
        const maxTotalFileSize = 10 * 1024 * 1024; // 10MB in bytes
        const maxFileCount = 2;

        videoDropArea.addEventListener('click', () => videoInput.click());

        videoInput.addEventListener('change', (event) => handleVideos(event.target.files));

        videoDropArea.addEventListener('dragover', (event) => {
            event.preventDefault();
            videoDropArea.classList.add('drag-over');
        });

        videoDropArea.addEventListener('dragleave', () => videoDropArea.classList.remove('drag-over'));

        videoDropArea.addEventListener('drop', (event) => {
            event.preventDefault();
            videoDropArea.classList.remove('drag-over');
            handleVideos(event.dataTransfer.files);
        });

        function handleVideos(files) {
            const currentVideoCount = videoPreview.querySelectorAll('video').length;
            let totalUploadedSize = Array.from(videoPreview.querySelectorAll('video'))
                                          .reduce((acc, video) => acc + video.fileSize, 0);

            if (currentVideoCount + files.length > maxFileCount) {
                alert(`You can only upload a maximum of ${maxFileCount} videos.`);
                return;
            }

            Array.from(files).forEach(file => {
                if (totalUploadedSize + file.size > maxTotalFileSize) {
                    alert(`Total file size exceeds 10MB. Please upload smaller videos.`);
                } else if (file.type === 'video/mp4' || file.type === 'video/avi' || file.type === 'video/mov') {
                    const video = document.createElement('video');
                    video.src = URL.createObjectURL(file);
                    video.controls = true;
                    video.fileSize = file.size; // Store the file size on the video element
                    videoPreview.appendChild(video);
                    totalUploadedSize += file.size;
                } else {
                    alert('Only MP4, AVI, and MOV videos are allowed!');
                }
            });
        }
    });
