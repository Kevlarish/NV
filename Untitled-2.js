
    function handleCellClick(event) {
        const index = event.target.dataset.index;

        if (gameBoard[index] === '' && gameActive) {
            gameBoard[index] = currentPlayer;
            event.target.textContent = currentPlayer;
            checkWinner();
            togglePlayer();
        }
    }

    function togglePlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                message.textContent = `Player ${currentPlayer} wins!`;
                gameActive = false;
                highlightWinnerCells(pattern);
                showRestartButton();
                return;
            }
        }

        if (!gameBoard.includes('')) {
            message.textContent = 'It\'s a draw!';
            gameActive = false;
            showRestartButton();
        }
    }

    function highlightWinnerCells(pattern) {
        for (const index of pattern) {
            board.children[index].style.backgroundColor = '#7FFF00'; // Highlight winning cells
        }
    }

    function showRestartButton() {
        const restartButton = document.createElement('button');
        restartButton.textContent = 'Restart Game';
        restartButton.addEventListener('click', resetGame);
        message.appendChild(restartButton);
    }

    function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        message.textContent = `Player ${currentPlayer}'s turn`;

        for (const cell of board.children) {
            cell.textContent = '';
            cell.style.backgroundColor = '';
        }

        const restartButton = document.querySelector('button');
        if (restartButton) {
            message.removeChild(restartButton);
        }
    }

    createBoard();
</script>
</body>
</html>
