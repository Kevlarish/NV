document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const resultDiv = document.getElementById('result');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // Initialize the game board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.addEventListener('click', () => cellClick(i));
        board.appendChild(cell);
    }

    function cellClick(index) {
        if (!gameActive || gameBoard[index] !== '') return;

        gameBoard[index] = currentPlayer;
        renderBoard();

        if (checkWinner()) {
            resultDiv.innerText = `Player ${currentPlayer} wins!`;
            gameActive = false;
        } else if (gameBoard.every(cell => cell !== '')) {
            resultDiv.innerText = "It's a draw!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function renderBoard() {
        gameBoard.forEach((value, index) => {
            board.children[index].innerText = value;
        });
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c];
        });
    }

    function resetGame() {
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        resultDiv.innerText = '';
        renderBoard();
    }
});
