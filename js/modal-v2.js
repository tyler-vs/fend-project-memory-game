/*
 * modal-v2.js
 */


var popup = (function() {
  'use strict';

  //
  // VARIABLES
  //
  var defaults = {
    // selectors
    hideButtonEl: '.js-modal-hide',
    modalEl: '.js-modal',
    modalWindowEl: '.js-modal-window',
    modalContentEl: '.modal__content .lead',

    // states
    modalActiveClass: 'modal--active',
  }

  var publicAPIs = {};


  //
  // PRIVATE METHODS
  //

  var handleClickEvents = function(event) {
    var target = event.target;

    if (target.matches(defaults.hideButtonEl)) {
      hideModal()
    }

    if (target.matches(defaults.modalEl)) {
      evt.stopPropagation();
    }
  }

  var getModal = function() {
    var modalEl = document.querySelector(defaults.modalEl);
    return modalEl;
  }

  var showModal = function() {
    var modal = getModal();
    modal.classList.add(defaults.modalActiveClass);
  }

  var hideModal = function() {
    var modal = getModal();
    modal.classList.remove(defaults.modalActiveClass);
  }


  //
  // PUBLIC METHODS
  //

  publicAPIs.init = function() {
    document.addEventListener('click', handleClickEvents);
  }

  publicAPIs.destroy = function() {
    document.removeEventListener('click', handleClickEvents);
  }

  publicAPIs.hideModal = function() {
    hideModal();
  }

  publicAPIs.showModal = function() {
    showModal();
  }


  return publicAPIs;


})();
