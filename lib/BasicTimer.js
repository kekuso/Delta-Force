module.exports = BasicTimer;
// import the EventEmitter class
var EventEmitter = require('events');

// import some Javascript helper stuff
var util = require('util');

// add lag event
function BasicTimer (maxTime, lagTime) {
  this._max = maxTime;
  this._lag = lagTime;
  _this = this;
  if(!maxTime) {
    this._max = 10;
  }
  if(!lagTime) {
    this._lag = 3;
  }
  this._startTime = 0;
  this._endTime = 0;
  this._wait = 0;
  this._elapsedTime = 0;
  this._totalTime = 0;
}

// make the helpful Javascript stuff help
util.inherits(BasicTimer, EventEmitter);

BasicTimer.prototype.start = function () {
  console.log("Starting timer...");
  console.log("Start time: " + this._startTime);
  console.log("Elapsed Time: " + this._elapsedTime);
  this._startTime = Date.now();
  this._wait = this._startTime - this._elapsedTime;
  console.log("Wait: " + this._wait);
  _this.emit('start');
  setInterval(function () {
    _this.emit('tick');
  }, 1000);

  _this.on('tick', function () {
    var now = Date.now();
    if(!_this.lastTick) {
      _this.lastTick = now;
    }
    else {
      if((now - this.lastTick) > 1000 + this._lag) {
        _this.emit('lag');
      }
      console.log("Lag: " + (now - _this.lastTick));
      _this.lastTick = now;
    }
  });

  _this.on('lag', function () {
    console.log("lag!");
  });
};

BasicTimer.prototype.stop = function () {
  console.log("Stopping timer...");
  _this.emit('stop');
  _this.removeAllListeners('tick');
  this._endTime = Date.now();
  this._elapsedTime = this._elapsedTime + this._endTime - this._startTime;
  this._totalTime = this._elapsedTime - this._wait;
  console.log("Elapsed time: " + this._elapsedTime);
  console.log("Total time: " + this._totalTime + '\n');
};


