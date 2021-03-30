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



H1 = document.querySelector("h1");
startButton = document.querySelector(".button-section");

let openingH = "This is a breif paragraph discribing what to do in this situation.";

startButton.addEventListener("click", function(event) {
    let element = event.target;

    if(element.matches(".start-button")) {
        let state = startButton.getAttribute("data-state");
    
        if (state === "hidden") {
            element.dataset.state = "visible";
            element.textContent = element.dataset.text;
        } else {
            element.dataset.state = "hidden";
            startButton.textContent = "";

        }
   

    }    

});

