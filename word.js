/*Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. 
That means the constructor should define:

An array of new Letter objects representing the letters of the underlying word
A function that returns a string representing the word. This should call the function on each letter object (the first function defined in Letter.js) 
that displays the character or an underscore and concatenate those together.
A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in Letter.js)*/

var Letter = require('./letter.js')

function Word(wrd) {
	this.word = wrd
	this.letters = []
	
	//gets letters and pushes to letter array//
	this.getLetters = function () {
		for(var i = 0; i < this.word.length; i++) {
			var newLetter = new Letter(this.word[i]);
			this.letters.push(newLetter);
		}
	}

	//checks if user found the current word
	this.checkWord = function () {
		if(this.letters.every(function (lttr) {
			return lttr.appear === true;
		})) {
			this.wordFound = true;
			return true;
		}
	}

	//checks to see if letter is in word
	this.checkIfLetterFound = function (guessedLetter) {
		var whatToReturn = 0

		//iterates through each letter to see if it mactches the guessed letter
		this.letters.forEach(function (lttr) {
			if(lttr.letter === guessedLetter) {
				lttr.appear = true
				whatToReturn++
			}
		})
		//if guessLetter matches Letter; show letter
		return whatToReturn
	}

	this.wordShow = function () {
		var display = '';

		//show the word based on if the letter is found or not
		this.letters.forEach(function (lttr) {
			var currentLetter = lttr.letterShow()
			display += currentLetter
		})
		return display
	}
}


module.exports = Word
