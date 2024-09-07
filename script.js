document.addEventListener('DOMContentLoaded', () => {
    createBoard();
    document.getElementById('rollDice').addEventListener('click', rollDice);
    document.getElementById('player1Color').addEventListener('input', updatePlayerColors);
    document.getElementById('player2Color').addEventListener('input', updatePlayerColors);
});

let currentPlayer = 1;
const playerPositions = {
    player1: 0,
    player2: 0
};

function createBoard() {
    const board = document.getElementById('board');
    for (let i = 100; i > 0; i--) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.cellId = i;
        cell.textContent = i;
        board.appendChild(cell);
    }
    updatePlayerPositions();
}

function rollDice() {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    document.getElementById('diceResult').innerText = `🎲 ${diceRoll}`;
    movePlayer(diceRoll);
}

function movePlayer(diceRoll) {
    const playerKey = `player${currentPlayer}`;
    playerPositions[playerKey] += diceRoll;

    if (playerPositions[playerKey] > 100) {
        playerPositions[playerKey] = 100;
    }

    updatePlayerPositions();

    if (playerPositions[playerKey] === 100) {
        document.getElementById('message').innerText = `¡${playerKey} ha ganado!`;
        document.getElementById('rollDice').disabled = true;
    } else {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        document.getElementById('message').innerText = `Turno del Jugador ${currentPlayer}`;
    }
}

function updatePlayerPositions() {
    document.querySelectorAll('.player').forEach(player => player.remove());

    Object.keys(playerPositions).forEach(playerKey => {
        const position = playerPositions[playerKey];
        if (position > 0) {
            const cell = document.querySelector(`[data-cellId='${position}']`);
            const playerDiv = document.createElement('div');
            playerDiv.id = playerKey;
            playerDiv.classList.add('player');
            playerDiv.style.backgroundColor = document.getElementById(`${playerKey}Color`).value;
            cell.appendChild(playerDiv);
        }
    });
}

function updatePlayerColors() {
    updatePlayerPositions();
}
