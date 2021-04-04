let savedScores = localStorage.getItem("savedScores");
if(savedScores === null) {
    savedScores = [];
} else {
    savedScores = JSON.parse(savedScores);
}

let listEl = document.querySelector("ul");

for ( let score of savedScores) {
    let li = document.createElement("li");
    li.textContent = score.userInitials + " " + score.userScore;
    listEl.appendChild(li);
}
