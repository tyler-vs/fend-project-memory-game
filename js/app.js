
function init() {

  /*
   * Create a list that holds all of your cards
   */

  var deckEl = document.querySelector('.deck');
  var restartBtn = document.querySelector('.restart');
  var myArr = [
    'diamond',
    'diamond',
    'paper-plane-o',
    'paper-plane-o',
    'anchor',
    'anchor',
    'bolt',
    'bolt',
    'cube',
    'cube',
    'leaf',
    'leaf',
    'bicycle',
    'bicycle',
    'bomb',
    'bomb'
  ];

  console.log(myArr.length); // 8

  /*
   * Display the cards on the page
   *   - shuffle the list of cards using the provided "shuffle" method below
   *   - loop through each card and create its HTML
   *   - add each card's HTML to the page
   */

  function displayCards() {

    // Shuffle function from http://stackoverflow.com/a/2450976
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
    }

    console.log(shuffle(myArr));

    // remove cards from the deck element
    deckEl.innerHTML = '';

    for (var i = 0; i <= myArr.length - 1; i++) {
      var cardEl = document.createElement('li');
      var cardIconEl = document.createElement('i');

      cardEl.classList.add('card');
      cardEl.classList.add('show'); // debugging, add show card class
      cardIconEl.classList.add('fa');
      cardIconEl.classList.add(`fa-${myArr[i]}`);

      cardEl.appendChild(cardIconEl);

      deckEl.appendChild(cardEl);
    }
  }

  displayCards();






  /*
   * set up the event listener for a card. If a card is clicked:
   *  - display the card's symbol (put this functionality in another function that you call from this one)
   *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
   *  - if the list already has another card, check to see if the two cards match
   *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
   *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
   *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
   *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
   */




  // event listeners
  restartBtn.addEventListener('click', displayCards);

} // end of init function


// wait until the dom is loaded before starting.
document.addEventListener('DOMContentLoaded', init);