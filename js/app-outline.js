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
  function resetGuesses() {
    firstGuess = '';
    secondGuess = '';
    count = 0;
  }

  // match

  // unmatch

  // shuffle (helper)
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

  // reshuffle (helper)

  // delete deck
  function deleteDeck() {
    var deck = document.querySelector('.deck');
    if (! deck) {
      console.log('no deck to remove');
      return;
    }
    console.log('removing deck');
    deck.remove();
    return;
  }


  //
  // PUBLIC FUNCTIONS
  //


  // init
  publicAPIs.init = function() {

    // run publicAPI.destroy()
    console.log('running init');
    deleteDeck();

    // feature test

    // merge user options

    // add event listeners

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

