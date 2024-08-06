'use strict';
const scoreOEl = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const currentScoreOEl = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');

const section0PlayerEl = document.querySelector('.player--0');
const section1PlayerEl = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function(){
   document.querySelector('.player--0').classList.remove('player--winner');
   document.querySelector('.player--1').classList.remove('player--winner');
   document.querySelector('.player--1').classList.remove('player--active');
   document.querySelector('.player--0').classList.add('player--active');

   scoreOEl.textContent = 0;
   score1El.textContent = 0;
   currentScoreOEl.textContent = 0;
   currentScore1El.textContent = 0;
   diceEl.classList.add('hidden');
   
   scores = [0, 0];
   playing = true;
   activePlayer = 0;
   currentScore = 0;
}

const switchPlayer = function(){
currentScore = 0;
document.getElementById(`current--${activePlayer}`).textContent = currentScore;
activePlayer = activePlayer === 0 ? 1 : 0;
document.getElementById(`current--${activePlayer}`).textContent = currentScore;
section0PlayerEl.classList.toggle('player--active');
section1PlayerEl.classList.toggle('player--active');
}

// Initial state of the game
init();

// Roll the dice
btnRollDice.addEventListener('click', function(){
   if (playing) {
   const dice = Math.trunc(Math.random()* 6) + 1;
   diceEl.src = `dice-${dice}.png`;
   diceEl.classList.remove('hidden');
   if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
   }
   else {
      switchPlayer();
      }
   }
})

// Hold the game
btnHold.addEventListener('click', function(){
   if (playing) {
      scores[activePlayer] += currentScore;
      document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
      
      if (scores[activePlayer] >= 100) {
         playing = false;
         diceEl.classList.add('hidden');
         document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
         document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      }
      else{
         switchPlayer();
      }
      
   }
})

// Reset the game
btnNewGame.addEventListener('click', init)