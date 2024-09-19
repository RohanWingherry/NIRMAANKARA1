function free(){
    alert("Profile Updated Successfully")
    window.location.href="../html/contractorshomepage.html"
}
const buyNow=document.querySelectorAll(".button1")

buyNow.forEach(buy => {
    buy.addEventListener("click",()=>{
        window.location.href='../html/paymentoptionscreen.html'
    })
});