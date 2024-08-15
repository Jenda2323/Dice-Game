"use strict";

const score0Element = document.querySelector("#score--0");
const score1Element = document.querySelector("#score--1");
const diceElement = document.querySelector(".dice");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const current0Score = document.querySelector("#current--0");
const current1Score = document.querySelector("#current--1");

const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");

let currentScore = 0;
let activePlayer = 0;
let totalScore = [0, 0];

score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add("hidden");

function switchPlayer() {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle("player--active");
  player1Element.classList.toggle("player--active");
}

btnRoll.addEventListener("click", function () {
  let diceNum = Math.trunc(Math.random() * 6) + 1;
  diceElement.classList.remove("hidden");
  diceElement.src = `dice-${diceNum}.png`;

  if (diceNum !== 1) {
    currentScore += diceNum;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
});

btnHold.addEventListener("click", function () {
  totalScore[`${activePlayer}`] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    totalScore[`${activePlayer}`];
  if (totalScore[`${activePlayer}`] >= 10) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");
    diceElement.classList.add("hidden");
    btnRoll.disabled = true;
    btnHold.disabled = true;
  } else {
    switchPlayer();
  }
});
btnNew.addEventListener("click", function () {
  btnRoll.disabled = false;
  btnHold.disabled = false;
  diceElement.classList.add("hidden");
  currentScore = 0;
  totalScore = [0, 0];
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Score.textContent = 0;
  current1Score.textContent = 0;
  player0Element.classList.add("player--active");
  player1Element.classList.remove("player--active");
  player0Element.classList.remove("player--winner");
  player1Element.classList.remove("player--winner");
  activePlayer = 0;
});
