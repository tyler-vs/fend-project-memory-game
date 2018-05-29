// app.js


// initialize function runs when the DOMContentLoaded event fires
function init() { // MemoryGame()


  /**
   * VARIABLES
   */

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
  var openCards = [];



  /**
   * FUNCTIONS
   */

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

    clearCards(deckEl);

    for (var i = 0; i <= myArr.length - 1; i++) {
      var cardEl = document.createElement('li');
      var cardIconEl = document.createElement('i');

      cardEl.classList.add('card');
      // cardEl.classList.add('show'); // debugging, add show card class
      cardIconEl.classList.add('fa');
      cardIconEl.classList.add(`fa-${myArr[i]}`);

      cardEl.appendChild(cardIconEl);

      deckEl.appendChild(cardEl);
    }
  } // end of displayCards function


  /**
   * removes child nodes or "cards" from the "deck" ul element.
   * @param  {[type]} deck [description]
   * @return {[type]}      [description]
   */
  function clearCards(deck) {
    if (!deck) {
      console.warn('Err, these was no element to remove cards from.');
      return;
    }

    // remove cards from the deck element
    deck.innerHTML = '';
  }

  /**
   * [showCard description]
   * @param  {[type]} card [description]
   * @return {[type]}      [description]
   */
  function showCard(card) {

    // return if target card is already showing or is already apart of a match
    if (card.classList.contains('show') || card.classList.contains('match')) {
      return;
    }
    // add classes to card to make it open.
    card.classList.add('open', 'show');
  }

  /**
   * [addToOpenCards description]
   * @param {[type]} card [description]
   */
  function addToOpenCards(card) {
    // var openCards = [];
    // check if card was passed
    if (!card) {
      console.log('err, there was no actual card to add to the open card list');
      return;
    }
    // if the list already has another card, check to see if the two cards match
    if (openCards.length >= 1) {

    }

    openCards.push(card);

    console.log(openCards);
    return;
  }


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



   // function that
   // function lockMatching(matchingCardsArr) {

   // }



  /**
   * INITIALIZATIONS AND EVENT LISTENERS
   */

  // event listeners
  restartBtn.addEventListener('click', displayCards);
  // initialize deck
  displayCards();

  // while "game" loop

  deckEl.addEventListener('click', function(evt) {
    if (!evt.target.matches('.card')) {
      console.log('err, did not click a card element');
      return;
    } // end if

    showCard(evt.target);
    addToOpenCards(evt.target);
    console.log(evt.target.outerHTML);

  });

  var myCards = document.querySelectorAll('.card');
  for (var i = 0; i <= myCards.length - 1; i++) {
    var aCard;
    if (aCard == null) {
      aCard = myCards[i];
    }

  }

} // end of init function


// wait until the dom is loaded before starting.
document.addEventListener('DOMContentLoaded', init);