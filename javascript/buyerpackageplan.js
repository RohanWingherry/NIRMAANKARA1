document.querySelector(".shortlisted").addEventListener("click",()=>{
    window.location.href="../html/buyershorlisted.html"
})
function free(){
    alert("Profile Updated Successfully")
    window.location.href="../html/contractorshomepage.html"
}
const buyNow=document.querySelectorAll(".buy-now")

buyNow.forEach(buy => {
    buy.addEventListener("click",()=>{
        window.location.href='../html/paymentoptionscreen.html'
    })
});