document.addEventListener('DOMContentLoaded', () => {
    // Function to update serial numbers of rows
    function updateSerialNumbers() {
        document.querySelectorAll('.history-table tbody tr').forEach((row, index) => {
            row.querySelector('td').textContent = index + 1;
        });
    }

    // Event listener for delete buttons
    document.querySelectorAll('.delete-row').forEach(function(element) {
        element.addEventListener('click', function() {
            const del = confirm('Are you sure you want to delete this row?');
            if (del) {
                this.closest('tr').remove();
                updateSerialNumbers();
                alert("Successfully Deleted the row");
            }
        });
    });

    // Initial call to update serial numbers
    updateSerialNumbers();
});

document.addEventListener("DOMContentLoaded", function () {
    // Event listener for edit buttons
    document.querySelectorAll('.edit-row').forEach((btn, index) => {
        btn.addEventListener('click', function () {
            const row = btn.closest('tr');
            const cells = row.querySelectorAll('td');

            // Get the client status from the table row (assuming it's in the 6th column, index 5)
            const clientStatus = cells[5].innerText.trim();

            // Only allow editing if client status is "Accepted" or "Rescheduled"
            if (clientStatus === "Accepted" || clientStatus === "Rescheduled") {
                const record = {
                    sno: cells[0].innerText,
                    date: cells[1].innerText,
                    customerName: cells[2].innerText,
                    customerMob: cells[3].innerText,
                    contactMethod: cells[4].innerText,
                    clientStatus: clientStatus,
                    status: cells[6].innerText
                };

                // Store record in localStorage and redirect to the update page
                localStorage.setItem('record', JSON.stringify(record));
                window.location.href = '../html/contractorfollowupdate.html';
            } else {
                alert('You cannot edit this row as the client status is neither "Accepted" nor "Rescheduled".');
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Check for updated record and update the table row if found
    const updatedRecord = JSON.parse(localStorage.getItem('updatedRecord'));

    if (updatedRecord) {
        const rows = document.querySelectorAll('tbody tr');

        rows.forEach((row) => {
            const cells = row.querySelectorAll('td');
            if (cells[0].innerText === updatedRecord.sno) {
                cells[1].innerText = updatedRecord.date;
                cells[2].innerText = updatedRecord.customerName;
                cells[3].innerText = updatedRecord.customerMob;
                cells[4].innerText = updatedRecord.contactMethod;
                cells[5].innerText = updatedRecord.clientStatus;
                cells[6].innerText = updatedRecord.status;
            }
        });

        // Remove updated record from localStorage after updating
        localStorage.removeItem('updatedRecord');
    }
});
