const orgName=document.getElementById("org")
const aboutCompany=document.querySelector(".abtcompany")
const mainAboutCompany=document.querySelector(".main-aboutcompany")
orgName.addEventListener("click",(event)=>{
    event.preventDefault()
    mainAboutCompany.style.display="block"
})
aboutCompany.addEventListener("click",(event)=>{
    event.preventDefault()
    mainAboutCompany.style.display="block"
    mainAboutCompany.scrollIntoView({behavior:"smooth"})
})

const projName=document.querySelector(".main-projects")
const project=document.querySelector(".projects")
project.addEventListener("click",(event)=>{
    event.preventDefault()
    projName.style.display="block"
    projName.scrollIntoView({behavior:"smooth"})
})

const service=document.querySelector(".service")
const serviceBlock=document.querySelector(".main-services")
service.addEventListener("click",(event)=>{
    event.preventDefault()
    serviceBlock.style.display="flex"
    serviceBlock.scrollIntoView({behavior:"smooth"})
})

const reviews=document.querySelector(".next-details .reviews")
const reviewBlock=document.querySelector(".main-review")
reviews.addEventListener("click",(event)=>{
    event.preventDefault()
    reviewBlock.style.display="block"
    reviewBlock.scrollIntoView({behavior:"smooth"})
})


// Add remove functionality to each existing service (Building & Renovation Services)
const constructionServices = document.querySelectorAll('.remove-service');
constructionServices.forEach(service => {
    service.addEventListener('click', removeService);
});

// Add remove functionality to each existing service (Finishing & Maintenance Services)
const otherServices = document.querySelectorAll('.remove-service');
otherServices.forEach(service => {
    service.addEventListener('click', removeService);
});


const review = document.getElementById("addreview");
const cancelBtn = document.querySelector(".cancel");
const allStars = document.querySelectorAll(".star .st");
const ratingValue = document.getElementById("ratingvalue");
const clickableSpans = document.querySelectorAll(".clickable-span");
const selectedSpans = new Set();
const reviewContainer = document.getElementById("reviews-container");

// Cancel review form
function cancelReview() {
    review.reset();
    resetStars();
    resetSpans();
    document.getElementById("section-review").style.display = "none";
}

// Star rating functionality
allStars.forEach((star, idx) => {
    star.addEventListener("click", function () {
        ratingValue.value = idx + 1;
        allStars.forEach((s, i) => {
            s.classList.toggle("fa-solid", i <= idx);
            s.classList.toggle("fa-regular", i > idx);
            s.classList.toggle("active", i <= idx);
        });
    });
});

// Clickable spans for review types
clickableSpans.forEach(span => {
    span.addEventListener("click", function () {
        if (selectedSpans.has(this.innerText)) {
            selectedSpans.delete(this.innerText);
            this.classList.remove("selected");
        } else {
            selectedSpans.add(this.innerText);
            this.classList.add("selected");
        }
    });
});

// Submit review
review.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("commentername").value.trim();
    const comment = document.getElementById("reviewcomments").value.trim();

    if (!ratingValue.value) {
        alert("Please select a star rating.");
        return;
    }

    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    const newReview = document.createElement("section");
    newReview.classList.add("review-item");

    const dateandTime=`<div class="date">${date} ${time}</div>`;
    const starRating = `
        <div class="rating-done">
            ${"<i class='fa-solid fa-star'></i>".repeat(ratingValue.value)}
                        

        </div>
    `;

    const selectedSpanContainer = `
        <div class="selected-spans">
            ${Array.from(selectedSpans).map(span => `<span>${span}</span>`).join("")}
        </div>
    `;

    const reviewHeader = `
        <div class="review-header">
            <div class="name">Name:${name}</div>
        </div>
    `;
    
    const commentDone = `<div class="comment-done">${comment}</div>`;
    

    newReview.innerHTML =  dateandTime+ starRating+ selectedSpanContainer +reviewHeader+ commentDone ;
    reviewContainer.appendChild(newReview);

    resetForm();
});

// Reset form
function resetForm() {
    review.reset();
    resetStars();
    resetSpans();
    document.getElementById("section-review").style.display = "none";
}

// Reset stars
function resetStars() {
    ratingValue.value = 0;
    allStars.forEach(star => {
        star.classList.replace("fa-solid", "fa-regular");
        star.classList.remove("active");
    });
}

// Reset spans
function resetSpans() {
    selectedSpans.clear();
    clickableSpans.forEach(span => {
        span.classList.remove("selected");
    });
}


// Initialize the currentIndex for each slider container
document.querySelectorAll('.slider-container').forEach(container => {
    container.currentIndex = 0;
});

// Show a specific slide based on index
function showSlide(container, index) {
    const slider = container.querySelector('.content-slider');
    const slides = slider.querySelectorAll('.slide');
    const totalSlides = slides.length;

    container.currentIndex = (index + totalSlides) % totalSlides;
    slider.style.transform = `translateX(-${container.currentIndex * 100}%)`;
}

// Go to the next slide
function nextSlide(button) {
    const container = button.closest('.slider-container');
    showSlide(container, container.currentIndex + 1);
}

// Go to the previous slide
function prevSlide(button) {
    const container = button.closest('.slider-container');
    showSlide(container, container.currentIndex - 1);
}

