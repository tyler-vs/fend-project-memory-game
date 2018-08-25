/**
 * app-outline.js
 */


var MemoryGameApp = (function() {

  'use strict';

  //
  // VARIABLES
  //

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

  var firstGuess = '';
  var secondGuess = '';
  var count = 0;
  var previousTarget = null;
  var delay = 1200;
  var cards = [];
  var userMovesCount = 0;

  var publicAPIs = {};


  //
  // PRIVATE FUNCTIONS
  //

  // reset guesses
  var resetGuesses = function() {
    firstGuess = '';
    secondGuess = '';
    count = 0;

    var selectedCards = document.querySelectorAll('.card.open.show');
    selectedCards.forEach(function(card) {
      card.classList.remove('open', 'show', 'animated','flipInY', 'shake', 'bounce');
    });
  };

  // shuffle (helper)
  var shuffle = function(array) {
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

  // reshuffle (helper)

  // delete deck
  var deleteDeck = function() {
    var deck = document.querySelector('.deck');
    if (! deck) {
      console.log('no deck to remove');
      return;
    }
    console.log('removing deck');
    deck.remove();
    return;
  }

  // create deck
  var createDeck = function() {
    var deck = document.querySelector('.deck');
    var containerEl = document.querySelector('.container');
    cards = shuffle(cardSymbols.concat(cardSymbols));
    var consoleCheatTable = cheatTable(cards);

    if (deck) {
      console.log('a deck already exists!');
      return;
    }

    deck = document.createElement('ul');
    deck.setAttribute('class', 'deck');

    cards.forEach( function(element, index) {
      // let newCard = createCard(element);
      deck.appendChild(createCard(element));
    });


    if (consoleCheatTable) {
      console.table(consoleCheatTable);
    }

    containerEl.appendChild(deck);
    return;
  }

  // create card
  var createCard = function(cardItem) {
    var newCard = document.createElement('li');
    var newCardContent = document.createElement('i');

    newCardContent.classList.add('fa',`fa-${cardItem}`);
    newCard.classList.add('card');

    // Append card content to the new card
    newCard.appendChild(newCardContent);
    return newCard;
  }

  // match
  var match = function() {
    var selectedCards = document.querySelectorAll('.open.show');
    selectedCards.forEach(function(card) {
      card.classList.add('match','animated','bounce');
    });

    // Check if a winner
    if (isWinner()) {
      alert('Hurray, you won!');
    }
  };

  // unmatch
  var unmatch = function() {
    var selectedCards = document.querySelectorAll('.open.show');
    selectedCards.forEach(function(card) {
      card.classList.add('animated','shake');
    });
  };

  // isWinner
  var isWinner = function() {
    var selectedCards = document.querySelectorAll('.card.match');
    if (selectedCards.length === cards.length) {
      return true;
    }
    return false;
  };

  // updateMoveCounter
  var updateMoveCounter = function() {
    // Update user moves counter variable
    userMovesCount++;
    // Select element to update
    var moveCounterEl = document.querySelector('.moves');

    moveCounterEl.innerHTML = userMovesCount;
    return;
  }

  // renderTurn
  function renderTurn(event) {
    var clickedCard = event.target;

    // Check to make sure event is only
    if (  !clickedCard.matches('.card')
        || clickedCard.classList.contains('match')
        || clickedCard.classList.contains('open') ) {
      return;
    }


    // if there are less than 2 opened cards counted
    if (count < 2) {

      // increment count
      count++;
      updateMoveCounter();

      // if there is one card opened
      if (count === 1) {

        // save as first guess
        firstGuess = clickedCard.firstElementChild.className;
        clickedCard.classList.add('open','show','animated','flipInY');

      } else {
        // save as second guess
        secondGuess = clickedCard.firstElementChild.className;
        clickedCard.classList.add('open', 'show', 'animated', 'flipInY');
      }

      // check that both first and second guesses are not empty
      if (firstGuess !== '' && secondGuess !== '') {
        // check if first and second guess are the same
        if (firstGuess === secondGuess) {


          // match guesses
          setTimeout(match, delay);
          setTimeout(resetGuesses, delay);

        } else {
          // unmatch guesses
          setTimeout(unmatch, delay);
          setTimeout(resetGuesses, delay);
        }
      }

      previousTarget = clickedCard;
    }
  };

  // cheat table logger
  var cheatTable = function(cardsArr) {
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
  };


  //
  // PUBLIC FUNCTIONS
  //


  // init
  publicAPIs.init = function() {

    // run publicAPI.destroy()
    console.log('running init');

    deleteDeck();

    createDeck();

    // setTime(this.createDeck, this.delay);

    // feature test

    // merge user options

    // add event listeners
    document.addEventListener('click', renderTurn, false);

    // run gameStart

  };

  // destroy
  publicAPIs.destroy = function() {

    console.log('running destroy.');

    // only run is settings is set
    if(!settings) {
      return;
    }

    // remove event listeners

    // remove plugin code

    // remove initializaions CSS class attributes

    // remove settings

  };

  // ??reset??


  //
  // INITS/EVENT LISTENERS
  //


  // return public APIs

  return publicAPIs;


})();

