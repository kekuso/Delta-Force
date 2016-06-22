module.exports = BasicTimer;
// import the EventEmitter class
var EventEmitter = require('events');

// import some Javascript helper stuff
var util = require('util');

function BasicTimer () {
  _this = this;

  setInterval(function () {
    _this.emit('tick');
  }, 1000);
}

// make the helpful Javascript stuff help
util.inherits(BasicTimer, EventEmitter);