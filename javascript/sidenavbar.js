let btn = document.querySelector("#btn");
let sidebar = document.querySelector(".sidebar");
let mobileBtn = document.querySelector("#mobile-btn");
let menuItems = document.querySelectorAll(".has-submenu");

btn.onclick = function () {
    toggleSidebar();
};

mobileBtn.onclick = function () {
    toggleSidebar();
};

function toggleSidebar() {
    sidebar.classList.toggle("active");

    // Close all open submenus when collapsing sidebar
    if (!sidebar.classList.contains("active")) {
        menuItems.forEach(item => {
            item.classList.remove("activesub");
        });
    }

    // Toggle between hamburger and cross icons
    if (sidebar.classList.contains("active")) {
        btn.classList.remove("fa-angles-right");
        btn.classList.add("fa-angles-left");
        mobileBtn.classList.remove("fa-angles-right");
        mobileBtn.classList.add("fa-angles-left");
    } else {
        btn.classList.remove("fa-angles-left");
        btn.classList.add("fa-angles-right");
        mobileBtn.classList.remove("fa-angles-left");
        mobileBtn.classList.add("fa-angles-right");
    }
}

// Handle submenu toggle
menuItems.forEach(item => {
    item.addEventListener("click", function (e) {
        e.preventDefault();
        item.classList.toggle("activesub");
        item.classList.add('subactive');
        sidebar.classList.add('active');
        // Close all other submenus
        menuItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove("activesub");
                item.classList.remove('subactive');
            }
        });
    });
});