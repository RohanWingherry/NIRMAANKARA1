document.querySelectorAll('td#payment-status img').forEach(img => {
    img.addEventListener('click', () => {
        const overlay = document.getElementById('fullscreen-overlay');
        const fullscreenImage = document.getElementById('fullscreen-image');
        
        fullscreenImage.src = img.src; 
        overlay.style.display = 'flex'; 
    });
});


document.getElementById('fullscreen-overlay').addEventListener('click', () => {
    document.getElementById('fullscreen-overlay').style.display = 'none';
});