module.exports = BasicTimer;
var EventEmitter = require('events');
var util = require('util');

function BasicTimer () {
  _this = this;

  setInterval(function () {
    _this.emit('tick');
  }, 1000);
}

util.inherits(BasicTimer, EventEmitter);