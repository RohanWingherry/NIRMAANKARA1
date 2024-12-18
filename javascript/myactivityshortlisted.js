
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

    const allExplore=document.querySelectorAll(".exp")

    allExplore.forEach(explore => {
        explore.addEventListener("click",()=>{
            window.location.href="../html/buyerpropertyexplore.html"
        })
    });