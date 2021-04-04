// Gets any saved scores if there are any.
// If not, sets savedScores arrray to an empty string.
let savedScores = localStorage.getItem('savedScores');
if(savedScores === null) {
    savedScores = [];
} else {
    savedScores = JSON.parse(savedScores);
}
// questions created
let question1 = {
    question: 'this is where the question 1 is to be stowed',
    correctAnswer: 'answer1',
    choices: ['decoy1', 'decoy1', 'answer1', 'decoy1',],
}

let question2 = {
    question: 'this is where the question 2 is to be stowed',
    correctAnswer: 'answer2',
    choices: ['answer2', 'decoy2', 'decoy2', 'decoy2',],
}

let question3 = {
    question: 'this is where the question 3 is to be stowed',
    correctAnswer: 'answer3',
    choices: ['decoy3', 'decoy3', 'decoy3', 'answer3'],
}

let question4 = {
    question: 'this is where the question 4 is to be stowed',
    correctAnswer: 'answer4',
    choices: ['decoy4', 'decoy4', 'answer4', 'decoy4', ], 
}

// score and time variables
let score = 0;
let time = 30;
defaultTime = time;

// array of question objects
let questionsList = [question1, question2, question3, question4];

//variables of selected elements 
let main = document.querySelector('main');
let mainTitle = document.querySelector('#main-title');
let mainPara = document.querySelector('#main-para');
let startButton = document.querySelector('#start-button');
let timerEl = document.querySelector('#seconds-left');
let scoreEl = document.querySelector('#score');
let gameOverCard = document.querySelector('.game-over-card');
let saveScoreBttnEl = document.querySelector('#save-score');
let cancelBttnEl = document.querySelector('#cancel');



let initialElements = [mainTitle, mainPara, startButton];



// sets index of which question is being asked to 0
let i = 0;

// set number of seconds left on timer
timerEl.textContent = time;

// create next question loop until all questions have been asked
function nextQuestion() {
    // create question section
    let questionContainer = document.createElement('section');
    main.appendChild(questionContainer);
    questionContainer.setAttribute('class', 'question');

    // display question
    let displayQuestion = document.createElement('h1');
    displayQuestion.textContent = questionsList[i].question;
    questionContainer.appendChild(displayQuestion);

    // creates a section for the buttons and appends it to the question section
    let buttonSection = document.createElement('section');
    buttonSection.setAttribute('class', 'button-section');
    questionContainer.appendChild(buttonSection);

    // array of answers
    let choices = questionsList[i].choices

    // creates the buttons and assigns them text
    for (let x = 0; x < questionsList[i].choices.length; x++) {

        // creates the answer buttons and appends them to the button section
        let answerButtons = document.createElement('button');
        answerButtons.textContent = choices[x];
        buttonSection.appendChild(answerButtons);
    }

    // add event listener for buttons 
    buttonSection.addEventListener('click', function (event) {

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
        console.log('score: ' + score);
        console.log('time: ' + time);


        // if the question asked is not the last question, and there is still time on
        // the clock, the function is run again and the next question is displayed
        if (i < questionsList.length - 1 &&
            time > 0) {
            i++;
            
            nextQuestion();
            return;
        } else {
            score = score * time;
            time = 0;
            // Display game over screen and allows the 
            // user to save their score and initials
            submitScore();
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
      // Stops execution of interval and resets time
      clearInterval(timerInterval);
      timerEl.textContent = defaultTime;
    }

  }, 1000);
}

function submitScore() {

    gameOverCard.dataset.state = 'visible';

    // loops through to set the text content of the children of gameOverCard
    for (let i = 0; i < 4; i++) {
        gameOverCard.children[i].textContent = gameOverCard.children[i].dataset.text;
        
        scoreEl.textContent = score;
    }

    // creates the form element and it's children.
    let formEl = document.createElement('form');
    $(formEl).attr('method', 'POST');
    gameOverCard.appendChild(formEl);

    // input field
    let inputEl = document.createElement('input');
    $(inputEl).attr({ 'type': 'text', 'name': 'initials', 'id': 'initials', 'placeholder': 'Enter your initials'});
    formEl.appendChild(inputEl);

    // Save Score button
    let saveScoreBttnEl = document.createElement('button');
    $(saveScoreBttnEl).attr('id', 'save-score');
    saveScoreBttnEl.textContent = 'Save Score';
    formEl.appendChild(saveScoreBttnEl);

    // Cancel Button
    let cancelBttnEl = document.createElement('button');
    $(cancelBttnEl).attr('id', 'cancel');
    cancelBttnEl.textContent = 'Cancel';
    formEl.appendChild(cancelBttnEl);

    let initialsEl = document.querySelector('#initials');

    // TODO: put this event listener on the form
    gameOverCard.addEventListener('click', function(event) {

        let element = event.target;
        if (element.matches('#cancel')) {
            event.preventDefault();
            location.reload();

            // run function to initialize the starting display
            gameOverCard.children.textContent = '';

        } else if (element.matches('#save-score')) {
            event.preventDefault();

            let savedScore = {
                userScore: score,
                userInitials: initialsEl.value.trim()
            };
            console.log(savedScore.userInitials);

            if (savedScore.userInitials === '') {
                alert("Invalid input")
                return;
            }

            savedScores.push(savedScore);
            // set new submission to local storage 
            localStorage.setItem('savedScores', JSON.stringify(savedScores));

            // removes save score button and replaces it with text
            let savedh2 = document.createElement('h2');
            savedh2.setAttribute('id', 'scoreCardH2');
            savedh2.textContent = 'Score Saved!';
            formEl.replaceChild(savedh2, formEl.children[1]);

            // changes text in cancel button to home
            cancelBttnEl.textContent = 'home';

            highScoresBttn = document.createElement('button');
            $(highScoresBttn).attr({'id': 'hs-bttn', 'type': 'button', });
            highScoresBttn.textContent = 'view High Scores';
            formEl.appendChild(highScoresBttn);

            highScoresBttn.onclick = function () {
                location.href = "./highscores.html";
            };

        }
    });

}

// event listener for start button
startButton.addEventListener('click', function () {

    // removes initial text
    for (let i = 0; i < initialElements.length; i++) {
        initialElements[i].remove();
    }

    nextQuestion();
    timerFunction();
});