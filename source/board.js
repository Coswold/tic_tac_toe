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

	checkBoard (player, dialogue) {
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

	isValid (input, players, dialogue) {
		//  check for open position
		if (input >= 0 && input <= 8 &&
			this.pos[input] != players.p1 &&
			this.pos[input] != players.p2) {
			return (1);
		} else {
			dialogue.invalid();
			return (0);
		}
	}

	checkTie (dialogue) {
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

    clear () {
      return //process.stdout.write('\033c');
    }

	printBoard () {
		this.clear();
		console.log('\x1b[36m%s\x1b[0m', '\n/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\n\n');
		console.log('     ' + this.pos[0] + ' | ' + this.pos[1] + ' | ' + this.pos[2] + ' ' + '\n'
			+ '    ===+===+===' + '\n'
			+ '     ' + this.pos[3] + ' | ' + this.pos[4] + ' | ' + this.pos[5] + ' ' + '\n'
			+ '    ===+===+===' + '\n'
			+ '     ' + this.pos[6] + ' | ' + this.pos[7] + ' | ' + this.pos[8] + ' ' + '\n');
		console.log('\x1b[36m%s\x1b[0m', '\n/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\n');
	}

    printMenu () {
    	this.clear();
    	console.log('\x1b[36m%s\x1b[0m', '\n/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\n\n');
    	console.log('   1: Man Vs. Man\n'
    		+ '\n'
    		+ '   2: Man Vs. Com\n'
    		+ '\n'
    		+ '   3: Com Vs. Com\n');
    	console.log('\x1b[36m%s\x1b[0m', '\n/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\n');
    }

    printDMenu () {
    	this.clear();
    	console.log('\x1b[36m%s\x1b[0m', '\n/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\n\n');
    	console.log('\x1b[32m%s\x1b[0m', '   1: Easy\n');
    	console.log('\x1b[33m%s\x1b[0m', '   2: Medium\n');
    	console.log('\x1b[31m%s\x1b[0m', '   3: Hard\n');
    	console.log('\x1b[36m%s\x1b[0m', '\n/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\n');
    }
}

module.exports = Board;
