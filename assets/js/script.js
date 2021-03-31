// questions created
let question1 = {
    question: "this is where the question 1 is to be stowed",
    correctAnswer: "answer1",
    decoy1: "decoy1",
    decoy2: "decoy1",
    decoy3: "decoy1",
}

let question2 = {
    question: "this is where the question 2 is to be stowed",
    correctAnswer: "answer2",
    decoy1: "decoy2",
    decoy2: "decoy2",
    decoy3: "decoy2",
}

let question3 = {
    question: "this is where the question 3 is to be stowed",
    correctAnswer: "answer3",
    decoy1: "decoy3",
    decoy2: "decoy3",
    decoy3: "decoy3",
}

let question4 = {
    question: "this is where the question 4 is to be stowed",
    correctAnswer: "answer4",
    decoy1: "decoy4",
    decoy2: "decoy4",
    decoy3: "decoy4",
}

// score and time variables
let score = 0;
let time = 75;

// array of question objects
let questionsList = [question1, question2, question3, question4];

// Make variables of and create array of the initially displayed elements 
let main = document.querySelector("main");
let mainTitle = document.querySelector("#main-title");
let mainPara = document.querySelector("#main-para");
let startButton = document.querySelector("#start-button");
let timerEl = document.querySelector(".timer");

let initialElements = [mainTitle, mainPara, startButton];



// sets index of what question is being asked to 0
let i = 0;

// create next question loop until all questions have been asked
function nextQuestion() {
    // create button section
    let questionContainer = document.createElement("section");
    main.appendChild(questionContainer);
    questionContainer.setAttribute("class", "question");

    // display question
    let displayQuestion = document.createElement("h1");
    displayQuestion.textContent = questionsList[i].question;
    questionContainer.appendChild(displayQuestion);

    // TODO: array of answers that are sorted randomly
    let choices = [
        questionsList[i].correctAnswer,
        questionsList[i].decoy1,
        questionsList[i].decoy2,
        questionsList[i].decoy3,
    ].sort(function () {
        return Math.random();
    });

    

    // creates the buttons and assigns them text
    for (let x = 0; x < choices.length; x++) {
        let answerButtons = document.createElement("button");
        answerButtons.textContent = choices[x];
        questionContainer.appendChild(answerButtons);
    }

    // add event listener for buttons 
    questionContainer.addEventListener("click", function (event) {
        // determines what happens when an answer is chosen
        questionContainer.remove();
        if (event.target.textContent === questionsList[i].correctAnswer) {
            score++;
        } else {
            time = time - 10;
        }
        console.log("score: " + score);
        console.log("time: " + time);


        // if the question asked is not the last question, 
        // the function is run again and the next question is displayed
        if (i < questionsList.length - 1) {
            console.log("i: " + i);
            i++;
            
            nextQuestion();
            return;
        } else {
            score = score * time;
            // TODO: this will run the score function and allow the
            // user to save their score and initials
            

            return score;
            
        }
    });
}

// event listener for start button
startButton.addEventListener("click", function () {

    // removes initial text
    for (let i = 0; i < initialElements.length; i++) {
        initialElements[i].remove();
    }

    nextQuestion();
});

