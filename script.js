document.getElementById('start').addEventListener('click', play, false);

var letterSpaceId = 0,
	playSpace = document.getElementById("playSpace");

var letterSpace = function() {
	this.gen = function(){
		this.id = "letter" +letterSpaceId;
		letterSpaceId++;
		document.getElementById("wrapper").insertAdjacentHTML('beforeend',"<div class='letterSpace' id='" + this.id + "'></div>");
	}
}

var space = new letterSpace();
for (var i = 0; i < 56; i++) {
	space.gen();
}

function recolorTiles(word) {

	// currently does not work properly for entries over 14 letters
	let length = word.length;
	let preSpace = (Math.ceil((14-word.length)/2)+14);
	for (var i = 14; i < 28; i++) {
		document.getElementById("letter"+i).style.backgroundColor = 'aqua';
		document.getElementById('letter'+i).innerText = "";
	}	
	for (var i = preSpace; i < (word.length + preSpace); i++) {
		document.getElementById("letter"+i).style.backgroundColor = 'white';
	}

}

function play(){
	let word = words[Math.floor(Math.random()*723)].toUpperCase(),
		preSpace = (Math.ceil((14-word.length)/2)+14);
		vowels = "AEIOU",
		counter = 0,
		consonant1 = "",
		consonant2 = "",
		consonant3 ="",
		vowel1 = "";
	console.log(word);
	recolorTiles(word);
	stateOne();



	function stateOne(vowel=0) {
		if (vowel) {
			playSpace.innerHTML = vowel + "'s not a consonant! Please enter a consonant!<br/><input type='text' id='playInput'/>";
		} else {
			playSpace.innerHTML = "Let's play! Please enter a consonant!<br/><input type='text' id='playInput'/>";
		}
		document.getElementById('playInput').addEventListener('keyup', isConsonant, false);
		document.getElementById('playInput').focus();
	}

	function stateTwo(char) {
		switch (counter) {
			case 0:
				consonant1 = char;
				break;
			case 1:
				consonant2 = char;
				break;
			case 2:
				consonant3 = char;
				stateThree();
				break;
		}
		counter++;
	
	}

	function stateThree(consonant=0) {
		if (consonant) {
			playSpace.innerHTML = consonant +  "'s not a vowel! Please enter a vowel!<br/><input type='text' id='playInput'/>";
		} else {
			playSpace.innerHTML = "Good job! Please enter a vowel!<br/><input type='text' id='playInput'/>";
		}
		document.getElementById('playInput').addEventListener('keyup', isVowel, false);
		document.getElementById('playInput').focus();
	}

	function stateFour() {
		checkBoard(consonant1);
		checkBoard(consonant2);
		checkBoard(consonant3);
		checkBoard(vowel1);
		playSpace.innerHTML = "Make your final guess!<br/><input type='text' id='playInput'/>";
		document.getElementById('playInput').addEventListener('keyup', finalGuess, false);
	}

	function isConsonant(event) {
		let test = document.getElementById('playInput').value.slice(-1).toUpperCase();
			document.getElementById('playInput').value = "";
		if (!vowels.includes(test) && test !== test.toLowerCase()) {
			stateTwo(test);
		}	else if (vowels.includes(test)) {
			stateOne(test);
		}	else {
			stateOne(test);
		}

	}

	function isVowel(event) {
		let test = document.getElementById('playInput').value.slice(-1).toUpperCase();
			document.getElementById('playInput').value = "";
		if (vowels.includes(test) && test !== test.toLowerCase()) {
			vowel1 = test;
			stateFour();
		}	else if (!vowels.includes(test)) {
			stateThree(test);
		}	else {
			stateThree(test);
		}
	}

	function checkBoard(char) {
		for (var i = 0; i < word.length; i++) {
			if (char === word[i]) {
				document.getElementById("letter"+(preSpace+i)).innerText = char;
			}
		}
	}

	function finalGuess(){}

}
