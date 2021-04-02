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
let time = 30;
defaultTime = time;

// array of question objects
let questionsList = [question1, question2, question3, question4];

// Make variables of and create array of the initially displayed elements 
let main = document.querySelector("main");
let mainTitle = document.querySelector("#main-title");
let mainPara = document.querySelector("#main-para");
let startButton = document.querySelector("#start-button");
let timerEl = document.querySelector("#seconds-left");


let initialElements = [mainTitle, mainPara, startButton];



// sets index of which question is being asked to 0
let i = 0;

// set number of seconds left on timer
timerEl.textContent = time;

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

    // creates a section for the buttons and appends it to the question section
    let buttonSection = document.createElement("section");
    buttonSection.setAttribute("class", "button-section");
    questionContainer.appendChild(buttonSection);

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

        // creates the answer buttons and appends them to the button section
        let answerButtons = document.createElement("button");
        answerButtons.textContent = choices[x];
        buttonSection.appendChild(answerButtons);
    }

    // add event listener for buttons 
    questionContainer.addEventListener("click", function (event) {
        // determines what happens when an answer is chosen
        questionContainer.remove();
        if (event.target.textContent === questionsList[i].correctAnswer) {
            score++;
        } else {
            time = time - 10;
            if (time < 0) {
                time = 0;
            }
        }
        console.log("score: " + score);
        console.log("time: " + time);


        // if the question asked is not the last question, 
        // the function is run again and the next question is displayed
        if (i < questionsList.length - 1 &&
            time > 0) {
            i++;
            
            nextQuestion();
            return;
        } else {
            score = score * time;
            // TODO: this will run the score function and allow the
            // user to save their score and initials
            console.log(score);
            time = 0;

            return;
            
        }
    });
}

function timerFunction() {
    
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    time--;
    timerEl.textContent = time;

    if(time <= 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      timerEl.textContent = defaultTime;
    }

  }, 1000);
}

function submitScore() {
    document.createElement("section");
}

// event listener for start button
startButton.addEventListener("click", function () {

    // removes initial text
    for (let i = 0; i < initialElements.length; i++) {
        initialElements[i].remove();
    }

    nextQuestion();
    timerFunction();
});

