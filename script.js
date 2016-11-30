document.getElementById('start').addEventListener('click', play, false);

var letterSpaceId = 0,
	playSpace = document.getElementById("playSpace"),
	phrase = setPhrase(),
	word = setWord(),
	preSpace = (Math.ceil((14-phrase.length)/2)+14);

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

function setWord(){
	return words[Math.floor(Math.random()*723)].toUpperCase();
};

function setPhrase(){
	return phrases[Math.floor(Math.random()*723)].toUpperCase();
};

function recolorTiles(phrase) {

	// currently does not work properly for entries over 14 letters
	let length = phrase.length,
		preSpace = (Math.ceil((14-phrase.length)/2)+14),
		specialChar = "-!&():;',./? ";
	
	//reset the board
	for (var i = 1; i < 55; i++) {
		document.getElementById("letter"+i).style.backgroundColor = 'aqua';
		document.getElementById('letter'+i).innerText = "";
	}

	//check for the phrase for special characters
	for (var i = 0; i < specialChar.length; i++) {
		checkBoard(specialChar[i]);
	}

	for (var i = preSpace; i < (phrase.length + preSpace); i++) {
		document.getElementById("letter"+i).style.backgroundColor = 'white';
		if (document.getElementById("letter"+i).innerHTML == " ") {
			document.getElementById("letter"+i).style.backgroundColor = "aqua";
		}
	}


}

function checkBoard(char) {
	//lettersTried.push(char);
	//document.getElementById('display').innerHTML = "Letters Tried:<br/>"+lettersTried.join('<br/>');
	for (var i = 0; i < phrase.length; i++) {
		if (char === phrase[i]) {
			document.getElementById("letter"+(preSpace+i)).innerText = char;
		}
	}
}

function play(){
	word = setWord();
	phrase = setPhrase();
	preSpace = (Math.ceil((14-phrase.length)/2)+14);
	let freebies = ["R","S","T","L","N","E"],
		lettersTried = [],
		vowels = "AEIOU",
		counter = 0,
		consonant1 = "",
		consonant2 = "",
		consonant3 ="",
		vowel1 = "";
	console.log(phrase);
	recolorTiles(phrase);

	for (var i = 0; i < freebies.length; i++) {
		checkBoard(freebies[i]);
	}

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
		playSpace.innerHTML = "Make your final guess!<br/><input type='text' id='playInput'/><br/><button id='submit'>Submit</button>";
		document.getElementById('playInput').focus();
		document.getElementById('submit').addEventListener('click', finalGuess, false);
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


	function finalGuess(){
		for (var i = 0; i < phrase.length; i++) {
			document.getElementById("letter"+(preSpace+i)).innerText = phrase[i];
		}
		if (document.getElementById('playInput').value.toUpperCase() === phrase){
			playSpace.innerHTML = "<br/><h1>Congratulations!</h1>";
		} else {
			playSpace.innerHTML = "<br/><h1>Sorry! " + document.getElementById('playInput').value.toUpperCase() + " is incorrect.</h1>";
		}
	}
}
