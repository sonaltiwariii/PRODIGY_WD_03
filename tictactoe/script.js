const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
const toggleModeButton = document.getElementById('toggleMode');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let isPlayerVsComputer = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);
toggleModeButton.addEventListener('click', toggleMode);

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !isGameActive()) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (checkWin()) {
        setTimeout(() => alert('Player ' + currentPlayer + ' wins!'), 100);
        return;
    }

    if (!gameState.includes('')) {
        setTimeout(() => alert('Draw!'), 100);
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (isPlayerVsComputer && currentPlayer === 'O') {
        makeComputerMove();
    }
}

function makeComputerMove() {
    let availableCells = [];
    gameState.forEach((cell, index) => {
        if (cell === '') {
            availableCells.push(index);
        }
    });

    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const chosenCellIndex = availableCells[randomIndex];
    
    gameState[chosenCellIndex] = 'O';
    cells[chosenCellIndex].textContent = 'O';

    if (checkWin()) {
        setTimeout(() => alert('Player O wins!'), 100);
        return;
    }

    if (!gameState.includes('')) {
        setTimeout(() => alert('Draw!'), 100);
        return;
    }

    currentPlayer = 'X';
}

function checkWin() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
    }
    return false;
}

function isGameActive() {
    return !checkWin() && gameState.includes('');
}

function restartGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
}

function toggleMode() {
    isPlayerVsComputer = !isPlayerVsComputer;
    toggleModeButton.textContent = isPlayerVsComputer ? 'Switch to Player vs. Player' : 'Switch to Player vs. Computer';
    restartGame();
}