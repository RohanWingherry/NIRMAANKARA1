const acceptButtons = document.querySelectorAll(".accepted");

acceptButtons.forEach(acc => {
    acc.addEventListener("click", (e) => {
        e.preventDefault();
        const row = acc.closest("tr"); 
        const statusCell = row.cells[6];
        const rescheduleButton = row.querySelector(".reshedule"); 

        acc.innerHTML = 'Accepted';
        acc.style.backgroundColor = "rgb(0, 177, 0)";
        statusCell.textContent = 'Agreed'; 

        rescheduleButton.style.pointerEvents = "none"; 
        rescheduleButton.style.color = "gray"; 
    });
});

const rescheduleButtons = document.querySelectorAll(".reshedule");

rescheduleButtons.forEach(res => {
    res.addEventListener("click", (e) => {
        e.preventDefault();
        const row = res.closest("tr"); 
        const statusCell = row.cells[6]; 
        const acceptButton = row.querySelector(".accepted"); 

        res.innerHTML = "Rescheduled";
        res.style.backgroundColor = "rgb(228, 112, 112)";
        statusCell.textContent = 'Closed'; 

        acceptButton.style.pointerEvents = "none"; 
        acceptButton.style.color = "gray"; 
    });
});
