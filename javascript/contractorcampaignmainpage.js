const imageUpload = document.getElementById('imageUpload');
const videoUpload = document.getElementById('videoUpload');
const imagePreview = document.getElementById('imagePreview');
const videoPreview = document.getElementById('videoPreview');
const submitButton = document.getElementById('submitButton');
const orgDetailsForm = document.getElementById('orgDetailsForm');

const maxImages = 5;
const maxVideos = 3;

imageUpload.addEventListener('change', function () {
    const totalImages = imagePreview.childElementCount + imageUpload.files.length;

    if (totalImages > maxImages) {
        alert('You can upload a maximum of ${maxImages} images.');
        imageUpload.value = ''; // Clear the input
        return;
    }

    for (let file of imageUpload.files) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const previewContainer = document.createElement('div');
            previewContainer.classList.add('preview-container');
            
            const imgElement = document.createElement('img');
            imgElement.src = e.target.result;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.textContent = 'X';
            deleteBtn.addEventListener('click', function () {
                previewContainer.remove();
            });

            previewContainer.appendChild(imgElement);
            previewContainer.appendChild(deleteBtn);
            imagePreview.appendChild(previewContainer);
        }
        reader.readAsDataURL(file);
    }
});

videoUpload.addEventListener('change', function () {
    const totalVideos = videoPreview.childElementCount + videoUpload.files.length;

    if (totalVideos > maxVideos) {
        alert('You can upload a maximum of ${maxVideos} videos.');
        videoUpload.value = ''; // Clear the input
        return;
    }

    for (let file of videoUpload.files) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const previewContainer = document.createElement('div');
            previewContainer.classList.add('preview-container');
            
            const videoElement = document.createElement('video');
            videoElement.src = e.target.result;
            videoElement.controls = true;

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.textContent = 'X';
            deleteBtn.addEventListener('click', function () {
                previewContainer.remove();
            });

            previewContainer.appendChild(videoElement);
            previewContainer.appendChild(deleteBtn);
            videoPreview.appendChild(previewContainer);
        }
        reader.readAsDataURL(file);
    }
});

submitButton.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent form submission to handle validation

    let isValid = true;

    // Clear previous highlights
    const formGroups = document.querySelectorAll('.form-group input, .form-group select');
    formGroups.forEach(group => group.style.border = '');

    // Validate each field
    formGroups.forEach(group => {
        if (!group.value) {
            group.style.border = '1px solid red';
            isValid = false;
        }
    });

    const totalImages = imagePreview.childElementCount;
    const totalVideos = videoPreview.childElementCount;

    if (totalImages === 0 && totalVideos === 0) {
        alert('Please upload at least one image or video before submitting.');
        isValid = false;
    }

    if (isValid) {
        alert('Submission Successful');
        window.location.href="../html/contractorcampaignpackage1.html"
    }
    else{
        alert("Fill all the details")
    }
});
document.getElementById('proj-name').addEventListener('input', function(event) {
    let value = event.target.value;
            value = value.replace(/[^a-zA-Z\s]/g, '');

            if (value.startsWith(' ')) {
                value = value.slice(1);
            }

            event.target.value = value;
});
document.getElementById('proj-loc').addEventListener('input', function(event) {
    event.target.value = event.target.value.replace(/[^a-zA-Z]/g, '');
});
document.getElementById('project-cost').addEventListener('input', function(event) {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
});
document.getElementById('proj-area').addEventListener('input', function(event) {
    event.target.value = event.target.value.replace(/[^0-9]/g, '');
});