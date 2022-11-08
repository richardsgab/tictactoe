function openPlayerConfig() {
  editedPlayer = +event.target.dataset.playerid; // +"1" => 1 (string to number)
  playerConfigOverlayElement.style.display = "block";
  backdropElement.style.display = "block";
}

function closePlayerConfig() {
  playerConfigOverlayElement.style.display = "none";
  backdropElement.style.display = "none";
  formElement.firstElementChild.classList.remove('error');
  errorsOutputElement.textContext = '';
  formElement.firstElementChild.lastElementChild.value = ''; //vuelve el input a vacio.Tb se puede usando el id del input
}

function savePlayerConfig(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const enteredPlayerName = formData.get('playername').trim();
  // console.log(enteredPlayerName);

  if (!enteredPlayerName) { // enteredPlayername === ''
    event.target.firstElementChild.classList.add('error');
    errorsOutputElement.textContext = 'Please enter a valid name duh!';
   console.log('cuack!');
    return;
  };

  const updatedPlayerDataElement = document.getElementById('player-' + editedPlayer 
  + '-data');
  updatedPlayerDataElement.children[1].textContent = enteredPlayerName;

  players[editedPlayer - 1].name = enteredPlayerName; // para que de 0 o 1 como valor

  closePlayerConfig();
}
