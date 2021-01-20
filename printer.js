export class Printer {
    constructor() {}

    // ========================== Print the Questions ===================
    printQuestions(data){
        questions = data; 
        const containerData = document.getElementById('questions-container');
        let html = '';
        
        data.forEach((element, index1) => {
            let radioButtonItems = ``;
            let answers =[];
            answers.push(element.correct_answer);// firstly insert the correct answer to the new "answers" array
            element.incorrect_answers.forEach((element)=> answers.push(element)); // secondly insert the incorrect answers to "answers"

            if(answers.length>2) {
                let answShuffled = this.shuffleArray(answers);// swap the ubication of the correct answers randomly with the function shuffleArray()  
                radioButtonItems += this.createRadioButtonItems(answShuffled, index1);
            }else {
                radioButtonItems += this.createRadioButtonItems(['True','False'], index1);
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
                <button type="submit" class="btn btn-success w-100" >Enviar </button>  
            </div> 
        `;
        // poner los datos en el html
        containerData.innerHTML = htmlDefinitive;
    }

    // ========================== Print the Categories ===================
    printCategory(categories) {
        const categorySelect = document.getElementById('categorySelect');
        let html = `<option value="">Cualquier Categoria</option>`

        categories.forEach((category) =>{
            html +=`<option value="&category=${category.id}">${category.name}</option>`;
        });

        categorySelect.innerHTML= html;
    }

    // ========================== Shuffle Array ===================
    shuffleArray(array) {
        let index = Math.round(Math.random() * (3)); // get a ramdonly index number beetwen 0 and 3
        let temp = array[index]; // save the value in the position index of the array in the new variable temp
        array[index] = array[0];// save the value of the correct answer in the position 0, to the position "index" of the array
        array[0] = temp;// save the value in temp to the position 0 of the array 
        return array; // return the array with the correct answer in a new random place
    }

    // ========================== Creation of Radio Button options ===================
    createRadioButtonItems(array, index1) {
        let html = '';
        array.forEach((item, index2)=>{
            html += `
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="answer${index1}" id="${index1}${index2}" value="${item}" required>
                    <label class="form-check-label" for="${index1}${index2}">${item}</label>           
                </div>              
            `; // this is going to be the html created for the radio buttoms
        });
        return html;
    }
    
}