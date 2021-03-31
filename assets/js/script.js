/* questions are going to be stored in objects 
example: 
let question1 = {
    correctAnswer: "answer",
    decoy1: "decoy",
    decoy2: "decoy",
    decoy3: "decoy",
}
let score = 0;
let time interval = 75;

when the user clicks an answer, the user's choice is compared against correctAnswer:

for (i = 0; i < questions.length; i++) {

    let askQuestion = function() {
        if (event.target.textContent === correctAnswer) {
            score += 1;    
        } else {
            time -= 10;
        }
    }
    ++i;
}
*/
// 
// questions created
let question1 = {
    question: "this is where the question 1 is to be stowed",
    correctAnswer: "answer",
    decoy1: "decoy",
    decoy2: "decoy",
    decoy3: "decoy",
}

let question2 = {
    question: "this is where the question 2 is to be stowed",
    correctAnswer: "answer",
    decoy1: "decoy",
    decoy2: "decoy",
    decoy3: "decoy",
}

let question3 = {
    question: "this is where the question 3 is to be stowed",
    correctAnswer: "answer",
    decoy1: "decoy",
    decoy2: "decoy",
    decoy3: "decoy",
}

let question4 = {
    question: "this is where the question 4 is to be stowed",
    correctAnswer: "answer",
    decoy1: "decoy",
    decoy2: "decoy",
    decoy3: "decoy",
}

// array of question objects
let questionsList = [question1, question2, question3, question4];

function init() {

}
// Make variables of and create array of the initially displayed elements 
let main = document.querySelector("main");
let mainTitle = document.querySelector("#main-title");
let mainPara = document.querySelector("#main-para");
let startButton = document.querySelector("#start-button");
let answerButton = document.querySelector(".answer-button");

let initialElements = [mainTitle, mainPara, startButton];

// event listener for start button
startButton.addEventListener("click", function() {

    // removes initial text
    for(let i = 0; i < initialElements.length; i++) {
        initialElements[i].remove();
    }

    // create next question loop until all questions have been asked
    // put this in a function
    let i = 0;
    function nextQuestion() {
        let displayQuestion = document.createElement("h1");
        displayQuestion.textContent = questionsList[i].question;
        main.appendChild(displayQuestion);


        let choices = [
            questionsList[i].correctAnswer,
            questionsList[i].decoy1,
            questionsList[i].decoy2,
            questionsList[i].decoy3,
        ].sort(function () {
            return Math.random();
        });

        for (let x = 0; x < choices.length; x++) {
            let answerButtons = document.createElement("button");
            answerButtons.textContent = choices[x];
            answerButtons.setAttribute('class', 'answer-button');
            main.appendChild(answerButtons);
        }
        
        i++;
    }
    nextQuestion();
    answerButton.addEventListener("click", function(event) {
        console.log(event.target.textContent);
        if (event.target.textContent === questionsList[i].correctAnswer) {
            console.log("wowoow!!!");
        } else {
            console.log("nooooaaahH!");
        }

    });

});

