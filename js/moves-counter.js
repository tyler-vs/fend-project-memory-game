// reset_counter.js


var movesCounter = (function() {

  'use strict';


  //
  // VARIABLES
  //

  var count = 0;
  var defaults = {
    // selectors
    selectorMoves: '.moves',
    // class
    classInit: 'js-reset-counter',
  };

  var publicAPIs = {};


  //
  // PRIVATE METHODS
  //

  // reset user moves counter
  // render updated count
  var reset = function() {
    count = 0;
    render(count);
  };

  // render the UI element
  var render = function(num) {

    // get element
    var el = document.querySelector(defaults.selectorMoves);

    // check if exists
    if (!el) {
      return;
    }

    // return updated count
    return el.innerHTML = count;
  };


  //
  // PUBLIC METHODS
  //

  // initialize
  publicAPIs.init = function() {
    reset();
  };

  // reset, calls private reset method
  publicAPIs.reset = function() {
    reset();
  };

  // increment counter
  publicAPIs.increment = function() {
    count++;
    render(count);
  };

  // decrement counter
  publicAPIs.decrement = function() {
    count--;
    render(count);
  };

  publicAPIs.getCount = function() {
    return count;
  };

  publicAPIs.destroy = function() {
    reset();
  };

  return publicAPIs;


})();