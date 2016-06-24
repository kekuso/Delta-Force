module.exports = BasicTimer;
// import the EventEmitter class
var EventEmitter = require('events');

// import some Javascript helper stuff
var util = require('util');

// add lag event
function BasicTimer (maxTime, lagTime) {
  this._max = maxTime;
  this._lag = lagTime;
  if(!maxTime) {
    this._max = 10;
  }
  if(!lagTime) {
    this._lag = 50;
  }
}

// make the helpful Javascript stuff help
util.inherits(BasicTimer, EventEmitter);

BasicTimer.prototype.start = function () {
  count = 0;
  elapsed = 0;
  startTime = 0;
  endTime = 0;
  setInterval(function () {
    for(var i = 0; i < this._max; i++) {
      this.emit('tick');
      count += 1000;
    }
  }, 1000);

  this.on('tick', function () {
    var now = Date.now();
    if(!this.lastTick) {
      this.lastTick = now;
    }
    else {
      console.log(now - this.lastTick);
      this.lastTick = now;
    }
  });
};

BasicTimer.prototype.stop = function () {
  this.removeAllListeners();
  elapsed = count * 1000;
  this.emit('complete');
};


