let url2 = '';
let counterRigthAnswers = 0; 
let counterWrongAnswers = 0; 
window.questions = {};
const correctLabel = `<i class="bi bi-check2" style="color: greenyellow; font-size: 3em;"></i>`;
const wrongLabel = `<i class="bi bi-x" style="color: red; font-size: 3em;"></i>`;
const score = document.getElementById('score');



// ======================================================================
function getCategory() {
    const url = 'https://opentdb.com/api_category.php';
    fetch(url)
        .then((response) => response.json())
        .then((data) => printCategory(data.trivia_categories))  
}
// ======================================================================
function printCategory(categories) {
    const categorySelect = document.getElementById('categorySelect');
    let html = `<option value="">Cualquier Categoria</option>`

    categories.forEach((category) =>{
        html +=`<option value="&category=${category.id}">${category.name}</option>`;
    });

    categorySelect.innerHTML= html;
}
// ======================================================================
function urlFactory() {
    const categoryQuestion = document.getElementById('categorySelect').value;
    const totalQuestions = document.getElementById('totalQuestions').value;
    const dificultyQuest = document.getElementById('dificultyQuest').value;
    const typeAnswQuest = document.getElementById('typeAnswQuest').value;
    
    url2 = `https://opentdb.com/api.php?amount=${totalQuestions}${categoryQuestion}${dificultyQuest}${typeAnswQuest}`;

    const nota =document.getElementById('nota');
    nota.innerHTML = url2;  
}
// ======================================================================
function getQuestions() {
    const categoryQuestion = document.getElementById('categorySelect').value;
    const totalQuestions = document.getElementById('totalQuestions').value;
    const dificultyQuest = document.getElementById('dificultyQuest').value;
    const typeAnswQuest = document.getElementById('typeAnswQuest').value;
    
    url2 = `https://opentdb.com/api.php?amount=${totalQuestions}${categoryQuestion}${dificultyQuest}${typeAnswQuest}`;

    fetch(url2)
        .then((response) => response.json())
        .then((data) => printData(data.results))   
}
// ======================================================================
function printData(data) {
    questions = data; 
    const containerData = document.getElementById('questions-container');
    let html = '';
    
    data.forEach((element, index1) => {
        let radioButtonItems = ``;
        let answers =[];
        answers.push(element.correct_answer);// firstly insert the correct answer to the new "answers" array
        element.incorrect_answers.forEach((element)=> answers.push(element)); // secondly insert the incorrect answers to "answers"

        if(answers.length>2) {
            let answShuffled = shuffleArray(answers);// swap the ubication of the correct answers randomly with the function shuffleArray()  
            radioButtonItems += createRadioButtonItems(answShuffled, index1);
        }else {
            radioButtonItems += createRadioButtonItems(['True','False'], index1);
        }

        let htmlRadioButtons = `<div class="m-3" id="${index1}">${radioButtonItems}</div><div id="qualif${index1}"></div>`;
        html += `<div class="col-md-4 mt-3 ">
                    <div class="card h-100 shadow-sm">
                        <div class="card-body">
                            ${element.question}
                        </div>
                        ${htmlRadioButtons}
                    </div>
                </div>`;
    });

    let htmlDefinitive = `
        ${html}
        <div class="w-100 mt-5 mb-5 mr-3 ml-3">
            <button class="btn btn-success w-100" onclick="checkQuestions()">Enviar </button>  
        </div> 
    `;
    // poner los datos en el html
    containerData.innerHTML = htmlDefinitive;
}
// ======================================================================
function createRadioButtonItems(array, index1) {
    let html = '';
    array.forEach((item, index2)=>{
        html += `
            <div class="form-check">
                <input class="form-check-input" type="radio" name="answer${index1}" id="${index1}${index2}" value="${item}">
                <label class="form-check-label" for="${index1}${index2}">${item}</label>           
            </div>              
        `; // this is going to be the html created for the radio buttoms
    });
    return html;
}
// ======================================================================
function shuffleArray(array) {
    let index = Math.round(Math.random() * (3)); // get a ramdonly index number beetwen 0 and 3
    let temp = array[index]; // save the value in the position index of the array in the new variable temp
    array[index] = array[0];// save the value of the correct answer in the position 0, to the position "index" of the array
    array[0] = temp;// save the value in temp to the position 0 of the array 
    return array; // return the array with the correct answer in a new random place
}
// ======================================================================
function checkQuestions() {
    
    questions.forEach((item, index)=>{
        let answerSelected = document.querySelector(`input[name="answer${index}"]:checked`).value;
        let correctAnswer = item.correct_answer;
        let answContainer = document.getElementById(`qualif${index}`);
        if(answerSelected == correctAnswer){
            counterRigthAnswers++;
            answContainer.innerHTML = `<div class="m-3">${correctLabel}<p class="text-info">${item.correct_answer}</p></div>`;
        }else{
            counterWrongAnswers++;
            answContainer.innerHTML = `<div class="m-3">${wrongLabel}<p class="text-info">${item.correct_answer}</p></div>`;
        }
        score.innerHTML = `Score: ${counterRigthAnswers}`; 
    })

}
// ======================================================================
getCategory();

