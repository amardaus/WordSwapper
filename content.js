chrome.storage.sync.get({
    words:[],
    mappings:[]
},


function(data) {
	var keywords = {};
    for(var i = 0; i < data.words.length; i++){
    	keywords[data.words[i]] = data.mappings[i];
    }
   	
	for(var [k,v] of Object.entries(keywords)){
	    regEx = new RegExp(k, "g");
	    document.body.innerHTML = document.body.innerHTML.replace(regEx, v);
	}
}); 


