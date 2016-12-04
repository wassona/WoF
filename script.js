var lettersTried = [],
	vowels = "AEIOU",
	spun = 0,
	counter = 0,
	playerOne = {
		name: "Player One",
		cash: 0,
		bank: 0,
		inventory: [],
		currentPlayer: true,
		el: document.getElementById('playerOne'),
		setEl: function() {
			this.el.innerHTML = "Player One:<br/><span style='color: green'>$"+this.cash+"</span><br/>$"+this.bank;
		}
	},
	playerTwo = {
		name: "Player Two",
		cash: 0,
		bank: 0,
		inventory: [],
		currentPlayer: false,
		el: document.getElementById('playerTwo'),
		setEl: function() {
			this.el.innerHTML = "Player Two:<br/><span style='color: green'>$"+this.cash+"</span><br/>$"+this.bank;
		}
	},
	playerThree = {
		name: "Player Three",
		cash: 0,
		bank: 0,
		inventory: [],
		currentPlayer: false,
		el: document.getElementById('playerThree'),
		setEl: function() {
			this.el.innerHTML = "Player Three:<br/><span style='color: green'>$"+this.cash+"</span><br/>$"+this.bank;
		}
	},
	currentPlayer = function() {
		if (playerOne.currentPlayer){
			return playerOne;
		} else if (playerTwo.currentPlayer) {
			return playerTwo;
		} else if (playerThree.currentPlayer) {
			return playerThree;
		}
	},
	consonant1,
	consonant2,
	consonant3,
	vowel1,
	lines;
	
document.getElementById('start').addEventListener('click', start, false);
// document.getElementById('spin').addEventListener('click', spin, false);
// document.getElementById('wheel2').addEventListener('click', spin, false);

var letterSpaceId = 0,
	playSpace = document.getElementById("playSpace"),
	phrase = setPhrase(),
	word = setWord();

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
	return phrases[Math.floor(Math.random()*2054)].toUpperCase();
};

function setRow(line, row=0) {
	
	let length = line.length,
		offset = row * 14,
		preSpace = row*14,
		specialChar = "-!&():;',./? ";

	//reset the board
	for (var i = preSpace; i < preSpace + 14; i++) {
		document.getElementById("letter"+i).style.backgroundColor = 'aqua';
		document.getElementById('letter'+i).innerText = "";
	}

	//check for the phrase for special characters
	for (var i = 0; i < specialChar.length; i++) {
		checkChars(specialChar[i], line, preSpace);
	}

	for (var i = preSpace; i < (line.length + preSpace); i++) {
		document.getElementById("letter"+i).style.backgroundColor = 'white';
		if (document.getElementById("letter"+i).innerHTML == " ") {
			document.getElementById("letter"+i).style.backgroundColor = "aqua";
		}
	}
	document.getElementById("letter0").style.backgroundColor = "transparent";
	document.getElementById("letter13").style.backgroundColor = "transparent";
	document.getElementById("letter42").style.backgroundColor = "transparent";
	document.getElementById("letter55").style.backgroundColor = "transparent";
}

function checkChars(char,line,preSpace) {
	for (var i = 0; i < line.length; i++) {
		if (char === line[i]) {
			document.getElementById("letter"+(preSpace+i)).innerText = char;
		}
	}
}

function checkLines(char,object) {
	if (lettersTried.includes(char)) {
		playSpace.innerHTML = "Sorry, "+char+"'s already been guessed. Try again.<br/><button id='spin'>Spin!</button><button id='vowel'>Buy a vowel!</button><button id='solve'>Solve the puzzle!</button>";
		document.getElementById('spin').addEventListener('click', spin, false);
		document.getElementById('vowel').addEventListener('click', vowelPass, false);
		document.getElementById('solve').addEventListener('click', stateFour, false);
	} else {
		lettersTried.push(char);
		document.getElementById('display').innerHTML = "Letters Tried:<br/>"+lettersTried.join(' ');
		let currentCash = currentPlayer().cash,
			numberCorrect = 0;
		if (vowels.includes(char)) {
			slice = 0;
		} else {
			slice = parseInt(document.getElementById('slice').innerText);
		}
		switch (object.phase) {
			case 1:
				for (var i = 0; i < object.line1.length; i++) {
					if (char === object.line1[i]) {
						document.getElementById("letter"+(i+14)).innerText = char;
						currentPlayer().cash += slice;
						numberCorrect++;
					}
				}
				break;
			case 2:
				for (var i = 0; i < object.line1.length; i++) {
					if (char === object.line1[i]) {
						document.getElementById("letter"+(i+14)).innerText = char;
						currentPlayer().cash += slice;
						numberCorrect++;
					}
				}
				for (var i = 0; i < object.line2.length; i++) {
					if (char === object.line2[i]) {
						document.getElementById("letter"+(i+28)).innerText = char;
						currentPlayer().cash += slice;
						numberCorrect++;
					}
				}
				break;
			case 3:
				for (var i = 0; i < object.line1.length; i++) {
					if (char === object.line1[i]) {
						document.getElementById("letter"+(i)).innerText = char;
						currentPlayer().cash += slice;
						numberCorrect++;
					}
				}
				for (var i = 0; i < object.line2.length; i++) {
					if (char === object.line2[i]) {
						document.getElementById("letter"+(i+14)).innerText = char;
						currentPlayer().cash += slice;
						numberCorrect++;
					}
				}
				for (var i = 0; i < object.line3.length; i++) {
					if (char === object.line3[i]) {
						document.getElementById("letter"+(i+28)).innerText = char;
						currentPlayer().cash += slice;
						numberCorrect++;
					}
				}
				break;
			case 4:
				for (var i = 0; i < object.line1.length; i++) {
					if (char === object.line1[i]) {
						document.getElementById("letter"+(i)).innerText = char;
						currentPlayer().cash += slice;
						numberCorrect++;
					}
				}
				for (var i = 0; i < object.line2.length; i++) {
					if (char === object.line2[i]) {
						document.getElementById("letter"+(i+14)).innerText = char;
						currentPlayer().cash += slice;
						numberCorrect++;
					}
				}
				for (var i = 0; i < object.line3.length; i++) {
					if (char === object.line3[i]) {
						document.getElementById("letter"+(i+28)).innerText = char;
						currentPlayer().cash += slice;
						numberCorrect++;
					}
				}
				for (var i = 0; i < object.line4.length; i++) {
					if (char === object.line4[i]) {
						document.getElementById("letter"+(i+42)).innerText = char;
						currentPlayer().cash += slice;
						numberCorrect++;
					}
				}
				break;
		}
		if (numberCorrect === 0) {
			playSpace.innerHTML = "Sorry, no "+char+"'s.<br/><button id='next'>Next Player</button>";
			document.getElementById('next').addEventListener('click', nextPlayer, false);
		} else if (!vowels.includes(char)) {
			playSpace.innerHTML = "Yes, there are "+numberCorrect+" "+char+"'s, so you get $"+numberCorrect*slice+"!<br><button id='next'>Next</button>";
			document.getElementById('next').addEventListener('click', basePhase, false);
		} else {
			playSpace.innerHTML = "Yes, there are "+numberCorrect+" "+char+"'s!<br><button id='next'>Next</button>";
			document.getElementById('next').addEventListener('click', basePhase, false);
		}
	}
}

function phraseParser() {
	let result = {};
	result.length = phrase.length;
	result.words = phrase.split(" ").length;
	for (var i = 0; i < result.words; i++) {
		result[i] = phrase.split(" ")[i];
	}
	return result;
}

function boardFormatter() {
	let subject = phraseParser(),
		result = {
			line1: "",
			line2: "",
			line3: "",
			line4: "",
			phase: 1,
		};

	for (var i = 0; i < subject.words; i++) {
		if ((result.line1.length + subject[i].length) < 12) {
			result.line1 += " ";
			result.line1 += subject[i];
		} else if ((result.line2.length + subject[i].length) < 14) {
			result.line1 += "***********"
			result.line2 += " ";
			result.line2 += subject[i];
			result.phase = 2;
		} else if ((result.line3.length + subject[i].length) < 14) {
			result.line2 += "***********"
			result.line3 += " ";
			result.line3 += subject[i];
			result.phase = 3;
		} else if ((result.line4.length + subject[i].length) < 12) {
			result.line3 += "***********"
			result.line4 += " ";
			result.line4 += subject[i];
			result.phase = 4;
		} else {
			throw new Error("Phrase too long");
		}
	}

	result.line1 = result.line1.replace(/\*/gi, "");
	result.line2 = result.line2.replace(/\*/gi, "");
	result.line3 = result.line3.replace(/\*/gi, "");
	// result.line1 = result.line1.replace(/ /gi, "_");
	// result.line2 = result.line2.replace(/ /gi, "_");
	// result.line3 = result.line3.replace(/ /gi, "_");
	console.log(subject);
	console.log(result.line1,result.line2,result.line3,result.line4,result.line1.length,result.line2.length,result.line3.length,result.line4.length);

	switch (result.phase) {
		case 1:
			setRow("",0);
			setRow(result.line1, 1);
			setRow("",2);
			setRow("",3);
			break;
		case 2:
			setRow("",0);
			setRow(result.line1,1);
			setRow(result.line2,2);
			setRow("",3);
			break;
		case 3:
			setRow(result.line1,0);
			setRow(result.line2,1);
			setRow(result.line3,2);
			setRow("",3)
			break;
		case 4:
			setRow(result.line1,0);
			setRow(result.line2,1);
			setRow(result.line3,2);
			setRow(result.line4,3);
			break;
	}
	return result;
}

function finalGuess(){
	if (document.getElementById('playInput').value.toUpperCase() === phrase){
		for (var i = 0; i < phrase.length; i++) {
			checkChars(phrase[i], lines.line1, 0);
			checkChars(phrase[i], lines.line2, 14);
			checkChars(phrase[i], lines.line3, 28);
			checkChars(phrase[i], lines.line4, 42);
		}
		playSpace.innerHTML = "<br/><h1>Congratulations!</h1>";
	} else {
		playSpace.innerHTML = "<br/><h1>Sorry! " + document.getElementById('playInput').value.toUpperCase() + " is incorrect.</h1>";
	}
	lettersTried = [];
	document.getElementById('display').innerHTML = "Letters Tried:<br/>"+lettersTried.join(' ');
}

function isConsonant(event) {
	let test = document.getElementById('playInput').value.slice(-1).toUpperCase();
		document.getElementById('playInput').value = "";
	if (!vowels.includes(test) && test !== test.toLowerCase()) {
		checkLines(test,lines);
	}	else if (vowels.includes(test)) {
		consonantGuess(test);
	}	else {
		consonantGuess(test);
	}
}

function isVowel(event) {
	console.log("vowel");
	let test = document.getElementById('playInput').value.slice(-1).toUpperCase();
	document.getElementById('playInput').value = "";
	if (vowels.includes(test) && test !== test.toLowerCase()) {
		buyAVowel(test, lines);
	}	else if (!vowels.includes(test)) {
		vowelGuess(test);
	}	else {
		vowelGuess(test);
	}
}

function buyAVowel(test, lines) {
	currentPlayer().cash -= 250;
	checkLines(test,lines);
}

var curve = [];
for (var i = 0; i < 3; i += .075){
	curve.push(Math.sin(i-1.5)+1);
}

function start() {
	phrase = setPhrase();
	lines = boardFormatter();
	basePhase();
	
}

function basePhase() {
	initPlayers();
	playSpace.innerHTML = "Your turn, "+currentPlayer().name+"! What would you like to do?<br/><button id='spin'>Spin!</button><button id='vowel'>Buy a vowel!</button><button id='solve'>Solve the puzzle!</button>";
	document.getElementById('spin').addEventListener('click', spin, false);
	document.getElementById('vowel').addEventListener('click', vowelPass, false);
	document.getElementById('solve').addEventListener('click', stateFour, false);
}

function spin(){
	let rand = Math.floor(Math.random()*361),
		check = true,
		slice = ["Lose a Turn", 700, "Free Play", 650, "Bankrupt", 900, "1/2 Car1", 550, 600, "BR/M/BR", 700, "Gift", 800, 600, 700, 900, "Wild", 2500, "Bankrupt", 900, "1/2 Car2", 650, "Prize", 800]
	for (var i = 0; i < 20; i++) {
		let inc = i*curve[i]*200;
		up = window.setTimeout(flick, 0 + inc, -20);
		back = window.setTimeout(flick, 100 + inc, 0);
		down = window.setTimeout(flick, 200 + inc, -20);
		again = window.setTimeout(flick, 300 + inc, 0);	
	}
	document.getElementById("wheel2").style.transform = "rotate(" + (spun + 1080 + rand) +"deg)";
	document.getElementById('spin').disabled = "true";
	spun += 1080 + rand;
	let landOn = Math.floor(((spun % 360) - 7)/15);
	sliceHandler(slice[landOn]);
}

function sliceHandler(slice) {
	if (typeof slice === "number") {
		consonantGuess(0,slice);
	} else if (slice === "Lose a Turn") {
		playSpace.innerHTML = "Oh no! On to the next player!<br/><button id='next'>Next Player</button>";
		document.getElementById('next').addEventListener('click', nextPlayer, false);
	} else if (slice === "Bankrupt") {
		playSpace.innerHTML = "Oh no! You just lost $"+currentPlayer().cash+"!<br/><button id='next'>Next Player</button>";
		document.getElementById('next').addEventListener('click', nextPlayer, false);
		currentPlayer().cash = 0;
	} else {
		playSpace.innerHTML = "Sorry, that doesn't work yet. Try again.<br/><button id='spin'>Spin!</button><button id='vowel'>Buy a vowel!</button><button id='solve'>Solve the puzzle!</button>";
		document.getElementById('spin').addEventListener('click', spin, false);
		document.getElementById('vowel').addEventListener('click', vowelPass, false);
		document.getElementById('solve').addEventListener('click', stateFour, false);
	}
}

function consonantGuess(vowel=0, slice) {
	if (vowel) {
		let slice = document.getElementById('slice').innerText;
		console.log(slice);
		playSpace.innerHTML = vowel + "'s not a consonant! You're still playing for $<span id='slice'>"+slice+"</span> per correct guess! Please enter a consonant!<br/><input type='text' id='playInput'/>";
	} else {
		playSpace.innerHTML = "Nice spin! You're playing for $<span id='slice'>"+slice+"</span> per correct guess! Please enter a consonant!<br/><input type='text' id='playInput'/>";
	}
	document.getElementById('playInput').addEventListener('keyup', isConsonant, false);
}

function vowelPass() {
	vowelGuess();
}

function vowelGuess(consonant=0){
	if (consonant) {
		playSpace.innerHTML = consonant + "'s not a vowel! Please enter a vowel!<br/><input type='text' id='playInput'/>";
	} else {
		playSpace.innerHTML = "What vowel would you like?<br/><input type='text' id='playInput'/>";
	}
	document.getElementById('playInput').addEventListener('keyup', isVowel, false);
}

function flick(degrees){
	document.getElementById("pointer").style.transform = "rotate("+degrees+"deg)";
	document.getElementById("inner").style.transform = "rotate("+degrees+"deg)";
}

function initPlayers(){
	playerOne.setEl();
	playerTwo.setEl();
	playerThree.setEl();

}

function stateFour() {
	playSpace.innerHTML = "Make your final guess!<br/><input type='text' id='playInput'/><br/><button id='submit'>Submit</button>";
	document.getElementById('playInput').focus();
	document.getElementById('submit').addEventListener('click', finalGuess, false);
}

function nextPlayer() {
	switch (currentPlayer()) {
		case playerOne:
			playerOne.currentPlayer = false;
			playerTwo.currentPlayer = true;
			playerThree.currentPlayer = false;
			break;
		case playerTwo:
			playerOne.currentPlayer = false;
			playerTwo.currentPlayer = false;
			playerThree.currentPlayer = true;
			break;
		case playerThree:
			playerOne.currentPlayer = true;
			playerTwo.currentPlayer = false;
			playerThree.currentPlayer = false;
			break;
	}
	basePhase();
}





