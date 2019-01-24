class Dialogue {
	youWin (player) {
		console.log('\x1b[32m%s\x1b[0m', 'Player ' + player + ' \x1b[32mwins!\x1b[0m');
	}

	invalid () {
		console.log('\x1b[31m%s\x1b[0m', 'Invalid input.');
	}

	comMove (cMove) {
		console.log('Computer chose position ' + cMove + '.');
	}

	tieGame () {
		console.log('\x1b[34m%s\x1b[0m', 'Looks like some sort of tie game');
	}
}

module.exports = Dialogue;
