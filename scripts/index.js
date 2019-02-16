let newCaseForm = document.getElementById('new-case-form');

window.onclick = function(event) {
    if(event.target == newCaseForm) {
        newCaseForm.style.display = "none";
    }
}

function getNewCase() {
    newCaseForm.style.display = "block";
}

function cnacelButton() {
    newCaseForm.style.display = "none";
}
