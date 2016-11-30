var letterSpaceId = 0;

var cardSpace = function() {
	this.gen = function(){
		this.id = "letter" +letterSpaceId;
		letterSpaceId++;
		document.getElementById("wrapper").insertAdjacentHTML('beforeend',"<div class='letterSpace' id='" + this.id + "'></div>");
	}
}

var space = new cardSpace();
for (var i = 0; i < 56; i++) {
	space.gen();
}

function play(word) {
	let length = word.length;
	let preSpace = (Math.ceil((14-word.length)/2)+14);
	for (var i = 14; i < 28; i++) {
		document.getElementById("letter"+i).style.backgroundColor = 'aqua';
	}	
	for (var i = preSpace; i < (word.length + preSpace); i++) {
		document.getElementById("letter"+i).style.backgroundColor = 'white';
	}
}