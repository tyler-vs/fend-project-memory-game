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
  var delay = 700;
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
    // Reset variables back
    openCardsCount = 0;
    firstGuess = '';
    secondGuess = '';

    // Get selected cards
    var selectedCards = document.querySelectorAll('.card.open.show');

    selectedCards.forEach(function(card) {
      card.classList.remove('open', 'show', 'animated','flipInY', 'shake', 'bounce');
    });
  };

  function match() {
    var selectedCards = document.querySelectorAll('.open.show');
    selectedCards.forEach(function(card) {
      card.classList.add('match','animated','bounce');
    });
  };

  function unmatch() {
    var selectedCards = document.querySelectorAll('.open.show');
    selectedCards.forEach(function(card) {
      card.classList.add('animated','shake');
    });
  };

  function reshuffleCards(cardSymbolsdArr) {
    if (!cardSymbolsdArr) {
      return;
    }

    return shuffle(cardSymbolsdArr.concat(cardSymbolsdArr));
  };

  function newGame() {

    // Reset things

    // Reshuffle cards
    cards = reshuffleCards(cardSymbols);

    resetGuesses();

    totalOpenCardsCount = 0;

    // reset user moves counter
    var movesCounterEl = document.querySelector('.moves');
    movesCounterEl.textContent = userMoveCount;

    // create board
    var newDeckEl = document.createElement('ul');
    newDeckEl.classList.add('deck');

    // append to container
    var containerEl = document.querySelector('.container');

    console.log('New card deck: ', cards);

    // display cheat table in browser js console
    var consoleCheatTable = cheatTable(cards);
    if (consoleCheatTable) {
      console.table(consoleCheatTable);
    }

    // generate card deck DOM elements
    for (var i = 0; i < cards.length; i++) {

      var newCard = document.createElement('li');
      var newCardContent = document.createElement('i');

      newCardContent.classList.add('fa',`fa-${cards[i]}`);
      newCard.classList.add('card');

      // Append card content to the new card
      newCard.appendChild(newCardContent);

      // console.log(newCard);

      newDeckEl.appendChild(newCard);
    } // end for loop

    containerEl.appendChild(newDeckEl);


    // Add event delegation
    newDeckEl.addEventListener('click', function(evt){

      var clickedCard = evt.target;

      // Check to make sure event is only
      if (  !clickedCard.matches('.card')
          || clickedCard.classList.contains('match')
          || clickedCard.classList.contains('open') ) {
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
        movesCounterEl.textContent = userMoveCount;

        if (openCardsCount === 1) {

          firstGuess = clickedCard;
          console.log(`first guess was ${firstGuess.firstElementChild.className}.`);
          // clickedCard.classList.add('open', 'show');
          clickedCard.classList.add('open','show','animated','flipInY');

        } else {

          secondGuess = clickedCard;
          // clickedCard.classList.add('open', 'show');
          clickedCard.classList.add('open', 'show', 'animated', 'flipInY');

          if (firstGuess !== '' && secondGuess !== '') {
            if (firstGuess.firstElementChild.className === secondGuess.firstElementChild.className) {

              totalOpenCardsCount += 2;
              console.log(`the total open cards count is at: ${totalOpenCardsCount}.`);

              // winning conditional
              if (totalOpenCardsCount === cards.length) {
                appStopwatch.stop();

                setTimeout(function() {
                  match();
                  resetGuesses();
                  // appStopwatch.reset();

                  // display modal window
                  // var modalEl = document.querySelector('.modal');
                  // var modalContent = document.querySelector('.modal-window__content');

                  // modalEl.classList.add('modal--active');
                  var modalContentText = `Congrats, you have won the game with a total of ${userMoveCount} moves!`;

                  modal.updateModalContent(modalContentText);
                  // var pEl = document.createElement('p');
                  // pEl.appendChild(document.createTextNode(modalContentText));
                  // modalContent.appendChild(pEl);
                  modal.showModal();

                  setTimeout(function() {



                    if (confirm('Congrats, you have won the game!')) {
                      appStopwatch.destroy();
                      modal.hideModal();
                      init();

                    } else {
                      modal.hideModal();
                      alert('Next time!');
                    }
                  }, delay);
                }, delay);
              } else {
                setTimeout(match, delay);
                setTimeout(resetGuesses, delay);
              } // end if.. else

            } else {
              setTimeout(unmatch, delay);
              setTimeout(resetGuesses, delay);
            } // end if..else

          } // end if

        } // end if.. else

      } // end if

    });
  };


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

    switch (true) {
      case userMovesCountNum <= 20:
        updateStars(3);
        // statements_1
        break;
      case userMovesCountNum <= 24:
        updateStars(2);
        // statements_1
        break;
      case userMovesCountNum <= 30:
        updateStars(1);
        // statements_1
        break;
      default:
        // statements_def
        updateStars(0);
        break;
    }

  };


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


  function init() {

    // Clear console
    console.clear();

    userMoveCount = 0;
    updateStars(userMoveCount);
    // new timer
    var parEl = document.querySelector('.score-panel');
    appStopwatch = new StopWatch(parEl);

    // if (appStopwatch !== undefined || appStopwatch !== null) {
    // } else {

    // }

    // Remove deck element
    var deckEl = document.querySelector('.deck');
    deckEl.remove();


    // var myModal = new Modal();
    // Hide the modal element
    // var modal = document.querySelector('.modal');
    var getModal = document.querySelector('modal');
    if (getModal) {
      getModal.remove();
      getModal = null;
    }
    modal = new Modal();
    // modal.classList.remove('modal--active');


    // Add event lsitener to reset button.
    var restartBtn = document.querySelector('.restart');
    if (!restartBtn) {
      console.warn('Error, could not find restart button DOM element.');
      return;
    } else {
      restartBtn.addEventListener('click', function() {
        // app
        appStopwatch.destroy();
        // appStopwatch.destroy();
        init();
      });
    }

    // Start Game
    newGame();

  };


  /* =======================================================
   INITIALIZATIONS AND EVENT LISTENERS
   ======================================================= */


  publicAPIs.init = function() {

    // feature tests

    // add event listeners
    document.addEventListener('DOMContentLoaded', init);

  }



  // return public apis
  return publicAPIs;

})();