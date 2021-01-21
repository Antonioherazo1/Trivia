

export class Checker {
    
    constructor() {}
    // ======================================================================
    checkQuestions() {
        const correctLabel = `<i class="bi bi-check2" style="color: greenyellow; font-size: 3em;"></i>`;
        const wrongLabel = `<i class="bi bi-x" style="color: red; font-size: 3em;"></i>`;
        const score = document.getElementById('score');
    
        questions.forEach((item, index)=>{
            let answerSelected = document.querySelector(`input[name="answer${index}"]:checked`).value;
            let correctAnswer = item.correct_answer;
            let answContainer = document.getElementById(`qualif${index}`);
            if(answerSelected == correctAnswer){
                counterRigthAnswers++;
                answContainer.innerHTML = `<div class="m-3">${correctLabel}<p class="text-success">${item.correct_answer}</p></div>`;
            }else{
                answContainer.innerHTML = `<div class="m-3">${wrongLabel}<p class="text-success">${item.correct_answer}</p></div>`;
            }
        })
        let localStrgScore = parseInt(localStorage.getItem("score")) + counterRigthAnswers; 
        localStorage.setItem("score", localStrgScore);
        document.getElementById('score').innerHTML = `Score: ${localStorage.getItem("score")}`; 
        counterRigthAnswers = 0;
    }
}