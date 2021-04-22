

var btnOnOff = document.getElementById('btnOnOff');
btnOnOff.onclick = function(){
	chrome.storage.sync.get("toggle", function (data) {
		changeBtn(data.toggle);
		chrome.storage.sync.set({"toggle": !data.toggle});
		chrome.runtime.sendMessage({ run: true, data: {
        	toggle: !data.toggle
    	} });
	});
}


function changeBtn(toggle){
	if(toggle){
		btnOnOff.classList.add("btnOff");
		btnOnOff.classList.remove("btnOn");
		btnOnOff.innerText = "OFF";
	}
	else{
		btnOnOff.classList.add("btnOn");
		btnOnOff.classList.remove("btnOff");
		btnOnOff.innerText = "ON";
	}	
}

chrome.storage.sync.get({
    words:[],
    mappings:[] 
	}, 
	function(data) {
		var ul = document.getElementById("wordList");
		for(var i = 0; i < data.words.length; i++){
			addWordToList(ul, data.words[i], data.mappings[i]);
		}

		const form = document.getElementById('addWord');
		form.addEventListener('submit', addWord);

		function addWord(event){
			var wordForm = document.getElementById("word").value;
			var mappingForm = document.getElementById("mapping").value;
			var ul = document.getElementById("wordList");
			if(!wordForm || !mappingForm) return;

			addWordToList(ul, wordForm, mappingForm);
			words = data.words;
			mappings = data.mappings;
			words.push(wordForm);
			mappings.push(mappingForm);

			chrome.storage.sync.set({
			    words:words,
			    mappings:mappings,
			}, () => { });
		}

		function addWordToList(ul, word, mapping){
			var li = document.createElement("li");
			var icon = document.createElement("i");
			icon.className = "material-icons md-18";
			icon.innerText = "clear";
			var span = document.createElement("span");
			span.innerText = (word + ' \u2192 ' + mapping);
			li.append(icon,span);


			ul.appendChild(li);
			icon.addEventListener('click', () => {
				words = data.words;
				mappings = data.mappings;

				var index = words.indexOf(word);
				if (index !== -1) {
				  words.splice(index, 1);
				  mappings.splice(index, 1);
				}
				ul.removeChild(li);

				chrome.storage.sync.set({
			    	words:words,
			    	mappings:mappings,
				}, () => { });
			});
		}
	}
);



