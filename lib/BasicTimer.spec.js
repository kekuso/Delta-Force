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

  it('should emit 10 tick events if no parameter passed', function () {
    var tickHandler = sinon.spy();
    var timer = new BasicTimer();
    timer.on('tick', tickHandler);
    this.clock.tick(1000);
    expect(tickHandler.callCount).to.equal(10);
  });

  it('should emit 20 tick events if parameter is 20', function () {
    var tickHandler = sinon.spy();
    var timer = new BasicTimer(20);
    timer.on('tick', tickHandler);
    this.clock.tick(1000);
    expect(tickHandler.callCount).to.equal(20);
  });
});

describe('LagEvent', function() {
  beforeEach(function () {
    this.clock = sinon.useFakeTimers();
    var tickHandler = sinon.spy();
  });
  afterEach(function () {
    this.clock.restore();
  });
  it('should emit a tick every 1ms or more', function () {
    var timer = new Timer();
    // timer.on('tick',function () {
    //   console.log('omg im ticking');
    // });
    timer.start();
    this.clock.tick(1000);
    expect(tickHandler.callCount).to.equal(1);
  });

});