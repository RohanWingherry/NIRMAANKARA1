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
function hideProperty(bookmark) {
    var property = bookmark.closest('.singleproperty');
    
    if (property) {
        let remove=confirm("Are you sure want to remoove this property from your shortlist")
        if(remove)
        {
            property.style.display = 'none';
        }
    }
}


    const shareButtons = document.querySelectorAll('.share');
    const modals = document.querySelectorAll('.modal-content');
    const closeButtons = document.querySelectorAll('.close');
    
    shareButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const modal = modals[index];
            modal.classList.add('show'); // Show the corresponding modal
        });
    });
    
    closeButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const modal = modals[index];
            modal.classList.remove('show'); 
        });
    });