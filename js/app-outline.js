/**
 * app-outline.js
 */


var MemoryGameApp = (function() {

  'use strict';

  //
  // variables
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
    var cards = shuffle(cardSymbols.concat(cardSymbols));

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
  };

  // unmatch
  var unmatch = function() {
    var selectedCards = document.querySelectorAll('.open.show');
    selectedCards.forEach(function(card) {
      card.classList.add('animated','shake');
    });
  };

  // run script
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

      // if there is a count of 1 open card
      if (count === 1) {

        firstGuess = clickedCard;
        clickedCard.classList.add('open','show','animated','flipInY');

      } else {

        secondGuess = clickedCard;
        clickedCard.classList.add('open', 'show', 'animated', 'flipInY');

        if (firstGuess !== '' && secondGuess !== '') {

          if (firstGuess.firstElementChild.className === secondGuess.firstElementChild.className) {

            if (totalOpenCardsCount === cards.length) {

              setTimeout(function() {
                match();
                resetGuesses();

                setTimeout(function() {

                  if (confirm('Congrats, you have won the game!')) {
                    alert('alright, lets play again!');
                    resetBoard();
                  } else {
                    alert('Next time!');
                  }
                }, delay);
              }, delay);
            } else {
              setTimeout(match, delay);
              setTimeout(resetGuesses, delay);
            }
          } else {
            setTimeout(unmatch, delay);
            setTimeout(resetGuesses, delay);
          }
        }
      }
    }
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

  }

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

  }

  // ??reset??


  //
  // INITS/EVENT LISTENERS
  //


  // return public APIs

  return publicAPIs;


})();

