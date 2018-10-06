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
    this.hideButtonEl.addEventListener('click', this.hideModal);
    this.modalEl.addEventListener('click', this.hideModal);
    this.modalWindowEl.addEventListener('click', this.blockClicks);
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