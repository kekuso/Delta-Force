// import test stuff
var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;

// import js files and EventEmitter class
var BasicTimer = require('./BasicTimer');
var EventEmitter = require('events');

describe('BasicTimer', function() {
  // magic code?
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

describe('controls', function () {
  beforeEach(function () {
    this.clock = sinon.useFakeTimers();
    tickHandler = sinon.spy();
    timer = new BasicTimer();
    timer.on('tick', tickHandler);
  });
  afterEach(function () {
    this.clock.restore();
  });

  it('should not start immediately', function () {
    this.clock.tick(1000);
    expect(tickHandler.callCount).to.equal(0);
  });

  it('should tick every second after it starts', function () {
    timer.start();
    this.clock.tick(1000);
    expect(tickHandler.callCount).to.equal(1);
    this.clock.tick(1000);
    expect(tickHandler.callCount).to.equal(2);
  });

  it('should have a stop method', function () {
    timer.start();
    expect(tickHandler.callCount).to.equal(0);
    this.clock.tick(1000);
    expect(tickHandler.callCount).to.equal(1);
    this.clock.tick(600);
    expect(tickHandler.callCount).to.equal(1);
    this.clock.tick(400);
    expect(tickHandler.callCount).to.equal(2);
    timer.stop();
    this.clock.tick(50);
    expect(tickHandler.callCount).to.equal(2);
    timer.start();
    this.clock.tick(1000);
    expect(tickHandler.callCount).to.equal(2);
    timer.stop();
    expect(tickHandler.callCount).to.equal(2);
  });
});