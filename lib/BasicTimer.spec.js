var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect();

var BasicTimer = require('./BasicTimer');

function theFunction () {
  console.log("hello");
}

describe('the spy', function () {
  var theSpy;

  beforeEach(function () {
    theSpy = sinon.spy(theFunction);
  });

  it('should get invoked when invoked', function () {
    theFunction();
    console.log(theSpy);
    expect(theSpy.called).to.be(true);
  });
});

describe('BasicTimer', function() {
  it('should be a function', function () {
    expect(BasicTimer).to.be('function');
  });
});