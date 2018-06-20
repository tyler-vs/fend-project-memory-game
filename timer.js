/*
 * StopWatch Script
 * Adapted From: mor10
 * https://stackoverflow.com/a/20319035/7221168
 */

var StopWatch = function(parentElement, options) {

  if (!parentElement)
    return false;


  // variables
  // ---------
  var timerEl = createTimerEl();
  var interval;
  // var timerRunning = false;
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
    return document.createElement('span');
  }

  function start() {
    if (!interval) {
      // timerRunning = true;
      interval = setInterval(update, 10);
    }
  }

  function stop() {
    if (interval) {
      // timerRunning = false;
      clearInterval(interval);
      interval = null;
    }
  }

  function reset() {
    clearInterval(interval);
    // clock = 0;
    // timerRunning = false;
    timer = [0,0,0,0];
    timerEl.innerHTML = '00:0E:ND';
    // render('00:00:00'); // old render function
  }

  function update() {

    // update timer w/ formatting
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);

    // render
    // render(currentTime); // old function
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

  // function render(currentTime) {
  // function render() {
  // // function render() {
  //   timerEl.innerHTML = time; // clock
  //   // timerEl.innerHTML = timer; // clock
  // }

  // function delta() {} // dep

  // function timeFormat() {} // dep


  // public functions/methods
  // ------------------------

  this.start = start;
  this.stop = stop;
  this.reset = reset;

  // inits/evt listeners
  // -------------------

  reset();
};

// // .stats

// var statsEl = document.getElementsByClassName('stats')[0];
// if (!statsEl) {
//   console.log('err, no stats');
// }

// var statsTimer = new StopWatch(statsEl);

// setTimeout(function(){
//   statsTimer.start()
//   setTimeout(function() {
//     statsTimer.stop()
//   }, 5000);
// }, 500);
// // statsTimer.reset();

