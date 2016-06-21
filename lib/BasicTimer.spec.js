var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;

var BasicTimer = require('./BasicTimer');
var EventEmitter = require('events');

function theFunction () {
  console.log("hello");
}

// describe('the spy', function () {
//   var theSpy;

//   beforeEach(function () {
//     theSpy = sinon.spy(theFunction);
//   });

//   it('should get invoked when invoked', function () {
//     theFunction();
//     expect(theSpy.called).to.equal(true);
//   });
// });

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

  it('should emit a tick event every second', function () {
    var tickHandler = sinon.spy();
    var timer = new BasicTimer();
    timer.on('tick', tickHandler);
    // timer.emit('tick');
    //if I wait 1 sec, the tick event should have have been emitted
    //wait 1 second
    expect(tickHandler.callCount).to.equal(0);
    this.clock.tick(1000);
    expect(tickHandler.callCount).to.equal(1);
    this.clock.tick(500);
    expect(tickHandler.callCount).to.equal(1);
    this.clock.tick(500);
    expect(tickHandler.callCount).to.equal(2);
  });
});