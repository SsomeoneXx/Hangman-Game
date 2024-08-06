import { wordList } from "./words.js";

const wordElement = document.querySelector(".word"),
  hintElement = document.querySelector(".hint"),
  hangmanImage = document.querySelector("img"),
  keyBoard = Array.from(document.querySelectorAll(".data-key"));

let guesses = document.querySelector(".guesses");
let currentGuesses = 0;
let word, hiddenWord, arrayOfWord;

function getRandomWord(wordList) {
  let { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  return { word: word.toUpperCase(), hint };
}

function init() {
  ({ word, hint } = getRandomWord(wordList));
  hiddenWord = Array.from(word, () => "_");
  arrayOfWord = word.split("");

  wordElement.textContent = hiddenWord.join("");
  hintElement.textContent = `Hint: ${hint}`;

  window.addEventListener("keydown", (e) => handleKey(e.key.toUpperCase()));
  keyBoard.forEach((key) => {
    key.addEventListener("click", (e) =>
      handleKey(e.target.textContent.toUpperCase())
    );
  });
}

function handleKey(key) {
  if (!/[A-Z]/.test(key) || key.length !== 1 || hiddenWord.includes(key)) {
    alert("Invalid key try again");
    return;
  }

  if (arrayOfWord.includes(key)) {
    hiddenWord.forEach((_, index) => {
      if (arrayOfWord[index] === key) hiddenWord[index] = key;
    });
    wordElement.textContent = hiddenWord.join("");
    checkInaccuracyOrAccuracy("correct", key);
  } else {
    if (currentGuesses >= 6) {
      showDefeat();
      return;
    }
    currentGuesses++;
    guesses.textContent = currentGuesses;
    hangmanImage.src = `images/hangman-${currentGuesses}.svg`;
    checkInaccuracyOrAccuracy("incorrect", key);
  }
}

function showDefeat() {
  alert("Game Over!");
}

function checkInaccuracyOrAccuracy(add_class, key) {
  keyBoard.find((keyInBoard) => {
    if (keyInBoard.textContent === key) {
      keyInBoard.classList.add(add_class);
    }
  });
}

init();
