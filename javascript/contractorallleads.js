function filteroptions(){
    document.querySelector(".filters .filter-options>span:first-child").classList.add("filter-options-active")
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var radioButtons = document.querySelectorAll('input[type="radio"]');

    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });

    radioButtons.forEach(function(radio) {
        radio.checked = false;
    });
}

const filter=document.querySelector(".sort")
filter.addEventListener("click",()=>{
    document.querySelector(".filters").classList.add("show");
    document.querySelector(".filters").style.display="block"
    filter.style.display="none"
    document.querySelector(".back").style.display="block"
    document.querySelector(".display-leads").style.display="none"
    document.querySelector(".filters>article").style.display="none"
    document.querySelector(".filter-footer").style.display="block"
})

const back=document.querySelector(".back")
back.addEventListener("click",()=>{
    document.querySelector(".filters").classList.remove("show");
    document.querySelector(".filters").style.display="none"
    filter.style.display="block"
    document.querySelector(".back").style.display="none"
    document.querySelector(".display-leads").style.display="block"
    document.querySelector(".filters>article").style.display="block"
    document.querySelector(".filter-footer").style.display = "none";
})

const apply=document.querySelector(".apply")
apply.addEventListener("click",()=>{
    document.querySelector(".filters").classList.remove("show");
    document.querySelector(".filters").style.display="none"
    filter.style.display="block"
    document.querySelector(".back").style.display="none"
    document.querySelector(".display-leads").style.display="block"
    document.querySelector(".filters>article").style.display="block"
    document.querySelector(".filter-footer").style.display = "none";

})
var modal = document.getElementById("modal");
var modalText = document.getElementById("modal-text");
var span = document.getElementsByClassName("close")[0];

function showModal(content) {
    modalText.innerText = content;
    modal.style.display = "block";
}

document.querySelectorAll('.lead-contact span').forEach(item => {
    item.addEventListener('click', event => {
        let content = item.innerText.trim();
        showModal(content);
    });
});

span.onclick = function() {
    modal.style.display = "none";
    document.getElementById("text-copy").innerText="Copy"
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("text-copy").innerText="Copy"
    }
}
function copyText() {
    var copyText = document.getElementById("copy");
    copyText.disabled = false;
    copyText.select();
    document.execCommand("copy");
    copyText.disabled = true;
    document.getElementById("text-copy").innerText="Copied"
    document.getElementById("text-copy").style.backgroundColor="palevioletred"
    document.getElementById("text-copy").style.color="white"
}


