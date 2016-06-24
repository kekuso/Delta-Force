// import test stuff
var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;

// import js files and EventEmitter class
var BasicTimer = require('./BasicTimer');
var EventEmitter = require('events');

describe('BasicTimer', function() {
  beforeEach(function () {
    this.clock = sinon.useFakeTimers();
  });
  afterEach(function () {
    this.clock.restore();
  });

  it('should be a function', function () {
    expect(BasicTimer).to.be.a('function');
  });

  it('should be an instance of EventEmitter', function () {
    var timer = new BasicTimer();
    expect(timer).to.be.instanceOf(EventEmitter);
    expect(timer).to.have.constructor(BasicTimer);
  });
});

describe('LagEvent', function() {
  beforeEach(function () {
    this.clock = sinon.useFakeTimers();
    tickHandler = sinon.spy();
    timer = new BasicTimer();
  });
  afterEach(function () {
    this.clock.restore();
  });
  it('should emit a tick every 1ms or more', function () {
    timer.on('tick', tickHandler);
    timer.start();
    this.clock.tick(1000);
    expect(tickHandler.callCount).to.equal(1);
  });

});