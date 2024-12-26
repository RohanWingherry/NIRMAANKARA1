
const buyNow=document.querySelectorAll(".buy-now")

buyNow.forEach(buy => {
    buy.addEventListener("click",()=>{
        window.location.href='../html/paymentoptionscreen.html'
    })
});

document.getElementById("free-package").addEventListener("click",()=>{
    alert("You Ads have been posted Scuccessfully")
    window.location.href="../html/contractorshomepage.html"

})
