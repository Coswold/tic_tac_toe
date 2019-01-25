var chai = require('chai');
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style
const Game = require('./game.js');

// begin a test suite of one or more tests
describe('Game', () {

  // add a test hook
  beforeEach(function() {
    // ...some logic before each test is run
  })

  // test a functionality
  it('should add numbers', function() {
    // add an assertion
    expect(sum(1, 2, 3, 4, 5)).to.equal(15);
  })

  // ...some more tests

})
