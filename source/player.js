var readline = require('readline-sync');

class Player {
	constructor () {
        this.p1 = ('\x1b[35m' + 'X' + '\x1b[0m');
        this.p2 = ('\x1b[32m' + 'O' + '\x1b[0m');
	}

	chooseLetter (piece) {
		var letter = readline.question('Please choose a letter to represent yourself: ');
			if (/[a-zA-Z]/.test(letter) === true) {
				piece = letter[0];
			} else {
				dialogue.invalid();
				this.chooseLetter();
			}
	}

	takeBlock (board, cMove) {
		for (var i = 0; i < board.win.length; i++) {
			var count = 0;
			for (var j = 0; j < board.win[i].length; j++) {
				if (board.pos[board.win[i][j]] == this.p1) {
					count++;
				} if (count == 2) {
					for (var k = 0; k < board.win[i].length; k++) {
						if (board.pos[board.win[i][k]] != this.p2 &&
							board.pos[board.win[i][k]] != this.p1) {
							cMove = board.win[i][k];
						}
					}
				}
			}
		}
        return(cMove)
	}

	takeWin (board, cMove) {
		for (var i = 0; i < board.win.length; i++) {
			var count = 0;
			for (var j = 0; j < board.win[i].length; j++) {
				if (board.pos[board.win[i][j]] == this.p2) {
					count++;
				} if (count == 2) {
					for (var k = 0; k < board.win[i].length; k++) {
						if (board.pos[board.win[i][k]] != this.p2 &&
							board.pos[board.win[i][k]] != this.p1) {
							cMove = board.win[i][k];
						}
					}
				}
			}
		}
        return(cMove)
	}

	blockForks (board, cMove) {
		var count = 0;
		var count2 = 0;
		for (var i = 0; i < board.corners.length; i++) {
			if (board.pos[board.corners[i]] == this.p1) {
				count++;
			}
		}
		for (var k = 0; k < board.spaces.length; k++) {
			if (board.pos[board.spaces[k]] == this.p1) {
				count2++;
			}
		}
		if ((count === 1 || count2 === 1) && board.pos[4] == 4) {
			cMove = 4;
		} if (count == 2 &&
			board.pos[4] == this.p2 &&
			count2 === 0) {
			cMove = board.spaces[Math.floor(Math.random() * 5)];
		}
        return(cMove)
	}

	checkCorners (board, cMove) {
		var count = 0;
		for (var i = 0; i < board.corners.length; i++) {
			if (board.pos[board.corners[i]] == this.p1 ||
				board.pos[board.corners[i]] == this.p2) {
				count++;
			}
		}
		if (count == 4) {
			cMove = board.spaces[Math.floor(Math.random() * 5)];
		}
        return(cMove)
	}
}

module.exports = Player;
