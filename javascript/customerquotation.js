const agree = document.getElementById("agree");
const negotiate = document.getElementById("negotiate");

agree.addEventListener("click", () => {
    alert("The quotation has been agreed");
    window.location.href="../html/customerquotationhistory.html"
});

negotiate.addEventListener("click", () => {
    alert("The quotation has been negotiated");
    window.location.href="../html/customerquotationhistory.html"
});
