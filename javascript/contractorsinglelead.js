document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const contract = urlParams.get('contract');
    const status = urlParams.get('status');
    const assigned = urlParams.get('assigned');

    document.getElementById('lead-name').innerText = name;
    document.getElementById('lead-contract').innerText = `${contract}`;
    document.getElementById('lead-status').innerText = `${status}`;
    document.getElementById('lead-assigned').innerText = `${assigned}`;

});
const basic=document.querySelector(".basic-click")
const notes=document.querySelector(".notes-click")
const history=document.querySelector(".history-click")
const tags=document.querySelector(".tags-click")

basic.addEventListener("click",(e)=>{
    e.preventDefault()
    document.querySelector(".basic-main").style.display="block"
    notes.classList.remove("active")
    basic.classList.add("active")
    history.classList.remove("active")
    tags.classList.remove("active")
    document.querySelector(".notes-main").style.display="none"
    document.querySelector(".history-main").style.display="none"
    document.querySelector(".tags-main").style.display="none"
})

notes.addEventListener("click",(e)=>{
    e.preventDefault()
    document.querySelector(".notes-main").style.display="block"
    notes.classList.add("active")
    basic.classList.remove("active")
    history.classList.remove("active")
    tags.classList.remove("active")
    document.querySelector(".basic-main").style.display="none"
    document.querySelector(".history-main").style.display="none"
    document.querySelector(".tags-main").style.display="none"
})

history.addEventListener("click",(e)=>{
    e.preventDefault()
    document.querySelector(".history-main").style.display="block"
    history.classList.add("active")
    notes.classList.remove("active")
    basic.classList.remove("active")
    tags.classList.remove("active")
    document.querySelector(".basic-main").style.display="none"
    document.querySelector(".notes-main").style.display="none"
    document.querySelector(".tags-main").style.display="none"
})

tags.addEventListener("click",(e)=>{
    e.preventDefault()
    document.querySelector(".tags-main").style.display="block"
    history.classList.remove("active")
    notes.classList.remove("active")
    basic.classList.remove("active")
    tags.classList.add("active")
    document.querySelector(".basic-main").style.display="none"
    document.querySelector(".notes-main").style.display="none"
    document.querySelector(".history-main").style.display="none"
})
