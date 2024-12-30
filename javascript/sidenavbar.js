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

