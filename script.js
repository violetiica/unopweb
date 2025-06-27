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
  game.players = players;
  game.deck = deck;
  game.discardPile = discardPile;
  currentPlayerIndex = 0;
  game.turn = currentPlayerIndex;
  game.direction = 1;
  game.currentCard = discardPile[discardPile.length - 1];
  game.waitingForColor = false;
  game.roundWinner = null;
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
  firstCard();
}

function firstCard() {
  for (let card of deck) {
    if (card.type !== "special") {
      discardPile.push(card);
      deck.splice(deck.indexOf(card), 1);
      break;
    }
  }
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
    html += `<div id="player${i + 1}" class="player"><h3>Jugador ${
      i + 1
    }</h3></div>`;
    players.push({
      id: `player${i + 1}`,
      name: `Jugador ${i + 1}`,
      cards: [],
      points: 0,
      saidUNO: false,
      isHuman: i === 0,
    });
  }
  html += `<div id="center-area">
    <div id="discard-pile"></div>
    <div id="deck"></div>
  </div>`;
  playersArea.innerHTML = html;
}

function dealCards() {
  const cardsPerPlayer = 7;
  for (let i = 0; i < players.length; i++) {
    for (let j = 0; j < cardsPerPlayer; j++) {
      players[i].cards.push(deck.shift());
    }
  }
}

function showCards() {
  let deckArea = document.getElementById("deck");
  let discardPileArea = document.getElementById("discard-pile");
  for (let player of players) {
    const playerDiv = document.getElementById(`${player.id}`);
    playerDiv.innerHTML = `<h3>${player.name}</h3>`;
    player.cards.forEach((card) => {
      const img = document.createElement("img");
<<<<<<< Updated upstream
      if (player.id !== "player1") {
        img.src = `Assets/backcard.png`;
      } else {
        img.src = `Assets/${card.id}.png`;
        img.onclick = () => playCard(0, card);
      }
      img.className = "card-img";
      if (players.indexOf(player) === currentPlayerIndex) {
        img.classList.add("active-card");
      }
      playerDiv.appendChild(img);
    });
=======
      player.id !== "player1" ? img.src = "Assets/backcard.png" : img.src = `Assets/${card.id}.png`;
      img.className = "card-img";
       playerDiv.appendChild(img);
    })
>>>>>>> Stashed changes
  }
  deckArea.innerHTML = "";
  discardPileArea.innerHTML = "";
  if (deck.length > 0) {
    const deckImg = document.createElement("img");
    deckImg.src = "Assets/backcard.png";
    deckImg.className = "card-img deck-card";

    if (players[currentPlayerIndex].id === "player1") {
      deckImg.onclick = () => drawCard(0);
    }
    deckArea.appendChild(deckImg);
  }

  discardPileArea.innerHTML = "";
  if (discardPile.length > 0) {
    const topCard = discardPile[discardPile.length - 1];
    const img = document.createElement("img");
    img.src = `Assets/${topCard.id}.png`;
    img.className = "card-img discard-card";
    discardPileArea.appendChild(img);
  }
}

function validCard(card, topCard) {
  return (
    card.color === topCard.color ||
    card.value === topCard.value ||
    (card.type === "special" &&
      (card.value === "changeColor" || card.value === "draw4"))
  );
}

function playCard(playerIndex, card) {
  const currentPlayer = players[playerIndex];
  const topCard = discardPile[discardPile.length - 1];

  if (validCard(card, topCard)) {
    discardPile.push(card);
    const cardIndex = currentPlayer.cards.indexOf(card);
    currentPlayer.cards.splice(cardIndex, 1);
    game.currentCard = card;

    // efectos de cartas especiales
    if (card.type === "special") {
      if (card.value === "reverse") {
        direction *= -1;
        game.direction = direction;
        if (players.length === 2) {
          nextTurn(true);
          return;
        }
      }
      if (card.value === "jump") {
        if (players.length === 2) {
          nextTurn(true);
          return;
        } else {
          nextTurn();
          return;
        }
      }
      if (card.value === "draw2") {
        let nextIndex = currentPlayerIndex + direction;
        if (nextIndex >= players.length) nextIndex = 0;
        if (nextIndex < 0) nextIndex = players.length - 1;
        forceDraw(nextIndex, 2);
        if (players.length === 2) {
          nextTurn(true);
          return;
        }
      }
      // Para draw4 y changeColor
    }
    nextTurn();
  } else {
    alert("No puedes jugar esa carta!");
  }
}

function botTurn(botIndex) {
  const bot = players[botIndex];
  const topCard = discardPile[discardPile.length - 1];
  let played = false;
  for (let card of bot.cards) {
    if (
      card.color === topCard.color ||
      card.value === topCard.value ||
      (card.type === "special" &&
        (card.value === "changeColor" || card.value === "draw4"))
    ) {
      playCard(botIndex, card);
      played = true;
      break;
    }
  }
  if (played === false) {
    drawCard(botIndex);
  }
}

function forceDraw(playerIndex, n) {
  for (let i = 0; i < n; i++) {
    if (deck.length === 0) break;
    const card = deck.shift();
    players[playerIndex].cards.push(card);
  }
  showCards();
}

function drawCard(playerIndex) {
  const card = deck.shift();
  players[playerIndex].cards.push(card);
  showCards();
  if (validCard(card, discardPile[discardPile.length - 1])) {
    setTimeout(() => playCard(playerIndex, card), 700);
  } else {
    setTimeout(() => nextTurn(), 700);
  }
}

function nextTurn(skipAdvance = false) {
  if (!skipAdvance) {
    currentPlayerIndex += direction;
    if (currentPlayerIndex >= players.length) currentPlayerIndex = 0;
    if (currentPlayerIndex < 0) currentPlayerIndex = players.length - 1;
  }
  game.turn = currentPlayerIndex;
  showCards();
  if (!players[currentPlayerIndex].isHuman) {
    setTimeout(() => botTurn(currentPlayerIndex), 700);
  }
}

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

//MUSICA
function PlayAudio() {
  document.getElementById("audio-bg").play();
}
