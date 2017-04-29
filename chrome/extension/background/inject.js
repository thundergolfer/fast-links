function isInjected(tabId) {
  return chrome.tabs.executeScriptAsync(tabId, {
    code: `var injected = window.reactExampleInjected;
      window.reactExampleInjected = true;
      injected;`,
    runAt: 'document_start'
  });
}

function loadScript(name, tabId, cb) {
  if (process.env.NODE_ENV === 'production') {
    chrome.tabs.executeScript(tabId, { file: `/js/${name}.bundle.js`, runAt: 'document_end' }, cb);
  } else {
    // dev: async fetch bundle
    console.log("Starting to load inject script.");
    fetch(`http://localhost:3000/js/${name}.bundle.js`)
    .then(res => res.text())
    .then((fetchRes) => {
      // Load redux-devtools-extension inject bundle,
      // because inject script and page is in a different context
      const request = new XMLHttpRequest();
      request.open('GET', 'chrome-extension://lmhkpmbekcpmknklioeibfkpmmfibljd/js/redux-devtools-extension.js');  // sync
      request.send();
      request.onload = () => {
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
          chrome.tabs.executeScript(tabId, { code: request.responseText, runAt: 'document_start' });
        }
      };
      chrome.tabs.executeScript(tabId, { code: fetchRes, runAt: 'document_end' }, cb);
    });
  }
}

const arrowURLs = ['^https://github\\.com', '^https://reddit\\.com'];

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // alert("Hey! chrome.tabs.onUpdated event.");
  if (tab.url.match(arrowURLs.join('|'))) {
    console.log('We have a match!.');
  } else {
    console.log('We dont have a match');
  }
  if (changeInfo.status !== 'loading' || !tab.url.match(arrowURLs.join('|'))) return;

  const result = await isInjected(tabId);
  if (chrome.runtime.lastError || result[0]) return;

  loadScript('inject', tabId, () => console.log('load inject bundle success!'));
});
