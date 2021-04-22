chrome.storage.sync.set({"toggle": 1});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(!message.run) return;
    var data = message.data;
    if(!data.toggle){
    	//alert('ENABLING');
    	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		    chrome.tabs.executeScript(tabs[0].id, {
		        file:"content.js"
		    });
		    chrome.browserAction.setIcon({path: "on.png", tabId:tabs[0].id});
		});
  	}
  	else{
  		//alert('DISABLING');
    	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		    chrome.tabs.executeScript(tabs[0].id, {
		        code: "location.reload(true);"
		    });
		    chrome.browserAction.setIcon({path: "off.png", tabId:tabs[0].id});
		});
	}
});