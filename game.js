const Dialogue = require('./source/logger.js');
const Board = require('./source/board.js');
const Player = require('./source/player.js');
var readline = require('readline-sync');

class Game {
	constructor (easy, med, hard) {
		this.cMove;
		this.level = [easy, med, hard];
		this.board = new Board();
		this.players = new Player();
		this.dialogue = new Dialogue();
		this.gameType;
		this.diff;
		this.start;
		this.currentPlayer = this.players.p1;
	}

	chooseGame () {
		this.gameType = parseInt(readline.question('Enter game type [1-3]: '));
		if (this.gameType > 0 && this.gameType <= 3) {
			return;
		} else {
			this.board.printMenu();
			this.dialogue.invalid();
			this.chooseGame();
		}
	}

	gameLoop () {
		this.board.printMenu();
		this.chooseGame();
		console.log(this.gameType);
		this.playGame();
	}

	switchPlayer () {
		if (this.currentPlayer == this.players.p1) {
			this.currentPlayer = this.players.p2;
		} else {
			this.currentPlayer = this.players.p1
		}
	}

	comVsCom () {
		this.cMove = Math.floor(Math.random() * 9);
		this.cMove = this.players.takeBlock(this.board, this.cMove);
		this.cMove = this.players.takeWin(this.board, this.cMove);
		if (this.board.isValid(this.cMove, this.players, this.dialogue) === 1) {
			this.board.pos[this.cMove] = this.currentPlayer;
			this.board.printBoard();
			this.dialogue.comMove(this.cMove);
			if (this.board.checkBoard(this.currentPlayer, this.dialogue) === 0 &&
			this.board.checkTie(this.dialogue) === 0) {
				console.log('Thinking..');
				this.switchPlayer();
				this.comVsCom(this.currentPlayer)
			}
		} else {
			this.comVsCom(this.currentPlayer);
		}
	}

	turn (player) {
		var position = readline.question('Player ' + player + ' please choose a location: ')
		if (this.board.isValid(position, this.players, this.dialogue) === 1) {
			this.board.pos[position] = player;
			this.board.printBoard();
		} else {
			turn (player);
		}
		if (this.board.checkBoard(player, this.dialogue, this.playAgain) === 0 &&
		this.board.checkTie(this.dialogue, this.playAgain) === 0) {
			if (player == this.players.p1) {
				this.turn(this.players.p2);
				return;
			} else {
				this.turn(this.players.p1);
				return;
			}
		}
	}

	chooseDiff () {
		this.board.printDMenu();
		this.diff = parseInt(readline.question('Enter difficulty level [1-3]: '));
		if (this.diff > 0 && this.diff <= 3) {
			return;
		} else {
			this.dialogue.invalid();
			this.chooseDiff();
		}
	}

	chooseStart () {
		this.start = parseInt(readline.question('Who starts, man or machine? [1: man - 2: machine]: '));
		if (this.start > 0 && this.start <= 2) {
			return;
		} else {
			this.dialogue.invalid();
			this.chooseStart();
		}
	}

	manVsCom() {
		this.board.printBoard();
		if (this.start == 2) {
			this.level[this.diff - 1](this.players.p2);
		} else {
			this.playerMove(this.players.p1);
		}
	}

	playerMove(player) {
		var position = parseInt(readline.question('Please choose a location: '));
		if (this.board.isValid(position, this.dialogue) === 1) {
			this.board.pos[position] = player;
			if (this.board.checkBoard(player, this.dialogue) === 0 &&
			this.board.checkTie(this.dialogue) === 0) { //  check for win or tie
				this.level[this.diff - 1](this.players.p2);
			}
		} else {
			this.playerMove(this.players.p1);
		}
	}

	playGame () {
		if (this.gameType === 1) {
			this.board.printBoard();
			this.players.chooseLetter();
			this.turn(this.players.p1);
			this.playAgain();
		} if (this.gameType == 2) {
			this.chooseDiff()
			this.chooseStart()
			this.manVsCom();
			this.playAgain();
		} if (this.gameType == 3) {
			this.comVsCom();
		}
	}

	playAgain () {
		this.board.reset();
		var again = readline.question("Play again? [y/n]: ");
		if (again == 'y' || again == 'Y') {
			this.gameLoop();
		} else {
			return;
		}
	}
}

var easy = function(player) {
	game.cMove = Math.floor(Math.random() * 9); // choose random position
		if (game.board.isValid(game.cMove, players, game.dialogue) === 1) {
			game.board.pos[game.cMove] = player;
			game.board.printBoard();
			game.dialogue.comMove(game.cMove);
			if (game.board.checkBoard(player, game.dialogue) === 0 &&
			game.board.checkTie(game.dialogue) === 0) {
				game.playerMove(game.players.p1);
			}
		} else {
			easy(player);
		}
	}

var med = function(player) {
	game.cMove = game.board.pos[Math.floor(Math.random() * 9)];
	game.cMove = game.players.takeWin(game.board, game.cMove);
	game.cMove = game.players.takeBlock(game.board, game.cMove);
	if (game.board.isValid(game.cMove, game.players, game.dialogue) === 1) {
		game.board.pos[game.cMove] = player;
		game.board.printBoard();
		game.dialogue.comMove(game.cMove);
		if (game.board.checkBoard(player, game.dialogue) === 0 &&
		game.board.checkTie(game.dialogue) === 0) {
			game.playerMove(game.players.p1);
		}
	} else {
		med(player);
	}
}

var hard = function(player) {
	game.cMove = game.board.corners[Math.floor(Math.random() * 5)];
	game.cMove = game.players.blockForks(game.board, game.cMove);
	game.cMove = game.players.checkCorners(game.board, game.cMove);
	game.cMove = game.players.takeBlock(game.board, game.cMove);
	game.cMove = game.players.takeWin(game.board, game.cMove);
	if (game.board.isValid(game.cMove, game.players, game.dialogue) === 1) {
		game.board.pos[game.cMove] = player;
		game.board.printBoard();
		game.dialogue.comMove(game.cMove);
		if (game.board.checkBoard(player, game.dialogue) === 0 &&
		game.board.checkTie(game.dialogue) === 0) {
			game.playerMove(game.players.p1);
		}
	} else {
		hard(player);
	}
}

game = new Game(easy, med, hard);
game.gameLoop();
