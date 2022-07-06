/*global chrome*/

chrome.runtime.onMessage.addListener(params => {
  chrome.debugger.sendCommand(1);
});
