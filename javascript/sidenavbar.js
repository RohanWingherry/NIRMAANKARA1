let btn = document.querySelector("#btn");
let sidebar = document.querySelector(".sidebar");
let mobileBtn = document.querySelector("#mobile-btn");

btn.onclick = function() {
    toggleSidebar();
};

mobileBtn.onclick = function() {
    toggleSidebar();
};

function toggleSidebar() {
    sidebar.classList.toggle('active');

    // Toggle between hamburger and cross icons
    if (sidebar.classList.contains('active')) {
        btn.classList.remove('fa-bars');
        btn.classList.add('fa-times');
        mobileBtn.classList.remove('fa-bars');
        mobileBtn.classList.add('fa-times');
    } else {
        btn.classList.remove('fa-times');
        btn.classList.add('fa-bars');
        mobileBtn.classList.remove('fa-times');
        mobileBtn.classList.add('fa-bars');
    }
}

const profile = document.getElementById("toggleProfile");
const profileview = document.querySelector(".main-profileview");

profile.addEventListener("click", () => {
    // Toggle the display of the profile view
    if (profileview.style.display === "none" || profileview.style.display === "") {
        profileview.style.display = "block";
    } else {
        profileview.style.display = "none";
    }
});

window.addEventListener("click", (e) => {
    // Close the profile view when clicking outside of it
    if (profileview.style.display === "block" && !profileview.contains(e.target) && e.target !== profile) {
        profileview.style.display = "none";
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const notifications = document.querySelectorAll('.single-block');

    notifications.forEach(notification => {
        notification.addEventListener('click', (event) => {
            event.preventDefault();
            
            console.log('Notification clicked:', notification.id);
            
            const id = notification.id;
            const redDot = notification.querySelector('.red-dot');
            
            if (redDot) {
                console.log('Red dot found:', redDot);
                redDot.style.display = 'none';
                redDot.classList.add("hidden");
            } else {
                console.log('No red dot found');
            }

            switch (id) {
                case 'agreement-notification':
                    window.location.href = '../html/contractoragreementhistory.html';
                    break;
                case 'quotation-notification':
                    window.location.href = '';
                    break;
                // Add more cases as needed
            }
        });
    });
});
const notifi = document.getElementById("bell");
const notificationView = document.querySelector(".main-notification");

notifi.addEventListener("click", () => {
    // Toggle the display of the profile view
    if (notificationView.style.display === "none" || notificationView.style.display === "") {
        notificationView.style.display = "block";
    } else {
        notificationView.style.display = "none";
    }
});

window.addEventListener("click", (e) => {
    // Close the profile view when clicking outside of it
    if (notificationView.style.display === "block" && !notificationView.contains(e.target) && e.target !== notifi) {
        notificationView.style.display = "none";
    }
});



document.querySelector(".manage span").addEventListener("click",()=>{
    window.location.href="../html/contractorprofile.html"
})