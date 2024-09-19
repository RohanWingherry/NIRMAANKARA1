document.getElementById('agreementForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting
        const firstPartySignature = this.querySelector('input[type="text"]').value;

        if (firstPartySignature) {
            alert('Thank you for agreeing!');
            window.location.href='../html/customeragreementhistory.html'
        } else {
            alert('Please fill out all required fields.');
        }
    });
document.getElementById('firstparty').addEventListener('input', function(event) {
    let value = event.target.value;
            value = value.replace(/[^a-zA-Z\s]/g, '');

            if (value.startsWith(' ')) {
                value = value.slice(1);
            }

            event.target.value = value;
});