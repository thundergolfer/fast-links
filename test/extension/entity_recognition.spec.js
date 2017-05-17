var assert = require('assert');

var nlpAnalyser = require('../../chrome/extension/entity_recognition');

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
      it('should return a citation number next to the word, and a citation at the bottom', function() {
        var expected = "There is (2)A Thing that comes from Japan land.\n(2): A Thing - http://alinktoathing.com.au/athing"
        assert.equal(nlpAnalyser.facebookLinkInsert(test_text, test_link_entity), expected)
      });
    });
  });
})
