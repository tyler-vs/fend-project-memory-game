
# `stopwatch.js`


## Usage

```js

// script.js

// 1. Get parent element for timer to display within
var statsEl = document.getElementsByClassName('stats')[0];
if (!statsEl) {
  console.log('err, no stats');
}

// 2. Initialize StopWatch, pass in parent element as an argument.
var statsTimer = new StopWatch(statsEl);

// 3. Use public available API's
setTimeout(function(){

    // start()
  statsTimer.start();
  setTimeout(function() {
    // stop()
    statsTimer.stop();
    setTimeout(function() {
        // reset()
        console.log('reset');
        statsTimer.reset();
        setTimeout(function() {
            statsTimer.start();
            setTimeout(function() {
                statsTimer.stop();
            }, 1500);
        }, 3000);
    }, 2500);
  }, 5000);
}, 500);

// statsTimer.reset();

```

