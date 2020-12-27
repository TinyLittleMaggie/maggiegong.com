/* -----------------------------------------------------------------------------
 Initialising global variables
 ----------------------------------------------------------------------------- */

// An array to store the HTML code to put inside the front side of each card
const symbols = [
  '<i class="fa fa-star"></i>', '<i class="fa fa-star"></i>',
  '<i class="fas fa-moon"></i>', '<i class="fas fa-moon"></i>',
  '<i class="fas fa-cloud"></i>', '<i class="fas fa-cloud"></i>',
  '<i class="fas fa-fish"></i>', '<i class="fas fa-fish"></i>',
  '<i class="fa fa-heart"></i>', '<i class="fa fa-heart"></i>',
  '<i class="fas fa-cannabis"></i>', '<i class="fas fa-cannabis"></i>',
  '<i class="fas fa-paw"></i>', '<i class="fas fa-paw"></i>',
  '<i class="fas fa-bone"></i>', '<i class="fas fa-bone"></i>'
];

// Select the cards so the shuffled symbols can be placed inside later on
const cards = document.querySelectorAll('.card');

// Use a variable to count the number of moves.
let moves = 0;

// Use another variable to count the matched pairs.
let matchedPairs = 0;

// Use a variable to record time (in seconds) since the first click.
let time = 0;

// Variables that store minutes and seconds
let minutes = 0;
let seconds = 0;

// Record current timer state (on or off)
let timerOn = false;

// Variable that stores the setInterval()
let timer;

// Use an array to store the cards that are clicked.
let clickedCards = [];

/* -----------------------------------------------------------------------------
 Declaring functions
 ----------------------------------------------------------------------------- */

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function shuffleCards() {
  shuffle(symbols);
  for (let i = 0; i < 16; i++) {
    cards[i].firstElementChild.innerHTML = symbols[i];
  }
}

function resetMemoryGame() {
  moves = 0;
  matchedPairs = 0;
  time = 0;
  minutes = 0;
  seconds = 0;
  timerOn = false;
  clickedCards = [];
  clearInterval(timer);

  // make sure all cards are flipped over before shuffling the cards
  for (let i = 0; i < 16; i++) {
    cards[i].classList = 'card';
  }

  setTimeout(function() {
    shuffleCards();
  }, 500);

  // Reset number of moves:
  document.querySelector('.moveCounter').innerHTML = "0 moves";
  // Reset timer display:
  document.querySelector('.timer').innerHTML = "00:00";
  // Reset star rating:
  // document.querySelector('.starRating').innerHTML =
  //   `<i class="fas fa-star"></i>
  // <i class="fas fa-star"></i>
  // <i class="fas fa-star"></i>`;
}

function startTimer() {
    timer = setInterval(function() {
    time++;
    minutes = ("0" + Math.floor(time / 60)).slice(-2);
    seconds = ("0" + time % 60).slice(-2);
    document.querySelector('.timer').innerHTML = minutes + ":" + seconds;
  }, 1000);
}

function starRate(moves) {
  let stars;
  if (moves < 32) {
    stars =
    `<i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="fas fa-star"></i>`;
  }
  else if (moves >= 32 && moves <= 38) {
    stars =
    `<i class="fas fa-star"></i>
    <i class="fas fa-star"></i>
    <i class="far fa-star"></i>`;
  } else if (moves > 38 && moves <= 46) {
    stars =
    `<i class="fas fa-star"></i>
    <i class="far fa-star"></i>
    <i class="far fa-star"></i>`;
  } else if (moves > 46) {
    stars =
    `<i class="far fa-star"></i>
    <i class="far fa-star"></i>
    <i class="far fa-star"></i>`;
  }
  return stars;
}

function generateComment(moves) {
  if (moves < 32) {
    return "Genius!";
  } else if (moves >= 32 && moves <= 38) {
    return "Astounding!"
  } else {
    return "Well done!"
  }
}

function winningPopUp(moves, time) {
  let popUp = document.querySelector('#project-3 .winningPopUp');
  popUp.style.visibility = "visible";
  popUp.querySelector('.popUpComment').innerHTML = generateComment(moves);
  popUp.querySelector('.popUpTime').innerHTML = "You won the game in " + time + " seconds!";
  popUp.querySelector('.popUpStars').innerHTML = starRate(moves);
}

/* -----------------------------------------------------------------------------
 Where the real thing begins
 ----------------------------------------------------------------------------- */

// Initialise the game once the page is loaded
resetMemoryGame();

// Add an Event Listener to each card so that when they're clicked, they flip over.
// TODO: use event delegation & package reusable code into functions
for (let i = 0; i < 16; i++) {
  cards[i].addEventListener('click', function() {

    // Start the timer on the first click
    if (timerOn === false) {
      startTimer();
      timerOn = true;
    }

    // Actions to take once a valid click is performed:
    if (clickedCards.length < 2) { // This condition prevents the player from clicking a third card while the comparison is still in progress

      // Flip the card being clicked
      if (!cards[i].classList.contains('show')) { // This condition prevents the player from clicking on a showing card
        moves++;
        clickedCards.push(cards[i]);
        cards[i].classList.add('show');
      }

      // Matching logic
      if (clickedCards.length === 2) { // comparison only happens when the clickedCards array has 2 elements
        let currentSymbol = clickedCards[0].querySelector('i').classList.value;
        let previousSymbol = clickedCards[1].querySelector('i').classList.value;
        if (currentSymbol === previousSymbol) {
          matchedPairs++;
          setTimeout(function() { // clear up the array once the comparison is done
            clickedCards = [];
          }, 300);
        } else {
          clickedCards[0].querySelector('.front').classList.add('wrong');
          clickedCards[1].querySelector('.front').classList.add('wrong');
          setTimeout(function() {
            clickedCards[0].classList.remove('show');
            clickedCards[1].classList.remove('show');
          }, 1000);
          setTimeout(function() {
            clickedCards[0].querySelector('.front').classList.remove('wrong');
            clickedCards[1].querySelector('.front').classList.remove('wrong');
          }, 1200);
          setTimeout(function() { // clear up the array once the comparison is done
            clickedCards = [];
          }, 1300);
        }

        // Updating the star rating in real time:
        // let emm = moves + (8 - matchedPairs) * 2; // Estimated mimimum moves: If the player plays all remaining cards perfectly, (s)he will have made this many moves when (s)he wins.
        // if (emm >= 32 && emm <= 38) {
        //   document.querySelector('.starRating').innerHTML =
        //     `<i class="fas fa-star"></i>
        //   <i class="fas fa-star"></i>
        //   <i class="far fa-star"></i>`;
        // } else if (emm > 38 && emm <= 46) {
        //   document.querySelector('.starRating').innerHTML =
        //     `<i class="fas fa-star"></i>
        //   <i class="far fa-star"></i>
        //   <i class="far fa-star"></i>`;
        // } else if (emm > 46) {
        //   document.querySelector('.starRating').innerHTML =
        //     `<i class="far fa-star"></i>
        //   <i class="far fa-star"></i>
        //   <i class="far fa-star"></i>`;
        // }
      }
    }

    // Display number of moves to the page:
    document.querySelector('.moveCounter').innerHTML = moves + " moves";

    // Check for the winning condition:
    if (matchedPairs === 8) {
      winningPopUp(moves, time);
      clearInterval(timer);
      timerOn = false;
    }

  });
}

// Add an event listener to the reset button
const resetButton = document.querySelector('.resetButton');
resetButton.addEventListener('click', function() {
  resetMemoryGame();
});


// Add an event listener to the "play again" button
const playAgain = document.querySelector('.playAgainButton');
playAgain.addEventListener('click', function() {
  let popUp = document.querySelector('#project-3 .winningPopUp');
  popUp.style.visibility = "hidden";
  resetMemoryGame();
});
