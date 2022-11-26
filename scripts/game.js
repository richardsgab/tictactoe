function resetGameStatus() {
    activePlayer = 0;
    currentRound = 1;
    gameIsOver = false;

    gameOverElement.firstElementChild.innerHTML = 'You won, <span id="winner-name">PLAYER NAME </span>!'
    gameOverElement.style.display = 'none';

    //Para vaciar los datos de gameData:
    let gameBoardIndex = 0; 
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameData[i][j] = 0;
            //Para tb vaciar los datos en el browser:
            const gameBoardItemElement = gameBoardElement.children[gameBoardIndex];
            gameBoardItemElement.textContent = '';
            gameBoardItemElement.classList.remove('disabled');
            gameBoardIndex++;
        }
    }
}

function startNewGame() {
    if (players[0].name === '' || players[1].name === '') { //validar players
        alert('duh!!!')
        return;
    }

    resetGameStatus();//Vacia el tablero y los datos del juego anterior, menos los nombres

    activePlayerNameElement.textContent = players[activePlayer].name;
    gameAreaElement.style.display = 'block';
}

function switchPlayer() { //cambia al otro jugador
    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }
    activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
   
    const selectedField = event.target;    
    
    const selectedColumn = selectedField.dataset.col - 1; //para convertirlo a num(es string)
    const selectedRow = selectedField.dataset.row - 1;

    if (gameData[selectedRow][selectedColumn] > 0 || gameIsOver) {
        alert('Duh!!');
        return;
    }

    selectedField.textContent = players[activePlayer].symbol; // = players[0] (marca su simbolo en el field)
    selectedField.classList.add('disabled');

    gameData[selectedRow][selectedColumn] = activePlayer + 1; // se suma 1 para que devuelva 1 o 2 (en vez de 0 o 1)
    console.log(gameData);

    const winnerId = checkForGameOver();
    console.log(winnerId);
    //Dado que se returna winnerId=0 si no hay ni ganador ni empate:
    if (winnerId !== 0) {
        endGame(winnerId);
    }

    currentRound++;
    switchPlayer();
}

function checkForGameOver() {
    //Checking the ROWS for equality (winner)
    for (let i = 0; i < 3; i++){
        if(gameData[i][0] > 0 && gameData[i][0] === gameData[i][1] && gameData[0][1] === gameData[0][2]) {
            return gameData[i][0];
        }
    }

    //Checking for COLUMNS
    for (let i = 0; i < 3; i++){
        if(gameData[0][i] > 0 && gameData[0][i] === gameData[1][i] && gameData[2][i] === gameData[0][2]) {
            return gameData[0][i];
        }
    }

    //Checking DIAGONAL: top left to bottom right
    if (
        gameData[0][0] > 0 && gameData[0][0] === gameData[1][1] && gameData[1][1] === gameData[2][2]
    ) {
        return gameData[0][0];
    }
    //Checking DIAGONAL: bottom left to top right
    if (
        gameData[2][0] > 0 && gameData[2][0] === gameData[1][1] && gameData[1][1] === gameData[0][2]
    ) {
        return gameData[2][0];
    }
      
    //Checking for a DRAW, after the 9th round
    if (currentRound === 9){
        return -1;
    }
    return 0;
}

function endGame(winnerId) {
    gameIsOver = true;
    gameOverElement.style.display = 'block';
    //Primero, comprueba que no sea un empate(-1):
    if (winnerId > 0) {
    //recupera 'name' del array, desde 'winnerId', pero con un id de 0 o 1:
    const winnerName = players[winnerId - 1].name;
    //para acceder al elem span:
    gameOverElement.firstElementChild.firstElementChild.textContent = winnerName;
    }
    else {
        //en el h2, presenta un texto:
        gameOverElement.firstElementChild.textContent = 'It\s a draw!';
    }
    
}
