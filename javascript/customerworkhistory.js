document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.delete-row').forEach(function(element) {
        element.addEventListener('click', function() {
            const del = confirm('Are you sure you want to delete this row?');
            if (del) {
                this.closest('tr').remove();
            }
        });
    });
});

document.querySelectorAll('.edit-row').forEach(function(element) {
    element.addEventListener('click', function() {
        window.location.href="../html/customerworkstatus.html";
    });
});
