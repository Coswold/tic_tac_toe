const Dialogue = require('./source/logger.js');
const Board = require('./source/board.js');
const Player = require('./source/player.js');
var readline = require('readline-sync');

var cMove;

var easy = function(player) {
	cMove = Math.floor(Math.random() * 9); // choose random position
		if (board.isValid(cMove, players, dialogue) === 1) {
			board.pos[cMove] = player;
			board.printBoard();
			dialogue.comMove(cMove);
			if (board.checkBoard(player, dialogue, playAgain) === 0 &&
			board.checkTie(dialogue, playAgain) === 0) {
				playerMove(players.p1);
			}
		} else {
			easy(player);
		}
	}

var med = function(player) {
	cMove = board.pos[Math.floor(Math.random() * 9)];
	cMove = players.takeWin(board, cMove);
	cMove = players.takeBlock(board, cMove);
	if (board.isValid(cMove, players, dialogue) === 1) {
		board.pos[cMove] = player;
		board.printBoard();
		dialogue.comMove(cMove);
		if (board.checkBoard(player, dialogue, playAgain) === 0 &&
		board.checkTie(dialogue, playAgain) === 0) {
			playerMove(players.p1);
		}
	} else {
		med(player);
	}
}

var hard = function(player) {
	cMove = board.corners[Math.floor(Math.random() * 5)];
	cMove = players.blockForks(board, cMove);
	cMove = players.checkCorners(board, cMove);
	cMove = players.takeBlock(board, cMove);
	cMove = players.takeWin(board, cMove);
	if (board.isValid(cMove, players, dialogue) === 1) {
		board.pos[cMove] = player;
		board.printBoard();
		dialogue.comMove(cMove);
		if (board.checkBoard(player, dialogue, playAgain) === 0 &&
		board.checkTie(dialogue, playAgain) === 0) {
			playerMove(players.p1);
		}
	} else {
		hard(player);
	}
}

var level = [easy, med, hard];

function switchPlayer () {
	if (currentPlayer == players.p1) {
		currentPlayer = players.p2;
	} else {
		currentPlayer = players.p1
	}
}

function comVsCom () {
	cMove = Math.floor(Math.random() * 9);
	cMove = players.takeBlock(board, cMove);
	cMove = players.takeWin(board, cMove);
	if (board.isValid(cMove, players, dialogue) === 1) {
		board.pos[cMove] = currentPlayer;
		board.printBoard();
		dialogue.comMove(cMove);
		if (board.checkBoard(currentPlayer, dialogue, playAgain) === 0 &&
		board.checkTie(dialogue, playAgain) === 0) {
			console.log('Thinking..');
			switchPlayer();
			setTimeout(function(){comVsCom(currentPlayer)}, 1600);
		}
	} else {
		comVsCom(currentPlayer);
	}
}

let board = new Board();
let players = new Player();
let dialogue = new Dialogue();
var gameType;
var diff;
var currentPlayer = players.p1;

function chooseGame () {
	gameType = parseInt(readline.question('Enter game type [1-3]: '));
	if (gameType > 0 && gameType <= 3) {
		return;
	} else {
		board.printMenu();
		dialogue.invalid();
		chooseGame();
	}
}

function turn (player) {
	var position = readline.question('Player ' + player + ' please choose a location: ')
	if (board.isValid(position, players, dialogue) === 1) {
		board.pos[position] = player;
		board.printBoard();
	} else {
		turn (player);
	}
	if (board.checkBoard(player, dialogue, playAgain) === 0 &&
	board.checkTie(dialogue, playAgain) === 0) {
		if (player == players.p1) {
			turn(players.p2);
			return;
		} else {
			turn(players.p1);
			return;
		}
	}
}

function chooseDiff () {
	board.printDMenu();
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
		level[diff - 1](players.p2);
	} else {
		playerMove(players.p1);
	}
}

function playerMove(player) {
	var position = parseInt(readline.question('Please choose a location: '));
	if (board.isValid(position, dialogue) === 1) {
		board.pos[position] = player;
		if (board.checkBoard(player, dialogue, playAgain) === 0 &&
		board.checkTie(dialogue, playAgain) === 0) { //  check for win or tie
			level[diff - 1](players.p2);
		}
	} else {
		playerMove(players.p1);
	}
}

function playGame () {
	if (gameType === 1) {
		board.printBoard();
		player.chooseLetter();
		turn(players.p1);
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
	board.printMenu();
	chooseGame();
	console.log(gameType);
	playGame();
}

gameLoop();
