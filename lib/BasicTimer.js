module.exports = BasicTimer;
// import the EventEmitter class
var EventEmitter = require('events');

// import some Javascript helper stuff
var util = require('util');

/* Compensate for lag */

function BasicTimer (maxTime, lagTime) {
  this._max = maxTime;
  console.log("Max time set to: " + maxTime);
  this._lag = lagTime;
  _this = this;
  if(!maxTime) {
    this._max = 10;
  }
  if(!lagTime) {
    this._lag = 2;
  }
  this._startTime = 0;
  this._endTime = 0;
  this._wait = 0;
  this._elapsedTime = 0;
  this._totalTime = 0;
  this._count = 0;
}

// make the helpful Javascript stuff help
util.inherits(BasicTimer, EventEmitter);

BasicTimer.prototype.start = function () {
  _this.emit('start');
    this._startTime = Date.now();
    console.log("start " + this._startTime);
    setInterval(function () {
      _this.emit('tick');
    }, 1000);

  _this.on('tick', function () {
    this.now = Date.now();
    var lag = 0;
    this._count++;
    if(!_this.lastTick) {
      _this.lastTick = this.now;
    }
    else {
      this.lag = this.now - this.lastTick;
      if(this.lag > 1000 + this._lag) {
        _this.emit('lag');
        clearInterval(_this);
        setInterval(function () {
          _this.emit('tick');
        }, this.lag);
      }
      console.log("tick " + this._count);
      _this.lastTick = this.now;
      if(this._count === this._max) {
        _this.stop();
      }
    }
  });

  _this.on('lag', function () {
    console.log("lag " + (this.lag - 1000));
  });
};

BasicTimer.prototype.stop = function () {
  _this.emit('stop');
  _this.removeAllListeners('tick');
  _this.endTime = Date.now();
  console.log('stop ' + _this.endTime);
  console.log('complete ' + (_this.endTime - this._startTime));
};


