document.addEventListener('DOMContentLoaded', function () {
    // Get references to the checkboxes and sections
    const morningCheckbox = document.getElementById('Morning');
    const eveningCheckbox = document.getElementById('name2');
    const workMornSection = document.querySelector('.workmorn');
    const workEvenSection = document.querySelector('.workeven');

    // Function to toggle visibility based on the selected checkbox
    function toggleSections() {
        if (morningCheckbox.checked) {
            workMornSection.style.display = 'block';
            workEvenSection.style.display = 'none';
        } else if (eveningCheckbox.checked) {
            workMornSection.style.display = 'none';
            workEvenSection.style.display = 'block';
        }
    }

    // Initially call the toggle function to set the correct section visibility
    toggleSections();

    // Add event listeners to checkboxes to toggle sections when clicked
    morningCheckbox.addEventListener('change', function () {
        if (morningCheckbox.checked) {
            eveningCheckbox.checked = false; // Uncheck the other checkbox
        }
        toggleSections();
    });

    eveningCheckbox.addEventListener('change', function () {
        if (eveningCheckbox.checked) {
            morningCheckbox.checked = false; // Uncheck the other checkbox
        }
        toggleSections();
    });
});