"use strict";

// Select Elements
const letters = "abcdefghijklmnopqrstuvwxyz"; // English Letters
const lettersContainer = document.querySelector(".letters");
let lettersGuessContainer = document.querySelector(".letters-guess");

// #1 - Create Letters Inside Row
const lettersArray = Array.from(letters);

lettersArray.forEach((letter) => {
  let span = document.createElement("span");
  let spanText = document.createTextNode(letter);
  span.appendChild(spanText);

  span.className = "letter-box";

  lettersContainer.appendChild(span);
});

// #2 - Object Of Words + Categories
const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

// All Keys Of Object
let allKeys = Object.keys(words);

// Random Number
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
// Random Name
let randomPropName = allKeys[randomPropNumber];
// Random Property Value
let randomPropValue = words[randomPropName];

// Random Value Number
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// Random Value Name
let randomValueValue = randomPropValue[randomValueNumber];

// Set Category
document.querySelector(".category span").innerHTML = randomPropName;

// #3 - Create Letters Guess Container
let theAnswer = Array.from(randomValueValue);

theAnswer.forEach((letter) => {
  let emptySpan = document.createElement("span");

  if (letter === " ") {
    emptySpan.className = "space";
  }

  lettersGuessContainer.appendChild(emptySpan);
});

// #4 - Clicked ON Letters
let guessSpans = document.querySelectorAll(".letters-guess span");

// The Wrong Attemets
let wrongAttempts = 0;

// Get The Draw
let theDraw = document.querySelector(".hangman-draw");

document.addEventListener("click", (e) => {
  // Initialize Status and Reset Value To False
  let theStatus = false;

  // Target Letters
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    let choosenLetter = e.target.innerHTML.toLowerCase();

    // ==> The Choosen Word (theAnswer) Like Egypt In Countries
    theAnswer.forEach((wordLetter, indexLetter) => {
      if (choosenLetter == wordLetter.toLowerCase()) {
        // Change Status To Trus
        theStatus = true;

        // Loop On All Spans In Guess Letters
        guessSpans.forEach((letterSpan, indexSpan) => {
          if (indexLetter == indexSpan) {
            letterSpan.innerHTML = choosenLetter;
          }
        });
      }
    });

    // Start Check Status
    if (theStatus === false) {
      // increase Wrong Attempts
      wrongAttempts++;

      // Add Class Wrong To The Draw Elements
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      // End Game
      if (wrongAttempts === 8) {
        endGame();

        // Stop Choosing Letters
        lettersContainer.classList.add("Finished");
      }

      // play Wrong Answer Sound Effect
      document.getElementById("fali").play();
    } else {
      document.getElementById("success").play();
    }
  }
});

// Start End Game Function
function endGame() {
  let popup = document.createElement("div");
  let h3 = document.createElement("h3");

  let poputText = document.createTextNode("The Game Is Over , The Word Was");
  let h3Text = document.createTextNode(randomValueValue);
  h3.appendChild(h3Text);

  popup.appendChild(poputText);
  popup.appendChild(h3);

  h3.style.color = `#333533`;
  h3.style.marginLeft = `7px`;
  h3.style.fontSize = `45px`;
  h3.style.textTransform = `uppercase`;

  popup.className = "popup";

  document.body.appendChild(popup);

  setTimeout(loadNewURL, 5000);
}

// Function To Repeat The Game
function loadNewURL() {
  // Change the location to the new URL
  window.location.href = "http://127.0.0.1:5500/";
}
