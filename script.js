//Variables globales
let deck = [];
let discardPile = [];
const colors = ["red", "green", "blue", "yellow"];
const specialCards = ["jump", "reverse", "draw2", "draw4", "changeColor"];

//Variables de control de juego
let players = [];
let currentPlayerIndex = 0;
let direction = 1; // 1 para sentido horario, -1 para antihorario

let playersArea = document.getElementById("players-area");
let gameContainer = document.getElementById("game-container");
let deckArea = document.getElementById("deck");
let discardPileArea = document.getElementById("discard-pile");
let welcomeScreen = document.getElementById("welcome-screen");

//cards
const card = {
  id: "r-5",
  color: "red",
  type: "number",
  value: 5,
};

//player
const player = {
  id: "player1",
  name: "Player 1",
  cards: [],
  points: 0,
  saidUNO: false,
  isHuman: true,
};

//estado inicial de juego
const game = {
  players,
  deck,
  discardPile,
  turn: currentPlayerIndex,
  direction,
  currentCard: null,
  waitingForColor: false,
  roundWinner: null,
};

function startGame() {
  welcomeScreen.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  initializeDeck();
  createPlayers(2);
  dealCards();
  showCards();
}

function initializeDeck() {
  for (let color of colors) {
    deck.push({ id: `${color[0]}-${0}`, color, type: "number", value: 0 });
    for (let i = 1; i <= 9; i++) {
      let n = 1;
      while (n <= 2) {
        deck.push({ id: `${color[0]}-${i}`, color, type: "number", value: i });
        n++;
      }
    }
    for (let card of specialCards) {
      let n = 1;
      if (card !== "changeColor" && card !== "draw4") {
        while (n <= 2) {
          deck.push({
            id: `${color[0]}-${card}`,
            color: color,
            type: "special",
            value: card,
          });
          n++;
        }
      }
    }
  }
  for (let card of specialCards) {
    let n = 1;
    if (card === "changeColor" || card === "draw4") {
      while (n <= 4) {
        deck.push({
          id: card,
          color: null,
          type: "special",
          value: card,
        });
        n++;
      }
    } else {
      continue;
    }
  }
  shuffleDeck();
  discardPile.push(deck.pop());
}

function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function createPlayers(num) {
  playersArea.innerHTML = "";
  players = [];
  let html = "";
  for (let i = 0; i < num; i++) {
    html += `<div id="player${i + 1}" class="player"><h3>Jugador ${i + 1}</h3></div>`;
    players.push({
      id: `player${i + 1}`,
      name: `Jugador ${i + 1}`,
      cards: [],
      points: 0,
      saidUNO: false,
      isHuman: true,
    });
  }
  html += 
  `<div id="center-area">
    <div id="discard-pile"></div>
    <div id="deck"></div>
  </div>`;
  playersArea.innerHTML = html;
}

function dealCards() {
  const cardsPerPlayer = 7;
  for (let i = 0; i < players.length; i++) {
    players[i].cards = deck.slice(i * cardsPerPlayer, (i + 1) * cardsPerPlayer);
  }
  deck = deck.slice(players.length * cardsPerPlayer);
}

function showCards() {
  let deckArea = document.getElementById("deck");
  let discardPileArea = document.getElementById("discard-pile");
  for (let player of players) {
    const playerDiv = document.getElementById(`${player.id}`);
    playerDiv.innerHTML = `<h3>${player.name}</h3>`;
    player.cards.forEach((card) => {
      const img = document.createElement("img");
      player.id !== "player1"
        ? (img.src = `Assets/backcard.png`)
        : (img.src = `Assets/${card.id}.png`);
      img.className = "card-img";
      playerDiv.appendChild(img);
    });
  }
  deckArea.innerHTML = "";
  discardPileArea.innerHTML = "";
  for (let card of deck) {
    deckArea.innerHTML += `<img src="Assets/backcard.png" class="card-img deck-card">`;
  }
  for (let card of discardPile) {
    const img = document.createElement("img");
    img.src = `Assets/${card.id}.png`;
    img.className = "card-img discard-card";
    discardPileArea.appendChild(img);
  }
}

function playCard() {}

function drawCard() {}

function nextTurn() {}

function checkUNO() {}

function countPoints() {}

function resetRound() {}

function openModal() {
  document.getElementById("modal-reglas").style.display = "block";
}

function closeModal() {
  document.getElementById("modal-reglas").style.display = "none";
}

// cerrar el modal al hacer clic fuera del contenido
window.onclick = function (event) {
  var modal = document.getElementById("modal-reglas");
  if (event.target === modal) {
    closeModal();
  }
};

function PlayAudio() {
  document.getElementById("audio-bg").play();
}
