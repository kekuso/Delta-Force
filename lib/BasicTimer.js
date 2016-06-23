module.exports = BasicTimer;
// import the EventEmitter class
var EventEmitter = require('events');

// import some Javascript helper stuff
var util = require('util');

function BasicTimer (maxTime) {
  max = 10;
  if(maxTime) {
    max = maxTime;
  }
  _this = this;
  count = 0;
  elapsed = 0;

  setInterval(function () {
    for(var i = 0; i < max; i++) {
      _this.emit('tick');
      count++;
    }
  }, 1000);

  _this.removeAllListeners('tick');
  elapsed = count * 1000;
  _this.emit('complete');
}

// make the helpful Javascript stuff help
util.inherits(BasicTimer, EventEmitter);