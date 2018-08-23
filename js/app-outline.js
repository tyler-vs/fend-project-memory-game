// app-outline.js
//
// possitble objects/classes?
//
// - app
// - stopwatch/timer
// - star rating
//


// app
// ---

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
  // var cards = [];
  // var openCardsCount = 0;
  // var totalOpenCardsCount = 0;
  // var userMoveCount = 0;

  var firstGuess = '';
  var secondGuess = '';
  var count = 0;
  var previousTarget = null;
  var delay = 1200;
  // var appStopwatch;
  // var modal;

  var publicAPIs = {};
  // var settings = {};


  //
  // private functions
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


  /*proposed private methods*/






  //
  // public functions
  //

  // init
  publicAPIs.init = function() {

    // run publicAPI.destroy()

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
  // inits/event listeners
  //


  // return public APIs

  return publicAPIs;


})();

