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

    this.addEventListeners();
  }

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

  blockClicks (evt) {
    evt.stopPropagation();
  }

  showModal() {
    this.modalEl.classList.add('modal--active');
  }

  hideModal() {
    this.modalEl.classList.remove('modal--active');
  }

  updateModalContent(str) {
    this.modalContentEl.textContent = str;
  }
}