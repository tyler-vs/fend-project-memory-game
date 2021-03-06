/*
 * app.js
 *
 * - MemoryGameApp
 *   - variables
 *   - functions/methods
 *     - private
 *     - public
 *   - inits/event listeners
 */


var MemoryGameApp = (function() {

  'use strict';

  /* =======================================================
   VARIABLES
   ======================================================= */

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
  var cards = [];
  var openCardsCount = 0;
  var totalOpenCardsCount = 0;
  var userMoveCount = 0;

  var firstGuess = '';
  var secondGuess = '';
  var previousTarget = null;
  var delay = 1200;

  // External script modules
  var appStopwatch;
  var modal;

  // Public APIs Object
  var publicAPIs = {};

  // User configurable settings
  var settings = {};



  /* =======================================================
   METHODS
   ======================================================= */

  function resetGuesses() {
    openCardsCount = 0;
    firstGuess = '';
    secondGuess = '';

    // Get selected cards
    var selectedCards = document.querySelectorAll('.card.open.show');

    selectedCards.forEach(function(card) {
      card.classList.remove('open', 'show', 'animated','flipInY', 'shake', 'bounce');
    });
  }

  function match() {
    var selectedCards = document.querySelectorAll('.open.show');
    selectedCards.forEach(function(card) {
      card.classList.add('match','animated','bounce');
    });
  }

  function unmatch() {
    var selectedCards = document.querySelectorAll('.open.show');
    selectedCards.forEach(function(card) {
      card.classList.add('animated','shake');
    });
  }

  function reshuffleCards(cardSymbolsArr) {
    if (!cardSymbolsArr) {
      return;
    }

    return shuffle(cardSymbolsArr.concat(cardSymbolsArr));
  }

  function buildCard(cardItem) {
    var newCard = document.createElement('li');
    var newCardContent = document.createElement('i');

    newCardContent.classList.add('fa',`fa-${cardItem}`);
    newCard.classList.add('card');

    // Append card content to the new card
    newCard.appendChild(newCardContent);
    return newCard;
  }

  function buildBoard() {
    var deck = document.createElement('ul');
    deck.classList.add('deck');
    return deck;
  }

  function newGame() {

    updateMovesCounter(userMoveCount);
    appStopwatch = new StopWatch(document.querySelector('.score-panel'));
    // create board
    var newDeckEl = buildBoard();

    // append to container
    var containerEl = document.querySelector('.container');

    // display cheat table in browser js console
    var consoleCheatTable = cheatTable(cards);
    if (consoleCheatTable) {
      console.table(consoleCheatTable);
    }

    // generate card deck DOM elements
    for (var i = 0; i < cards.length; i++) {

      var cardLi = buildCard(cards[i]);

      newDeckEl.appendChild(cardLi);
    } // end for loop

    containerEl.appendChild(newDeckEl);


    // Add event delegation
    // newDeckEl.addEventListener('click', ;
  }

  function updateMovesCounter(num) {
    var movesCounterEl = document.querySelector('.moves');
    movesCounterEl.textContent = num;
    return;
  }

  function renderTurn(evt) {

    var clickedCard = evt.target;

    // Check to make sure event is only
    if (  !clickedCard.matches('.card') || clickedCard.classList.contains('match') || clickedCard.classList.contains('open') ) {
      return;
    }

    if (userMoveCount === 0) {
      appStopwatch.start();
    }

    if (openCardsCount < 2) {

      // increment count
      openCardsCount ++;
      userMoveCount ++;
      updateStarRating(userMoveCount);
      updateMovesCounter(userMoveCount);


      if (openCardsCount === 1) {

        firstGuess = clickedCard;
        clickedCard.classList.add('open','show','animated','flipInY');

      } else {

        secondGuess = clickedCard;
        clickedCard.classList.add('open', 'show', 'animated', 'flipInY');

        if (firstGuess !== '' && secondGuess !== '') {

          /*Old winning conditional went here.*/

          // Check if both guessed cards have the same class attrubute
          // value. If so then they match!
          if (firstGuess.firstElementChild.className === secondGuess.firstElementChild.className) {

            // Increment card count
            totalOpenCardsCount += 2;

            // Invoke match method to display match animation
            setTimeout(match, delay);
            // Invoke reset guess to display reset animation
            setTimeout(resetGuesses, delay);


            // Check if the total matched or "opened" cards count
            // is equal to the total cards in the game, indicating that
            // all cards have been matched.
            if (totalOpenCardsCount === cards.length) {

              // Stop the stopwatch timer.
              appStopwatch.stop();

              // Generate the copy/text content with the player's
              // score and congradulatory message.
              var modalContentText = 'Congrats, you have won the game with a total of ' + userMoveCount + ' moves!';

              // Update the message to be displayed in the
              // congrats popup.
              modal.updateModalContent(modalContentText);

              // Display the modal.
              // NOTE: that the modal has buttons configured
              // in it's class to either:
              // 1. Close the modal/popup leaving the user at the
              //    same screen as before the modal poped open.
              // 2. Reload the page so that the player can replay.
              //
              // Both are handled in the modal.js script.
              // TODO: Pass game modular game functionality so
              // that game can reset using it's own methods instead
              // of full page re-load.
              modal.showModal();
            } // End winning if statement.

          } else {
            setTimeout(unmatch, delay);
            setTimeout(resetGuesses, delay);
          }

        } // end if

      } // end if.. else

    } // end if
  }

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
  }





  // TODO: Re/move this function.
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





  function updateStarRating(userMovesCountNum) {

    if (!userMovesCountNum) {
      return;
    }

    // see how this works
    // https://stackoverflow.com/a/3463944
    switch (true) {
      case userMovesCountNum <= 20:
        updateStars(3);
        break;
      case userMovesCountNum <= 24:
        updateStars(2);
        break;
      case userMovesCountNum <= 30:
        updateStars(1);
        break;
      default:
        updateStars(1);
        break;
    }
  }


  function updateStars(total) {
    // Select all stars
    var stars = document.querySelectorAll('.fa-star');

    stars.forEach(function(star, index) {
      if (index < total) {
        star.classList.add('checked');
      } else {
        star.classList.remove('checked');
      }
    });
  }

  function resetBoard() {
    console.clear();
    // custom
    // Reset user counts
    userMoveCount = 0;
    totalOpenCardsCount = 0;

    // Reshuffle cards
    cards = reshuffleCards(cardSymbols);

    resetGuesses();


    var deckEl = document.querySelector('.deck');
    deckEl.remove();

    // Reset the following:
    // - timer
    // appStopwatch.reset();
    appStopwatch.destroy();
    // - stars
    updateStars(userMoveCount);
    // - gameboard
    // init(); // should come last
    newGame();

  }


  /* =======================================================
   INITIALIZATIONS AND EVENT LISTENERS
   ======================================================= */


  publicAPIs.init = function(stopwatch, modalObj) {

    // TODO: Add feature tests here
    // …

    // Initialize the stopwatch module
    // NOTE: Must pass in a dom node to use as parent element to contain
    // the stopwatch display.
    appStopwatch = new StopWatch(document.querySelector('.score-panel'));
    modal = modalObj; // new Modal();

    // Add event listeners

    // document.addEventListener('DOMContentLoaded', init);

    resetBoard();

    document.addEventListener('click', function(event) {

      // Restart evt handler
      if (event.target.closest('.restart')) {
        resetBoard();
      }

      if (event.target.matches('.card')) {
        renderTurn(event);
      }
    });
  };





  // return public apis
  return publicAPIs;

})();