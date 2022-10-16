var startButton = document.getElementById("startButton");
var winsDisplay = document.getElementById("wins");
var lossesDisplay = document.getElementById("losses");
var countdownTimer = document.getElementById("timer");
var wordDisplay = document.getElementById("word-display");
var message = document.getElementById("message");

var secondsLeft = 0;
var timer;

var isGameStarted = false;
var words = ['badgers', 'tigers', 'elephants', 'beavers', 'kittens'];
var answerWord = [];
var displayWord = [];

var scores = { wins: 0, losses: 0 };

function onKeyPress(e) {
    isKeyInWord(e.key)
}

function endGame() {

    clearInterval(timer);
    isGameStarted = false;
    startButton.enabled = true;
    countdownTimer.textContent = '';

    // Save off the scores:
    SaveScores();
}

function getScores() {

    scores.wins = localStorage.getItem('wins') || 0;
    scores.losses = localStorage.getItem('losses') || 0;

    displayScores();
}

function displayScores() {
    winsDisplay.textContent = "Wins: " + scores.wins;
    lossesDisplay.textContent = "Losses: " + scores.losses;
}

function SaveScores() {

    localStorage.setItem('wins', scores.wins);
    localStorage.setItem('losses', scores.losses);

    displayScores();
}

function isKeyInWord(key) {

    for (var i = 0; i < answerWord.length; i++) {
        if (answerWord[i] === key) {

            // The letter is in the word
            displayWord[i] = key;

            var displayedWord = displayWord.join('');
            var chosenWord = answerWord.join('');

            wordDisplay.textContent = displayedWord;

            // have we won?
            if (chosenWord === displayedWord) {
                scores.wins++;
                message.textContent = 'You Won! :-)'
                endGame();
            }
        }
    }
}

function onStartGame() {

    // Start the Game, setting count down time as 23 seconds
    isGameStarted = true;
    secondsLeft = 25

    // Clear the Displayed Word
    wordDisplay.textContent = "";

    // Pick a randon word
    var wordNo = Math.floor(Math.random() * words.length);
    answerWord = words[wordNo].split("");
    console.log(answerWord)

    for (var i = 0; i < answerWord.length; i++) {
        displayWord[i] = ' _ ';
    }

    wordDisplay.textContent = displayWord.join('');

    timer = setInterval(function () {
        startButton.disabled = true;
        countdownTimer.innerText = 'Time Left: ' + secondsLeft;
        secondsLeft--;

        if (secondsLeft === 0) {
            scores.losses++;
            message.textContent = 'You lost! :-('
            endGame();
        }
    }, 1000);

}

startButton.addEventListener('click', onStartGame)
document.addEventListener("keydown", onKeyPress)

getScores();