document.getElementById('submitBtn').addEventListener('click', function() {
    var clientSignature = document.getElementById('clientSignature').value.trim();
    
    if (clientSignature === '') {
        alert('Client Signature is required before submitting.');
    } else {
        alert('Receipt submitted successfully!'); 
        window.location.href="../html/customerreceipthistory.html"
    }
});