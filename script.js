// Creates players
const playerFactory = (name, mark, moves) => {
    const playTurn = (idx) => {
        gameBoard.boardArray[idx] = mark;
        gameBoard.render();
    }

    return { name, mark, moves, playTurn };
};


// Board module
const gameBoard = (() => {
    const cells = Array.from(document.querySelectorAll('.cell'));
    let winner = null;
    let turns = 0;

    // Game board
    let boardArray = ['', '', '', '', '', '', '', '', ''];

    // Win conditions
    const winConditions = [
        [0, 1, 2],
        [0, 3, 6],
        [3, 4, 5],
        [6, 7, 8],
        [1, 4, 7],
        [2, 4, 6],
        [2, 5, 8],
        [0, 4, 8]
    ];


    // determines if the game is over
    const isGameOver = (player1, player2) => {
        xMoves = player1.moves;
        yMoves = player2.moves;

        for (i = 0; i < winConditions.length; i++) {
            if (gameBoard.winConditions[i].every(val => xMoves.includes(val))) {
                winner = 'p1';
                return winner;
            }
            else if (gameBoard.winConditions[i].every(val => yMoves.includes(val))) {
                winner = 'p2';
                return winner;
            }
        }

    }

    // draws the board
    const render = () => {
        boardArray.forEach((mark, idx) => {
            cells[idx].textContent = boardArray[idx];
        });
    };

    return { boardArray, winConditions, render, winner, cells, isGameOver, turns }

})();


// Game controller module
const gameController = (() => {
    const player1 = playerFactory('player 1', 'X', []);
    const player2 = playerFactory('player 2', 'O', []);
    const winnerTitle = document.querySelector('.winner-title');
    const restartButton = document.querySelector('.restart-button');
    const turnContainer = document.querySelector('.turn-container');

    // Turn
    let player1turn = true;
    turnContainer.textContent = 'Player X\'s Turn'

    const toggleTurn = () => {
        if (player1turn) {
            turnContainer.textContent = 'Player O\'s Turn'
        } else {
            turnContainer.textContent = 'Player X\'s Turn'
        }
        player1turn = !player1turn;
    }

    restartButton.addEventListener('click', () => {
        location.reload();
        return false;
    })


    const winGame = (player) => {
        turnContainer.textContent = '';
        restartButton.textContent = 'Play Again';

        if (player === 'p1') {
            winnerTitle.textContent = 'Player X Wins!';
            return;
        } else if (player === 'p2') {
            winnerTitle.textContent = 'Player O Wins!';
            return;
        } else {
            winnerTitle.textContent = 'It\'s a Tie!';
            return;
        }
    }

    // Play game
    gameBoard.cells.forEach(cell => {
        cell.addEventListener('mousedown', function (e) {
            if (gameBoard.boardArray[e.target.id] === '') { 
                gameBoard.turns++; 
            }
            
            if (gameBoard.isGameOver(player1, player2) === undefined && gameBoard.turns < 9) {
                if (player1turn) {
                    if (gameBoard.boardArray[e.target.id] === '') {
                        player1.playTurn(e.target.id);
                        player1.moves.push(Number(e.target.id));
                        toggleTurn();

                        if (gameBoard.isGameOver(player1, player2) === 'p1') {
                            winGame('p1');
                        }
                    }
                } else {
                    if (gameBoard.boardArray[e.target.id] === '') {
                        player2.playTurn(e.target.id);
                        player2.moves.push(Number(e.target.id));
                        toggleTurn();

                        if (gameBoard.isGameOver(player1, player2) === 'p2') {
                            winGame('p2');
                        }
                    }
                }
            } else if (gameBoard.turns === 9) {
                if (player1turn) {
                    player1.playTurn(e.target.id);
                    player1.moves.push(Number(e.target.id));
                    if (gameBoard.isGameOver(player1, player2) === 'p1') {
                        winGame('p1');
                    } else if (gameBoard.isGameOver(player1, player2) === undefined) {
                        winGame('tie');
                    }
                } else {
                    player2.playTurn(e.target.id);
                    player2.moves.push(Number(e.target.id));
                    if (gameBoard.isGameOver(player1, player2) === 'p2') {
                        winGame('p2');
                    } else if (gameBoard.isGameOver(player1, player2) === undefined) {
                        winGame('tie');
                    }
                }
            }

        })
    })

    return {}
})();

