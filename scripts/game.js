function startNewGame() {
    if (players[0].name === '' || players[1].name === '') { //validar players
        alert('duh!!!')
        return;
    }

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

    if (gameData[selectedRow][selectedColumn] > 0) {
        alert('Duh!!');
        return;
    }

    selectedField.textContent = players[activePlayer].symbol; // = players[0] (marca su simbolo en el field)
    selectedField.classList.add('disabled');

    gameData[selectedRow][selectedColumn] = activePlayer + 1; // se suma 1 para que devuelva 1 o 2 (en vez de 0 o 1)
    console.log(gameData);

    const winnerId = checkForGameOver();
    console.log(winnerId);

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