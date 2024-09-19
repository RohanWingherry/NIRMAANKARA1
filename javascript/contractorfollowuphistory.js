document.addEventListener('DOMContentLoaded', () => {
    function updateSerialNumbers() {
        document.querySelectorAll('.history-table tbody tr').forEach((row, index) => {
            row.querySelector('td').textContent = index + 1;
        });
    }

    document.querySelectorAll('.delete-row').forEach(function(element) {
        element.addEventListener('click', function() {
            const del = confirm('Are you sure you want to delete this row?');
            if (del) {
                this.closest('tr').remove();
                updateSerialNumbers();
                alert("Successfully Deleted the row") 
            }
        });
    });

    updateSerialNumbers();
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.edit-row').forEach((btn, index) => {
        btn.addEventListener('click', function () {
            const row = btn.closest('tr');
            const cells = row.querySelectorAll('td');

            const record = {
                sno: cells[0].innerText,
                date: cells[1].innerText,
                customerName: cells[2].innerText,
                customerMob: cells[3].innerText,
                contactMethod: cells[4].innerText,
                status: cells[5].innerText
            };

            localStorage.setItem('record', JSON.stringify(record));
            window.location.href = '../html/contractorfollowupdate.html';
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {

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
                cells[5].innerText = updatedRecord.status;
            }
        });

        localStorage.removeItem('updatedRecord');
    }
});

