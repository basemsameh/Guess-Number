const scoreNum = document.getElementById("scoreNum");
const startGameBtn = document.querySelector("#startGameBtn");
const levelsParent = document.getElementById('levelsParent');
const levels = document.querySelectorAll('.level div');
const rangeMessage = document.querySelector('#rangeMessage');
const formGuessNum = document.querySelector('#formGuessNum');
const userGuessNum = document.querySelector('#guess-num');
const messageToUser = document.querySelector('#messageToUser');
const submitBtn = document.querySelector("#submitBtn");
const winOrLossParent = document.getElementById('winOrLossParent');
const winOrLossMsg = document.getElementById("winOrLossMsg");
let randomNumber = 0;
let currentLevel = "";
let triesNumber = 0;

// Start Game
startGameBtn.onclick = () => {
  levelsParent.classList.toggle('hide');
  startGameBtn.classList.toggle('hide');
}

// Select level to play
levels.forEach(level => {
  level.onclick = () => {
    currentLevel = level.getAttribute("data-target");
    levelsParent.classList.toggle('hide');
    formGuessNum.classList.toggle('hide');
    checkFromCurrentLevel();
    userGuessNum.focus = true;
  }
})

// Action based on selected level from user
function checkFromCurrentLevel() {
  if (currentLevel === 'easy') {
    triesNumber = 10;
    checkNumerOfTries(triesNumber);
    rangeMessage.textContent = "Guess number from 1 to 50";
    randomNumber = Math.floor(Math.random() * 50) + 1;
  } else if (currentLevel === 'medium') {
    triesNumber = 7;
    checkNumerOfTries(triesNumber);
    rangeMessage.textContent = "Guess number from 1 to 100";
    randomNumber = Math.floor(Math.random() * 100) + 1;
  } else {
    triesNumber = 5;
    checkNumerOfTries(triesNumber);
    rangeMessage.textContent = "Guess number from 1 to 200";
    randomNumber = Math.floor(Math.random() * 200) + 1;
  }
}

// Add circle icons based on number of tries
function checkNumerOfTries(num) {
  document.querySelector('.tries').innerHTML = '';
  for (let i = 0; i < num; i++) {
    document.querySelector('.tries').innerHTML += `<i class="fa-solid fa-circle mx-1"></i>`;
  }
}

// Part of form
document.forms[0].onsubmit = (btn) => {
  btn.preventDefault();
}

submitBtn.onclick = () => {
  if (userGuessNum.value !== '') {
    if (randomNumber > +userGuessNum.value) {
      messageToUser.textContent = `Your number [ ${userGuessNum.value} ] is low! Try again.`;
      succesOrDangerClass('danger');
    } else if (randomNumber < +userGuessNum.value) {
      messageToUser.textContent = `Your number [ ${userGuessNum.value} ] is high! Try again.`;
      succesOrDangerClass('danger');
    } else {
      messageToUser.textContent = `Congratulations! Your number [ ${userGuessNum.value} ] is correct.`;
      succesOrDangerClass('success');
    }
    userGuessNum.value = '';
    userGuessNum.focus = true;
  }
}

// Send guide message to user after entered his guess number
function succesOrDangerClass(type) {
  if (type === 'success') {
    messageToUser.classList.remove('text-danger');
    messageToUser.classList.add('text-success');
    formGuessNum.classList.toggle("hide");
    winOrLossParent.classList.toggle("hide");
    winOrLossMsg.textContent = '"You Win" 🎉🎉';
    document.getElementById("randomNumber").textContent = `Number = ${randomNumber}`;
    changeScoreNumber('win');
  } else {
    messageToUser.classList.remove('text-success');
    messageToUser.classList.add('text-danger');
    decreaseNumberOfTries();
  }
}

// Decrease number of tries
function decreaseNumberOfTries() {
  triesNumber -= 1;
  checkNumerOfTries(triesNumber);
  if (currentLevel === 'easy') {
    fillEmptyCirlces(10 - triesNumber);
  } else if (currentLevel === 'medium') {
    fillEmptyCirlces(7 - triesNumber);
  } else {
    fillEmptyCirlces(5 - triesNumber);
  }

  if (triesNumber === 0) {
    formGuessNum.classList.toggle("hide");
    winOrLossParent.classList.toggle("hide");
    winOrLossMsg.textContent = '"You Lose" 😥';
    document.getElementById("randomNumber").textContent = `Number = ${randomNumber}`;
    changeScoreNumber('lose');
  }
}

// Fill empty circles ( tries that lost by user )
function fillEmptyCirlces(num) {
  for (let i = 0; i < num; i++) {
    document.querySelector('.tries').innerHTML += `<i class="fa-regular fa-circle mx-1"></i>`;
  }
}

// Give score based on the current level
function changeScoreNumber(state) {
  let score = +scoreNum.textContent;
  if (state === 'lose') {
    if (score >= 5) {
      scoreNum.textContent = score - 5;
    }
  } else {
    if (currentLevel === 'easy') {
      scoreNum.textContent = score + 5;
    } else if (currentLevel === 'medium') {
      scoreNum.textContent = score + 10;
    } else {
      scoreNum.textContent = score + 15;
    }
  }
  saveScoreData();
}

// PLay again button
document.getElementById("playAgainBtn").onclick = () => {
  messageToUser.textContent = "";
  levelsParent.classList.toggle('hide');
  winOrLossParent.classList.toggle("hide");
}

// Close Window Button
document.getElementById("closeGame").onclick = () => {
  window.close();
}

// Save Score Data
function saveScoreData() {
  sessionStorage.setItem("score", JSON.stringify(scoreNum.textContent));
  scoreNum.textContent = JSON.parse(sessionStorage.getItem("score"));
}

// Check if there is stored data in session storage for Score number
function checkIfThereIsScoreData() {
  let storedDate = sessionStorage.getItem("score");
  if (storedDate) {
    scoreNum.textContent = JSON.parse(storedDate);
  } else {
    scoreNum.textContent = 0;
  }
}

checkIfThereIsScoreData();