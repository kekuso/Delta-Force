module.exports = BasicTimer;
// import the EventEmitter class
var EventEmitter = require('events');

// import some Javascript helper stuff
var util = require('util');

function BasicTimer () {
  _this = this;
  elapsedTime = 0;
  startTime = 0;
  previousTime = 0;
  wait = 0;
}

// Object.create stuff
util.inherits(BasicTimer, EventEmitter);

BasicTimer.prototype.start = function () {

  console.log("Starting timer...");
  console.log("Start time: " + startTime);
  console.log("Elapsed Time: " + elapsedTime);
  startTime = Date.now();
  wait = startTime - elapsedTime;
  console.log("Wait: " + wait);
  _this.emit('start');
  setInterval(function () {
    _this.emit('tick');
  }, 1000);
};

BasicTimer.prototype.stop = function () {
  console.log("Stopping timer...");
  _this.emit('stop');
  _this.removeAllListeners('tick');
  endTime = Date.now();
  elapsedTime = elapsedTime + endTime - startTime;
  totalTime = elapsedTime - wait;
  console.log("Elapsed time: " + elapsedTime);
  console.log("Total time: " + totalTime + '\n');
};