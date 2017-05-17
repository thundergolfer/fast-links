var assert = require('assert');

var nlpAnalyser = require('../../chrome/extension/entity_recognition');

describe('EXAMPLE TEST ONLY', function () {
    describe('#indexOf', function () {
        it('should return -1 when the substring is not present', function () {
            var myString = 'test';

            assert.equal(-1, myString.indexOf('x'));
            assert.equal(-1, myString.indexOf('y'));
        });
    });
});

describe('entity_recognition', function() {
  it('should return true because I dont have a test yet', function() {
    assert.equal(1, 1);
  });

  var test_link_entity = {
    start_pos: 9,
    ref: 2,
    word: 'A Thing',
    link: 'http://alinktoathing.com.au/athing'
  };

  var test_text = "There is A Thing that comes from Japan land.";

  describe('link insertion', function() {
    describe('redditLinkInsert', function() {
      it('should return the text with a new markdown formatted link', function() {
        var expected = "There is [A Thing](http://alinktoathing.com.au/athing) that comes from Japan land."
        assert.equal(expected, nlpAnalyser.redditLinkInsert(test_text, test_link_entity))
      });
    });

    describe('facebookLinkInsert', function() {
      it('should return... something', function() {
        assert.equal(1, 1);
      });
    });
  });
})
