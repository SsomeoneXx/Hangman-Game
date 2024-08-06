import { wordList } from "./words.js";

const wordElement = document.querySelector(".word"),
  hintElement = document.querySelector(".hint"),
  hangmanImage = document.querySelector("img"),
  keyBoard = Array.from(document.querySelectorAll(".data-key"));

let guesses = document.querySelector(".guesses");
let currentGuesses = 0;

function getRandomWord(wordList) {
  let { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  return { word: word.toUpperCase(), hint };
}

function init() {
  let { word, hint } = getRandomWord(wordList);
  let hiddenWord = Array.from(word, (x) => "_");

  wordElement.textContent = hiddenWord.join("");
  hintElement.textContent = `Hint : ${hint}`;

  window.addEventListener("keydown", (e) => {
    keyBoardFunctionalities(word, hiddenWord, e.key.toUpperCase());
  });
  keyBoard.forEach((key) => {
    key.addEventListener("click", (e) => {
      keyBoardFunctionalities(
        word,
        hiddenWord,
        e.target.textContent.toUpperCase()
      );
    });
  });
}
init();

function keyBoardFunctionalities(word, hiddenWord, key) {
  let arrayOfWord = word.split("");

  if (!/[A-Z]/.test(key) || key.length !== 1 || hiddenWord.includes(key)) {
    alert("Invalid key try again");
    return;
  }

  if (!arrayOfWord.includes(key)) {
    checkInaccuracyOrAccuracy("incorrect", key);
  }
  if (arrayOfWord.includes(key)) {
    arrayOfWord.forEach((letter, index) => {
      if (letter === key) {
        hiddenWord[index] = key;
        checkInaccuracyOrAccuracy("correct", key);
      }
    });
    wordElement.textContent = hiddenWord.join("");
  } else {
    if (currentGuesses == 6) {
      showDefeat();
      return;
    }
    currentGuesses++;
    guesses.textContent = currentGuesses;
    hangmanImage.src = `images/hangman-${currentGuesses}.svg`;
  }
}
function showDefeat() {}

function checkInaccuracyOrAccuracy(add_class, key) {
  keyBoard.find((keyInBoard) => {
    if (keyInBoard.textContent == key) {
      keyInBoard.classList.add(add_class);
    }
  });
}
