const bluebird = require('bluebird');
var natural = require('./natural');

global.Promise = bluebird;

function promisifier(method) {
  // return a function
  return function promisified(...args) {
    // which returns a promise
    return new Promise((resolve) => {
      args.push(resolve);
      method.apply(this, args);
    });
  };
}

function promisifyAll(obj, list) {
  list.forEach(api => bluebird.promisifyAll(obj[api], { promisifier }));
}

// let chrome extension api support Promise
promisifyAll(chrome, [
  'tabs',
  'windows',
  'browserAction',
  'contextMenus'
]);
promisifyAll(chrome.storage, [
  'local',
]);
chrome.extension.onMessage.addListener(
  function(request,sender){
    console.log(request);
    chrome.history.search(
      {
        text:request.search_str,
        maxResults: 10,
      },function(results){
        console.log(results);
        chrome.tabs.sendMessage(sender.tab.id,results);
      });
  }
)

require('./background/contextMenus');
require('./background/inject');
require('./background/badge');
