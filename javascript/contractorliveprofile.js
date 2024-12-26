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


//Review
const review = document.getElementById("addreview");

function closeReview() {
    review.style.display = 'flex';
}
const cancel=document.querySelector(".cancel")
 cancel.addEventListener('click',(event)=>{
    event.preventDefault()
    review.style.display='none'
 })


const allStars = document.querySelectorAll('.star .st');
const ratingValue = document.getElementById('ratingvalue');
allStars.forEach((item, idx) => {
    item.addEventListener('click', function () {
        let click = 0;
        ratingValue.value = idx + 1;
        allStars.forEach(i => {
            // i.classList.replace('fa-solid', 'fa-regular');
            i.classList.remove('active');
        });
        for (let i = 0; i < allStars.length; i++)
            if (i <= idx) {
                // allStars[i].classList.replace('fa-regular', 'fa-solid');
                allStars[i].classList.add('active');
            } else {
                allStars[i].style.setProperty('--i', click);
                click++;
            }
    });
});

const selectedSpans = new Set();
const clickableSpans = document.querySelectorAll('.clickable-span');
clickableSpans.forEach(span => {
    span.addEventListener('click', function () {
        if (selectedSpans.has(this.innerText)) {
            selectedSpans.delete(this.innerText);
            this.classList.remove('selected');
        } else {
            selectedSpans.add(this.innerText);
            this.classList.add('selected');
        }
    });
});

document.getElementById('addreview').addEventListener('submit', function (event) {
    event.preventDefault();
    const display = document.getElementById('rating-sections');
    display.style.display = 'block';

    const name = document.getElementById('commentername').value;
    const comment = document.getElementById('reviewcomments').value;
    const reviewContainer = document.getElementById('reviews-container');
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    const newReview = document.createElement('div');
    newReview.classList.add('review-item');

    const reviewHeader = document.createElement('div');
    reviewHeader.classList.add('review-header');

    const reviewerName = document.createElement('div');
    reviewerName.classList.add('name');
    reviewerName.textContent = name;

    const reviewDate = document.createElement('div');
    reviewDate.classList.add('date');
    reviewDate.textContent = `${date} ${time}`;

    reviewHeader.appendChild(reviewerName);
    reviewHeader.appendChild(reviewDate);

    const StarRating = document.createElement('div');
    StarRating.classList.add('rating-done');
    let Stars = '';
    for (let i = 0; i < ratingValue.value; i++) {
        Stars += `<i class="fa-solid fa-star"></i>`;
    }
    StarRating.innerHTML = Stars;

    const commentDone = document.createElement('div');
    commentDone.classList.add('comment-done');
    commentDone.textContent = comment;

    const selectedSpanContainer = document.createElement('div');
    selectedSpanContainer.classList.add('selected-spans');
    selectedSpans.forEach(spanText => {
        const spanItem = document.createElement('span');
        spanItem.textContent = spanText;
        selectedSpanContainer.appendChild(spanItem);
    });

    newReview.appendChild(reviewHeader);
    newReview.appendChild(StarRating);
    newReview.appendChild(commentDone);
    newReview.appendChild(selectedSpanContainer);

    reviewContainer.appendChild(newReview);

    document.getElementById('commentername').value = '';
    document.getElementById('reviewcomments').value = '';
    ratingValue.value = 0;
    allStars.forEach(i => {
        i.classList.replace('fa-solid', 'fa-regular');
        i.classList.remove('active');
    });
    selectedSpans.clear();
    clickableSpans.forEach(span => {
        span.classList.remove('selected');
    });
    closeReview();
});

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

