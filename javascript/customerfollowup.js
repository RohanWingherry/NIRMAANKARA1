const acceptButtons = document.querySelectorAll(".accepted");

acceptButtons.forEach(acc => {
    acc.addEventListener("click", (e) => {
        e.preventDefault();
        const row = acc.closest("tr"); 
        const statusCell = row.cells[6]; // Assuming the status is in the 7th cell
        const rescheduleButton = row.querySelector(".reshedule"); 

        // Only enable actions if status is 'Pending'
        if (statusCell.textContent === 'Pending') {
            acc.innerHTML = 'Accepted';
            acc.style.backgroundColor = "rgb(0, 177, 0)";
            statusCell.textContent = 'Accepted'; 

            rescheduleButton.style.pointerEvents = "none"; 
            rescheduleButton.style.color = "gray"; 
        }
    });
});

const rescheduleButtons = document.querySelectorAll(".reshedule");

rescheduleButtons.forEach(res => {
    res.addEventListener("click", (e) => {
        e.preventDefault();
        const row = res.closest("tr"); 
        const statusCell = row.cells[6]; 
        const acceptButton = row.querySelector(".accepted"); 

        // Only enable actions if status is 'Pending'
        if (statusCell.textContent === 'Pending') {
            res.innerHTML = "Rescheduled";
            res.style.backgroundColor = "rgb(228, 112, 112)";
            statusCell.textContent = 'Reschedule'; 

            acceptButton.style.pointerEvents = "none"; 
            acceptButton.style.color = "gray"; 
        }
    });
});

// Update Reschedule button if the status is already 'Rescheduled'
const rows = document.querySelectorAll("tr"); // Assuming each row contains a table data with status
rows.forEach(row => {
    const statusCell = row.cells[6]; // Assuming status is in the 7th cell
    const acceptButton = row.querySelector(".accepted");
    const rescheduleButton = row.querySelector(".reshedule");

    if (statusCell && acceptButton && rescheduleButton) {
        if (statusCell.textContent === 'Pending') {
            // Enable both buttons if status is 'Pending'
            acceptButton.style.pointerEvents = "auto";
            rescheduleButton.style.pointerEvents = "auto";

            acceptButton.style.color = "";  // Reset button color
            rescheduleButton.style.color = ""; // Reset button color
        } else if (statusCell.textContent === 'Accepted') {
            // If the status is 'Accepted', disable the buttons but keep 'Accepted' on the button
            acceptButton.innerHTML = 'Accepted';
            acceptButton.style.backgroundColor = "rgb(0, 177, 0)"; // Keep it green
            acceptButton.style.pointerEvents = "none";
            acceptButton.style.color = "white"; // Keep the color white for the accepted button

            rescheduleButton.style.pointerEvents = "none"; 
            rescheduleButton.style.color = "gray"; // Disable reschedule button
        } else if (statusCell.textContent === 'Reschedule') {
            // If the status is 'Rescheduled', update the Reschedule button text to 'Rescheduled'
            rescheduleButton.innerHTML = 'Rescheduled';
            rescheduleButton.style.backgroundColor = "rgb(228, 112, 112)"; // Keep it red
            rescheduleButton.style.pointerEvents = "none";
            rescheduleButton.style.color = "white"; // Change color to white for the rescheduled button

            acceptButton.style.pointerEvents = "none";
            acceptButton.style.color = "gray"; // Disable accept button
        }
    }
});
