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
    // if (event.target.tagName !== 'LI') { //si el click NO es en un LI, el resto de la funcion no sigue
    //     return;
    // }

    event.target.textContent = players[activePlayer].symbol; // = players[0] (marca su simbolo en el field)
    event.target.classList.add('disabled'); 
    switchPlayer();
}