import {Printer} from "./printer.js";


// ========================= Globals ======================

let url2 = '';
let counterRigthAnswers = 0; 
let counterWrongAnswers = 0; 
window.questions = {};
const correctLabel = `<i class="bi bi-check2" style="color: greenyellow; font-size: 3em;"></i>`;
const wrongLabel = `<i class="bi bi-x" style="color: red; font-size: 3em;"></i>`;
const score = document.getElementById('score');


const printer = new Printer();
window.getQuestions = getQuestions;
window.getCategory = getCategory;
window.checkQuestions = checkQuestions;

getCategory();

// ============ Getting the Categories from the API =================
function getCategory() {
    const url = 'https://opentdb.com/api_category.php';
    fetch(url)
        .then((response) => response.json())
        .then((data) => printer.printCategory(data.trivia_categories))  
}
// ================ Getting the Questions from the API =================
function getQuestions() {
    const categoryQuestion = document.getElementById('categorySelect').value;
    const totalQuestions = document.getElementById('totalQuestions').value;
    const dificultyQuest = document.getElementById('dificultyQuest').value;
    const typeAnswQuest = document.getElementById('typeAnswQuest').value;
    
    url2 = `https://opentdb.com/api.php?amount=${totalQuestions}${categoryQuestion}${dificultyQuest}${typeAnswQuest}`;

    fetch(url2)
        .then((response) => response.json())
        // .then((data) => printData(data.results)) 
        .then((data) => printer.printQuestions(data.results));
}

// ======================================================================
function checkQuestions() {
    
    questions.forEach((item, index)=>{
        let answerSelected = document.querySelector(`input[name="answer${index}"]:checked`).value;
        let correctAnswer = item.correct_answer;
        let answContainer = document.getElementById(`qualif${index}`);
        if(answerSelected == correctAnswer){
            counterRigthAnswers++;
            answContainer.innerHTML = `<div class="m-3">${correctLabel}<p class="text-success">${item.correct_answer}</p></div>`;
        }else{
            counterWrongAnswers++;
            answContainer.innerHTML = `<div class="m-3">${wrongLabel}<p class="text-success">${item.correct_answer}</p></div>`;
        }
        score.innerHTML = `Score: ${counterRigthAnswers}`; 
    })

}
// ======================================================================


