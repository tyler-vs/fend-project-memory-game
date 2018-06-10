/**
 * app.js
 * memory game application for grow with google fend scholarship.
 * by: Tyler Van Schaick
 * date: 2018-06-10
 */


/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


/* =======================================================
 VARIABLES
 ======================================================= */

/**
 * [cardSymbols description]
 * @type {Array}
 */
var cardSymbols = [
  'diamond',
  'paper-plane-o',
  'anchor',
  'bolt',
  'cube',
  'leaf',
  'bicycle',
  'bomb',
];

/**
 * [cards description]
 * @type {Array}
 */
var cards = [];

/**
 * [openCards description]
 * @type {Array}
 */
var openCards = [];

/**
 * [openCardsValues description]
 * @type {Array}
 */
var openCardsValues = [];

/**
 * [openCardsCount description]
 * @type {Number}
 */
var openCardsCount = 0;

/**
 * [userMoveCount description]
 * @type {Number}
 */
var userMoveCount = 0;



/* =======================================================
 FUNCTIONS
 ======================================================= */

/**
 * [newGame description]
 * @return {[type]} [description]
 */
function newGame() {
  console.log('newGame(); function running.');

  // RESET STATS
  // var
  // reshuffle cards
  cards = shuffle(cardSymbols.concat(cardSymbols));

  openCards, openCardsValues = [];
  openCardsCount, userMoveCount = 0;

  // reset user moves counter
  var movesCounterEl = document.querySelector('.moves');
  movesCounterEl.textContent = userMoveCount;

  // var deckEl = document.querySelector('.deck');
  var newDeckEl = document.createElement('ul');
  newDeckEl.classList.add('deck');

  var containerEl = document.querySelector('.container');

  // reset the deck element
  console.log('New card deck: ', cards);

  // Display cheat table in browser JS console
  var consoleCheatTable = cheatTable(cards);
  if (consoleCheatTable) {
    console.table(consoleCheatTable);
  }

  // create board
  for (var i = 0; i < cards.length; i++) {

    var newCard = document.createElement('li');
    var newCardContent = document.createElement('i');

    newCardContent.classList.add('fa',`fa-${cards[i]}`);
    newCard.classList.add('card');

    // Append card content to the new card
    newCard.appendChild(newCardContent);

    console.log(newCard);

    newDeckEl.appendChild(newCard);
  } // end for loop


  // Add event delegation
  newDeckEl.addEventListener('click', function(evt){



    // Check to make sure event is only
    // if (card.nodeName.toUpperCase() !== 'LI') {
    if (!evt.target.matches('.card') || evt.target.classList.contains('match') || evt.target.classList.contains('open')) {
      return;
    }

    userMoveCount += 1;
    movesCounterEl.textContent = userMoveCount;
    updateStarRating(userMoveCount);
    evt.target.classList.add('open', 'show');



    console.log(evt.target.nodeName);
    console.log(evt.target.innerHTML);

    // if (openCardsCount != cards.length) {
      if (openCards.length == 0) {
        openCards.push(evt.target);
        var cardVal = evt.target.firstElementChild.classList;
        // if (cardVal.contains('fa')) {
        //   cardVal.remove('fa');
        // }
        console.log(cardVal);

        // console.log(cardVal)
        // openCardsValues.push()
        // openCardsCount += 2;
      } else if (openCards.length == 1) {

        openCards.push(evt.target);

        console.log(openCards.length);
        console.log(openCards[0].firstElementChild);
        console.log(openCards[1].firstElementChild);

        if (openCards[0].firstElementChild.className == openCards[1].firstElementChild.className) {
          // alert('the cards match!');
          console.log('the cards match!');

          openCards.forEach(function(openCard) {
            openCard.classList.add('match');
            openCard.classList.remove('open', 'show');
          });

          openCardsCount += 2;
          openCards = [];

          setTimeout(function() {
            if (openCardsCount === cards.length && confirm('Hurray, you have won the game!\nwould you like to play again?') ) {
              // alert('Hurray, you have won the game!');
              initTwo();
            }
          }, 500);

        } else {

          setTimeout(function(){

            // var cardA = openCards[0];
            // var cardB = openCards[1];
            openCards.forEach(function(openCard) {
              openCard.classList.remove('open', 'show');
            });

            openCards = [];

          }, 600);

        }
      }
    // }

  });

  // append deck to 'container' element
  containerEl.appendChild(newDeckEl);
};


/**
 * Shuffle function from http://stackoverflow.com/a/2450976
 * @param  {[type]} array [description]
 * @return {[type]}       [description]
 */
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};


/**
 * [cheatTable description]
 * @param  {[type]} cardsArr [description]
 * @return {[type]}          [description]
 */
function cheatTable(cardsArr) {
  var tabularLog= [];
  var tempArr = [];
  var tempCount;
  var cards = cardsArr;

  var cardsTable = cards.forEach(function(card, ind) {

    tempCount = ind + 1;

    if ( (tempCount % 4) === 0 ) {
      tempArr.push(card);
      tabularLog.push(tempArr);
      tempArr = [];
    } else {
      tempArr.push(card);
    }

  });

  return tabularLog;
}

/**
 * [updateStarRating description]
 * @param  {[type]} userMovesCountNum [description]
 * @return {[type]}                   [description]
 */
function updateStarRating(userMovesCountNum) {

  // totalCards = cards.length;
  // var ratingSystem {
  //   'Good': {
  //     stars: 1,
  //     minMoves: 30,
  //   },
  //   'Great': {
  //     stars: 2,
  //     minMoves: 24,
  //   },
  //   'Perfect': {
  //     stars: 3,
  //     minMoves: 20,
  //   },
  // };

  if (!userMovesCountNum) {
    console.warn('Error, no user moves counter number.');
    return;
  }

  if (userMovesCountNum <= 20) {
    updateStars(3);
  } else if (userMovesCountNum <= 24) {
    updateStars(2);
  } else if (userMovesCountNum <=  30) {
    updateStars(1);
  } else {
    updateStars(0);
  }
};


/**
 * [updateStars description]
 * @param  {[type]} total [description]
 * @return {[type]}       [description]
 */
function updateStars(total) {
  var stars = document.querySelectorAll('.fa-star');

  stars.forEach(function(star, index) {
    if (index < total) {
      star.classList.add('checked');
    } else {
      star.classList.remove('checked');
    }
  });
}


/**
 * function that initiates the entire script.
 * @return {[type]} [description]
 */
function init() {

  // Clear console
  console.clear();

  // Remove deck element
  var deckEl = document.querySelector('.deck');
  deckEl.remove();


  // Add event lsitener to reset button.
  var restartBtn = document.querySelector('.restart');
  if (!restartBtn) {
    console.warn('Error, could not find restart button DOM element.');
    return;
  } else {
    restartBtn.addEventListener('click', initTwo);
  }

  // Start Game
  newGame();

}; // end initTwo();

/* =======================================================
 INITIALIZATIONS AND EVENT LISTENERS
 ======================================================= */

document.addEventListener('DOMContentLoaded', init);