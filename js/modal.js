/*
 * modal.js
 */


class Modal {

  constructor() {
    // DOM elements
    this.hideButtonElems = document.querySelectorAll('.js-modal-hide');
    this.resetButtonEl = document.querySelector('.js-modal-reset');
    this.modalEl = document.querySelector('.js-modal');
    this.modalWindowEl = document.querySelector('.js-modal-window');
    this.modalContentEl = document.querySelector('.modal__content .lead');
    // this.modalContent = this.modalContentEl.

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.updateModalContent = this.updateModalContent.bind(this);

    // Invoke helper function setup all event listeners.
    this.addEventListeners();
  }

  /**
   * Add event listeners for DOM Elements used/found in the
   * the constructor function.
   */
  addEventListeners() {

    // Convert node list into an array so we can use
    // array methods like `forEach`.
    this.hideButtonElems = Array.from(this.hideButtonElems);
    // Loop through each array elem to attach hideModal method
    // to each node in the array.
    this.hideButtonElems.forEach(function(elem) {
      elem.addEventListener('click', this.hideModal);
    }, this);
    // ^____ very important that `this` is passed in so that we can access
    // `this.hideModal` and attach it. See MDN article on using `thisArg` when
    //  using the forEach() Array method.

    this.modalEl.addEventListener('click', this.hideModal);
    this.modalWindowEl.addEventListener('click', this.blockClicks);
    this.resetButtonEl.addEventListener('click', this.reloadDocument);
  }

  /**
   * A psuedo-restart game function that restarts by reloading the
   * document.
   * @return {[type]} [description]
   */
  reloadDocument() {
    document.location.reload();
  }

  /**
   * Used as a utility to prevents further propagation of
   * the current event in the capturing and bubbling phases. In the
   * context of this script, it will prevent the actual modal 'window'
   * element from closing the entire modal since the modal window
   * is a child element of the modal element. Effectively still allowing
   * the user to click on the dark background when the modal is opened to
   * close the modal.
   * of the modal elem which is
   * @param  {object} evt the event object
   * @return {[type]}     [description]
   */
  blockClicks (evt) {
    evt.stopPropagation();
  }

  /**
   * Displays the modal by adding a CSS class value
   * to the modal DOM element.
   * @return {[type]} [description]
   */
  showModal() {
    this.modalEl.classList.add('modal--active');
  }

  /**
   * Hides the modal element.
   * @return {[type]} [description]
   */
  hideModal() {
    this.modalEl.classList.remove('modal--active');
  }

  /**
   * Updates the modal's content.
   * @param  {[string]} str string text to replace content.
   * @return {[type]}     [description]
   */
  updateModalContent(str) {
    this.modalContentEl.textContent = str;
  }

} // End of Modal class.