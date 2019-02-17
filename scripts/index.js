let newCaseFormSection = document.getElementById('new-case-form-section');
let newCaseForm = document.getElementById('new-case-form');
let caseContainer = document.getElementById('case-container');
let body = document.body;
let caseCount = 0;

// load cases from local storage if any
let casesArray = localStorage.getItem('cases') ? JSON.parse(localStorage.getItem('cases')) : [];

if(casesArray.length) {
    console.log("OLD CASES");
    casesArray.forEach(function(item) {
        console.log(item);
        newCaseMaker(item);
    });
}
else {
    // append a no case msg
    let noCases = document.createElement('div');
    noCases.setAttribute('class', 'row w-75 p-2 m-0 mb-3');
    noCases.setAttribute('id', 'no-case-div');

    noCases.innerHTML = "You have 0 cases";
    caseContainer.appendChild(noCases);
}

window.onclick = function(event) {
    if(event.target == newCaseFormSection) {
        newCaseFormSection.style.display = "none";
    }
}

function getNewCase() {
    newCaseFormSection.style.display = "block";
}

function cancelButton() {
    newCaseFormSection.style.display = "none";
}

function getDeleteButton() {
    return "<input type='button' id='delete-case-button-" + caseCount
            + "' class='px-2 bg-danger border border-danger rounded text-white' value='Delete'>";
}

// save current cases state to local storage
function saveStateToLocalStorage() {
    localStorage.setItem('cases', JSON.stringify(casesArray));
}

// append new case in case container
function newCaseMaker(Case) {
    // if no case msg exists then remove it
    let noCaseDiv = document.getElementById('no-case-div');
    if(noCaseDiv !== null)
        noCaseDiv.parentNode.removeChild(noCaseDiv);

    // create and append new case
    let newCase = document.createElement('div');
    newCase.setAttribute('class', 'row w-75 p-2 m-0 mb-3 theme-border rounded font-weight-light');

    let caseId = 'case-' + caseCount;
    let buttonId = 'delete-case-button-' + caseCount;
    newCase.setAttribute('id', caseId);

    newCase.innerHTML = "<div class='w-50 p-0'>" + Case.caseNo + " | " + Case.caseDate + "</div>"
                        + "<div class='w-50 p-0'>File No:  <span class='font-weight-bold'>" + Case.caseFile + "</span></div>"
                        + "<div class='w-100 p-0 font-weight-bold'>" + Case.caseName + "</div>"
                        + "<div class='w-50 p-0'>" + Case.caseForum + "</div>"
                        + getDeleteButton();

    caseContainer.appendChild(newCase);

    document.getElementById(buttonId).addEventListener('click', function() {
        let caseDiv = document.getElementById(caseId);
        caseDiv.parentNode.removeChild(caseDiv);
        let casesArrayIndex = casesArray.indexOf(Case);
        casesArray.splice(casesArrayIndex, 1);
        saveStateToLocalStorage();
    });

    ++caseCount;
}

// get case on form submit
newCaseForm.addEventListener('submit', function(e) {
    e.preventDefault();

    let formValues = {};
    formValues['caseNo'] = document.getElementsByName('case-no')[0].value;
    formValues['caseName'] = document.getElementsByName('case-name')[0].value;
    formValues['caseForum'] = document.getElementsByName('case-forum')[0].value;
    formValues['caseDate'] = document.getElementsByName('case-date')[0].value;
    formValues['caseFile'] = document.getElementsByName('case-file')[0].value;

    newCaseFormSection.style.display = "none";
    newCaseForm.reset();

    console.log("NEW CASE\n" + formValues);

    casesArray.push(formValues);
    saveStateToLocalStorage();
    newCaseMaker(formValues);
});
