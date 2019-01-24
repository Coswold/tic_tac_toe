
var readline = require('readline-sync');

var cMove;

class Dialogue {
	youWin (player) {
		console.log('\x1b[32m%s\x1b[0m', 'Player ' + player + ' \x1b[32mwins!\x1b[0m');
		playAgain();
	}

	invalid () {
		console.log('\x1b[31m%s\x1b[0m', 'Invalid input.');
	}

	comMove () {
		console.log('Computer chose position ' + cMove + '.');
	}

	tieGame () {
		console.log('\x1b[34m%s\x1b[0m', 'Looks like some sort of tie game');
		playAgain();
	}
}

class Player {
	constructor (gamePiece, color) {
		this.gamePiece = color + gamePiece + '\x1b[0m';
		this.color = color;
	}

	chooseLetter () {
		var letter = readline.question('Please choose a letter to represent yourself: ');
			if (/[a-zA-Z]/.test(letter) === true) {
				this.gamePiece = this.color + letter[0] + '\x1b[0m';
			} else {
				dialogue.invalid();
				this.chooseLetter();
			}
	}
}

class Board {
	constructor () {
		// valid board indexes
		this.pos = [0, 1, 2, 3, 4, 5, 6, 7, 8];
		// winning triplets
		this.win = [
			[0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
			[0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns
			[0, 4, 8], [6, 4, 2]  // diagonals
		];
		// for AI players to block "forks"
		this.corners = [0, 2, 6, 8];  // corners of the board
		this.spaces = [1, 3, 5, 7];  //  space positions of board
	}

	checkBoard (player) {
		//  Look for winning formation
		for (var i = 0; i < this.win.length; i++) {
			var c = 0;  // count number of same symbols in a row/column
			for (var j = 0; j < this.win[i].length; j++) {
				if (this.pos[this.win[i][j]] === player) {
					c++;
				} if (c === 3) {
					this.printBoard();
					dialogue.youWin(player);
						return (1);
				}
			}
		}
		return (0);
	}

	isValid (input) {
		//  check for open position
		if (input >= 0 && input <= 8 &&
			this.pos[input] != p1.gamePiece &&
			this.pos[input] != p2.gamePiece) {
			return (1);
		} else {
			dialogue.invalid();
			return (0);
		}
	}

	checkTie () {
		// Look for filled board with no win
		for (var i = 0; i < this.pos.length; i++) {
			if (this.pos[i] >= 0 &&
				this.pos[i] <= 8) {
				return (0);
			}
		}
		this.printBoard();
		dialogue.tieGame();
		return (1);
	}

	reset () {
		for (var i = 0; i < this.pos.length; i++) {
			this.pos[i] = i;
		}
	}

	printBoard () {
		clear();
		console.log('\x1b[36m%s\x1b[0m', '\n/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\n\n');
		console.log('     ' + this.pos[0] + ' | ' + this.pos[1] + ' | ' + this.pos[2] + ' ' + '\n'
			+ '    ===+===+===' + '\n'
			+ '     ' + this.pos[3] + ' | ' + this.pos[4] + ' | ' + this.pos[5] + ' ' + '\n'
			+ '    ===+===+===' + '\n'
			+ '     ' + this.pos[6] + ' | ' + this.pos[7] + ' | ' + this.pos[8] + ' ' + '\n');
		console.log('\x1b[36m%s\x1b[0m', '\n/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\n');
	}
}

function playerMove(player) {
	var position = parseInt(readline.question('Please choose a location: '));
	if (board.isValid(position) === 1) {
		board.pos[position] = player;
		if (board.checkBoard(player) === 0 &&
		board.checkTie() === 0) { //  check for win or tie
			level[diff - 1](p2.gamePiece);
		}
	} else {
		playerMove(p1.gamePiece);
	}
}

var easy = function(player) {
	cMove = Math.floor(Math.random() * 9); // choose random position
		if (board.isValid(cMove) === 1) {
			board.pos[cMove] = player;
			board.printBoard();
			dialogue.comMove();
			if (board.checkBoard(player) === 0 &&
			board.checkTie() === 0) {
				playerMove(p1.gamePiece);
			}
		} else {
			easy(player);
		}
	}

var med = function(player) {
	cMove = board.pos[Math.floor(Math.random() * 9)];
	takeWin();
	takeBlock();
	if (board.isValid(cMove) === 1) {
		board.pos[cMove] = player;
		board.printBoard();
		dialogue.comMove();
		if (board.checkBoard(player) === 0 &&
		board.checkTie() === 0) {
			playerMove(p1.gamePiece);
		}
	} else {
		med(player);
	}
}

function takeBlock () {
	for (var i = 0; i < board.win.length; i++) {
		var count = 0;
		for (var j = 0; j < board.win[i].length; j++) {
			if (board.pos[board.win[i][j]] == p1.gamePiece) {
				count++;
			} if (count == 2) {
				for (var k = 0; k < board.win[i].length; k++) {
					win_pos = board.win[i][k]
					if (board.pos[win_pos] != p2.gamePiece &&
						board.pos[win_pos] != p1.gamePiece) {
						cMove = win_pos;
					}
				}
			}
		}
	}
}


function takeWin () {
	for (var i = 0; i < board.win.length; i++) {
		var count = 0;
		for (var j = 0; j < board.win[i].length; j++) {
			if (board.pos[board.win[i][j]] == p2.gamePiece) {
				count++;
			} if (count == 2) {
				for (var k = 0; k < board.win[i].length; k++) {
					if (board.pos[board.win[i][k]] != p2.gamePiece &&
						board.pos[board.win[i][k]] != p1.gamePiece) {
						cMove = board.win[i][k];
					}
				}
			}
		}
	}
}

function blockForks () {
	var count = 0;
	var count2 = 0;
	for (var i = 0; i < board.corners.length; i++) {
		if (board.pos[board.corners[i]] == p1.gamePiece) {
			count++;
		}
	}
	for (var k = 0; k < board.spaces.length; k++) {
		if (board.pos[board.spaces[k]] == p1.gamePiece) {
			count2++;
		}
	}
	if ((count === 1 || count2 === 1) && board.pos[4] == 4) {
		cMove = 4;
	} if (count == 2 && board.pos[4] == p2.gamePiece && count2 === 0) {
		cMove = board.spaces[Math.floor(Math.random() * 5)];
	}
}

function checkCorners () {
	var count = 0;
	for (var i = 0; i < board.corners.length; i++) {
		if (board.pos[board.corners[i]] == p1.gamePiece ||
			board.pos[board.corners[i]] == p2.gamePiece) {
			count++;
		}
	}
	if (count == 4) {
		cMove = board.spaces[Math.floor(Math.random() * 5)];
	}
}

var hard = function(player) {
	cMove = board.corners[Math.floor(Math.random() * 5)];
	blockForks();
	checkCorners();
	takeBlock();
	takeWin();
	if (board.isValid(cMove) === 1) {
		board.pos[cMove] = player;
		board.printBoard();
		dialogue.comMove();
		if (board.checkBoard(player) === 0 && board.checkTie() === 0) {
			playerMove(p1.gamePiece);
		}
	} else {
		hard(player);
	}
}

var level = [easy, med, hard];

function switchPlayer () {
	if (currentPlayer == p1.gamePiece) {
		currentPlayer = p2.gamePiece;
	} else {
		currentPlayer = p1.gamePiece
	}
}

function comVsCom () {
	cMove = Math.floor(Math.random() * 9);
	takeBlock();
	takeWin();
	if (board.isValid(cMove) === 1) {
		board.pos[cMove] = currentPlayer;
		board.printBoard();
		dialogue.comMove();
		if (board.checkBoard(currentPlayer) === 0 && board.checkTie() === 0) {
			console.log('Thinking..');
			switchPlayer();
			setTimeout(function(){comVsCom(currentPlayer)}, 1600);
		}
	} else {
		comVsCom(currentPlayer);
	}
}

function clear () {
  return process.stdout.write('\033c');
}

let board = new Board();
let p1 = new Player('X', '\x1b[35m');
let p2 = new Player('O', '\x1b[32m');
let dialogue = new Dialogue();
var gameType;
var diff;
var currentPlayer = p1.gamePiece;

function printMenu () {
	clear();
	console.log('\x1b[36m%s\x1b[0m', '\n/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\n\n');
	console.log('   1: Man Vs. Man\n'
		+ '\n'
		+ '   2: Man Vs. Com\n'
		+ '\n'
		+ '   3: Com Vs. Com\n');
	console.log('\x1b[36m%s\x1b[0m', '\n/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\n');
}

function printDMenu () {
	clear();
	console.log('\x1b[36m%s\x1b[0m', '\n/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\n\n');
	console.log('\x1b[32m%s\x1b[0m', '   1: Easy\n');
	console.log('\x1b[33m%s\x1b[0m', '   2: Medium\n');
	console.log('\x1b[31m%s\x1b[0m', '   3: Hard\n');
	console.log('\x1b[36m%s\x1b[0m', '\n/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\n');
}

function chooseGame () {
	gameType = parseInt(readline.question('Enter game type [1-3]: '));
	if (gameType > 0 && gameType <= 3) {
		return;
	} else {
		printMenu();
		dialogue.invalid();
		chooseGame();
	}
}

function turn (player) {
	var position = readline.question('Player ' + player + ' please choose a location: ')
	if (board.isValid(position) === 1) {
		board.pos[position] = player;
		board.printBoard();
	} else {
		turn (player);
	}
	if (board.checkBoard(player) === 0 && board.checkTie() === 0) {
		if (player == p1.gamePiece) {
			turn(p2.gamePiece);
			return;
		} else {
			turn(p1.gamePiece);
			return;
		}
	}
}

function chooseDiff () {
	printDMenu();
	diff = parseInt(readline.question('Enter difficulty level [1-3]: '));
	if (diff > 0 && diff <= 3) {
		return;
	} else {
		dialogue.invalid();
		chooseDiff();
	}
}

function chooseStart () {
	start = parseInt(readline.question('Who starts, man or machine? [1: man - 2: machine]: '));
	if (start > 0 && start <= 2) {
		return;
	} else {
		dialogue.invalid();
		chooseStart();
	}
}

function manVsCom() {
	board.printBoard();
	if (start == 2) {
		level[diff - 1](p2.gamePiece);
	} else {
		playerMove(p1.gamePiece);
	}
}

function playGame () {
	if (gameType === 1) {
		board.printBoard();
		p1.chooseLetter();
		p2.chooseLetter();
		turn(p1.gamePiece);
	} if (gameType == 2) {
		chooseDiff()
		chooseStart()
		manVsCom();
	} if (gameType == 3) {
		comVsCom();
	}
}

function playAgain() {
	board.reset();
	var again = readline.question("Play again? [y/n]: ");
	if (again == 'y' || again == 'Y') {
		gameLoop();
	} else {
		return;
	}
}

function gameLoop () {
	printMenu();
	chooseGame();
	console.log(gameType);
	playGame();
}

gameLoop();
