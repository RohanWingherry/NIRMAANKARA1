const text=document.querySelector(".copytext")

text.addEventListener("click",()=>{
    const copy=document.getElementById("copy")
    copy.select()
    document.execCommand("copy");
    text.textContent="Copied"
})