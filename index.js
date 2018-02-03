/*The file containing the logic for the course of the game, which depends on Word.js and:

Randomly selects a word and uses the Word constructor to store it
Prompts the user for each guess and keeps track of the user's remaining guesses*/
var inquirer = require('inquirer')
var isLetter = require('is-letter')

var Word = require('./word.js')
var Game = require('./wordbank.js')

var wordBank = Game.newWord.wordList
var guessesRemain = 10
var guessedLetters = []
var display = 0
var currentWord

startGame()

function startGame () {

	console.log('------------------------')
	console.log('Welcome to STAR WARS Hangman!')
	console.log('------------------------')

	//clears guessedLetters before a new game starts
	if (guessedLetters.length > 0) {
		guessedLetters = []
	}

	inquirer.prompt([
		{
			name: 'play',
			type: 'confirm',
			message: 'Ready to play?'
		}
	]).then(function (answer) {
		if (answer.play){
			console.log('')
			console.log('You have 10 guesses to guess the correct STAR WARS term.')
			console.log('Good Luck!')
			newGame()
		} else {
			console.log('May the force be with you!')
		}
	})
}

function newGame() {
	if (guessesRemain === 10) {
		console.log('----------------------------')
	

	//generate random number based on wordBank
	var randNum = Math.floor(Math.random() * wordBank.length)
	currentWord = new Word(wordBank[randNum])
	currentWord.getLetters()

	//display current word as blanks
	console.log(' ')
	console.log(currentWord.wordShow())
	console.log(' ')
	promptUser()
	} else {
		resetGuessesRemaining()
		newGame()
	}
}

function resetGuessesRemainging() {
	guessingRemaining = 10
}

function promptUser() {
	inquirer.prompt([
	{
		name: 'chosenLetter',
		type: 'input',
		message: 'Choose a letter',
		validate: function(value) {
			if (isLetter(value)) {
				return true
			} else {
				return false
			}
		}
	}

		]).then(function(ltr){
			//change letter to uppercase
			var letterReturned = (ltr.chosenLetter).toUpperCase()

			//check to see if you already guessed that letter
			var guessedAlready = false
			for(var i = 0; i < guessedLetters[i]; i++) {
				if (letterReturned === guessedLetters[i]) {
					guessedAlready = true
				}
			}
			if (guessedAlready === false) {
				//push letter to array
				guessedLetters.push(letterReturned)

				//check if letter was in the word
				var found = currentWord.checkIfLetterFound(letterReturned)

				if (found === 0) {
					console.log('Use the force and try again!')

					guessesRemain--

					console.log('---------------------------------------------------------')
                	console.log('')
                	console.log(currentWord.wordShow())
                	console.log('')
                	console.log('---------------------------------------------------------')
                	console.log('Letters guessed: ' + guessedLetters)
				} else {
					console.log('Correct!  The force is strong with you!')

					if(currentWord.checkWord() === true) {
						console.log('')
						console.log(currentWord.wordShow())
						console.log('')
						console.log('---------YOU WIN!!-----------')
					} else {
						console.log('Guesses Remaining: ' + guessesRemain)
						console.log('')
						console.log(currentWord.wordShow())
						console.log('')
						console.log('-----------------------------------------------------')
						console.log('Letters Guessed: ' + guessedLetters)
						promptUser()
					}
				}
				//if guessesRemain and the current word isnt found, prompt user
				if (guessesRemain > 0 && currentWord.wordFound === false) {
					promptUser();
				} else if (guessesRemain === 0) {
					console.log('')
					console.log('------GAME OVER------')
					console.log('')
					console.log('The word you were trying to guess was: ' + currentWord.word)
					console.log('')
				} else {
					console.log('You guessed that letter already, try again.')
					promptUser();
				}
			}
		});
}