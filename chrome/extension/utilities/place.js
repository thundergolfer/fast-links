function isReddit(){
  return  /^https:\/\/www.reddit\.com/.test(window.location.href);
}
function isFacebook(){
  return /^https\/\/www\.facebook\.com/.test(window.location.href);
}
function isDefault(){
  return !isReddit() && !isFacebook();
}
function getPlatformName(){
  if(isReddit()){
    return 'reddit';
  }
  if(isFacebook()){
    return 'facebook';
  }
  return 'default';
}

function test(){
  var log = require("./logging.js");
  log.printTestHeader('Location Testing');
  log.printTestBody('isReddit',window.location.href,isReddit());
  log.printTestBody('isFacebook',window.location.href,isFacebook());
  log.printTestBody('isDefault',window.location.href,isDefault());
}

// utility functions
exports.isReddit = isReddit;
exports.isFacebook = isFacebook;
exports.isDefault = isDefault;

exports.getPlatformName = getPlatformName;

// testing functions
exports.test = test;
