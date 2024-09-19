document.querySelectorAll('.delete-row').forEach(function(element) {
    element.addEventListener('click', function() {
        let del=confirm("Are you sure want to delete this row?")
        if(del){
            this.closest('tr').remove();
        }
    });
});
document.querySelectorAll('.view').forEach(function(vieweach) {
    vieweach.addEventListener('click', function() {
        var status = this.closest('tr').querySelector('td:nth-child(7)').textContent.trim();
        if (status === 'Pending' || status === 'Approved') {
            window.location.href = '..//html/quotationfilleddata.html';
        } else if (status === 'Negotiate') {
            window.location.href = '../html/quotationcontractor.html';
        }
    });
});