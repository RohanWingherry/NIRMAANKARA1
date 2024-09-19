const buyNow=document.querySelectorAll(".button1")

buyNow.forEach(buy => {
    buy.addEventListener("click",()=>{
        window.location.href="../html/paymentoptionscreen.html"
    })
});