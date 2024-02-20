document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const resetButton = document.getElementById("resetButton");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    // Membuat grid selama 3x3
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("grid-item");
        cell.dataset.index = i;
        cell.addEventListener("click", () => handleCellClick(i));
        board.appendChild(cell);
    }

    function handleCellClick(index) {
        if (!gameBoard[index]) {
            gameBoard[index] = currentPlayer;
            renderBoard();
            if (checkWinner()) {
                alert(`Player ${currentPlayer} wins!`);
                resetGame();
            } else if (isBoardFull()) {
                alert("It's a tie!");
                resetGame();
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    }

    function renderBoard() {
        const cells = document.querySelectorAll(".grid-item");
        cells.forEach((cell, index) => {
            cell.textContent = gameBoard[index];
        });
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return true;
            }
        }

        return false;
    }

    function isBoardFull() {
        return gameBoard.every(cell => cell !== "");
    }

    function resetGame() {
        currentPlayer = "X";
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        renderBoard();
    }
});
