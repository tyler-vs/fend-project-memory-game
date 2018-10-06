/*
 * StopWatch Script
 * Adapted From: mor10
 * https://stackoverflow.com/a/20319035/7221168
 * http://jsbin.com/IgaXEVI/167/edit?js
 */

var StopWatch = function(parentElement, options) {

  if (!parentElement)
    return false;


  // variables
  // ---------
  var timerEl = createTimerEl();
  var interval;
  var timer = [0,0,0,0];

  // default options
  // options = options || {};
  // options.delay = options.delay || 1;

  // append timer to parent element
  parentElement.appendChild(timerEl);


  // private/helper functions
  // ------------------------

  function leadingZero(time) {
    if (time <= 9) {
      return time = '0' + time;
    } else {
      return time;
    }
  }

  function createTimerEl() {
    var spanEl = document.createElement('span');
    spanEl.classList.add('timer');
    return spanEl;
  }

  function start() {
    if (!interval) {
      interval = setInterval(update, 10);
    }
  }

  function stop() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function reset() {
    clearInterval(interval);
    timer = [0,0,0,0];
    timerEl.innerHTML = '00:0E:ND';
  }

  function update() {

    // update timer w/ formatting
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);

    // render
    timerEl.innerHTML = currentTime;

    // update
    timer[3]++;
    // min
    timer[0] = Math.floor((timer[3]/100) / 60);
    // seconds
    timer[1] = Math.floor(timer[3]/100 - (timer[0] * 60));
    // hundreth
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));

  }

  function destroy() {
    timerEl.remove();
  }


  // public functions/methods
  // ------------------------

  this.start = start;
  this.stop = stop;
  this.reset = reset;
  this.destroy = destroy;

  // inits/evt listeners
  // -------------------

  reset();
};