

import {Printer} from "./printer.js";
import {Checker} from "./checker.js";
let url2 = '';
const printer = new Printer();
const checker = new Checker();
window.counterRigthAnswers = 0; 
window.questions = {};
window.getQuestions = getQuestions;
window.getCategory = getCategory;
window.checkQuestions = checkQuestions;




// ============ Getting the Categories from the API =================
function getCategory() {
    
    localStorage.setItem("score", 0);
    document.getElementById('score').innerHTML = `Score: ${localStorage.getItem("score")}`; 

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
function checkQuestions() {
    checker.checkQuestions();
}


getCategory();