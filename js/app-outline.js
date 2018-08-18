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
  var cards = [];
  var openCardsCount = 0;
  var totalOpenCardsCount = 0;
  var userMoveCount = 0;
  var firstGuess = '';
  var secondGuess = '';
  var delay = 700;
  var appStopwatch;
  var modal;

  var publicAPIs = {};
  var settings = {};


  //
  // private functions
  //

  // reset guesses

  // match

  // unmatch

  // shuffle (helper)

  // reshuffle (helper)

  // update star rating system

  // update stars








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

