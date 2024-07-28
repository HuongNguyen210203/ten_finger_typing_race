let words = [
    "There", "is", "a", "legend", "about", "a", "bird", "which", "sings", "just",
    "once", "in", "its", "life,", "more", "sweetly", "than", "any", "other",
    "creature", "on", "the", "face", "of", "the", "earth.", "From", "the",
    "moment", "it", "leaves", "the", "nest", "it", "searches", "for", "a",
    "thorn", "tree,", "and", "does", "not", "rest", "until", "it", "has",
    "found", "one.", "Then,", "singing", "among", "the", "savage", "branches,",
    "it", "impales", "itself", "upon", "the", "longest,", "sharpest", "spine.",
    "And,", "dying,", "it", "rises", "above", "its", "own", "agony", "to",
    "outcarol", "the", "lark", "and", "the", "nightingale.", "One",
    "superlative", "song,", "existence", "the", "price.", "But", "the",
    "whole", "world", "stills", "to", "listen,", "and", "God", "in", "His",
    "heaven", "smiles.", "For", "the", "best", "is", "only", "bought", "at",
    "the", "cost", "of", "great", "pain…", "Or", "so", "says", "the",
    "legend"
];

let title = document.getElementById("title");
let wordDisplay = document.getElementById("word-display");
let inputField = document.getElementById("input-field");
let scoreElement = document.getElementById("score-value");
let timerElement = document.getElementById("timer");

let score = 0;
let currentWord = '';
let interval;
let countdown;

function startTimer() {
    let timeLeft = 10;
    timerElement.innerText = timeLeft;
    countdown = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdown);
            score--;
            scoreElement.innerText = score;
            wordDisplay.style.color = 'orange';
            setTimeout(updateWord, 500); // Wait a moment before showing the next word
        }
    }, 1000);
}

function updateWord() {
    index = Math.floor(Math.random() * words.length);
    currentWord = words[index];
    wordDisplay.innerText = currentWord;
    wordDisplay.style.color = 'black'; // Reset color
    inputField.value = '';
    clearInterval(interval);
    clearInterval(countdown);
    startTimer();
}

inputField.addEventListener("keydown", function (event) {
    if (event.key === 'Enter') {
        clearInterval(countdown);
        if (inputField.value.trim().toLowerCase() === currentWord.toLowerCase()) {
            score++;
            wordDisplay.style.color = 'green'; // Correct word color
        } else {
            score--;
            wordDisplay.style.color = 'red'; // Incorrect word color
        }
        scoreElement.innerText = score;
        setTimeout(updateWord, 500); // Wait a moment before showing the next word
    }
});

function findKeyElement(key) {
    return document.getElementById(`key-${key.toLowerCase()}`);
}

document.addEventListener('keydown', function (event) {
    let keyElement = findKeyElement(event.key);
    if (keyElement) {
        keyElement.classList.add('keyboard__key--active');
    }
});

document.addEventListener('keyup', function (event) {
    let keyElement = findKeyElement(event.key);
    if (keyElement) {
        keyElement.classList.remove('keyboard__key--active');
    }
});

updateWord(); // Initialize the first word
