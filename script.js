//Variables globales
let deck = [];
let discardPile = [];
let cardsPlayer1 = [];
let cardsPlayer2 = [];
const colors = ["red", "green", "blue", "yellow"];
const specialCards = ["jump", "reverse", "draw2", "draw4", "changeColor"];

//Variables de control de juego
let players = [];
let currentPlayerIndex = 0;
let direction = 1; // 1 para sentido horario, -1 para antihorario

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
  initializeDeck();
  dealCards();
  createPlayers(2);
  dealCards();
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
      if (card !== "changeColor" || card !== "draw4") {
        while (n <= 2) {
          deck.push({
            id: `${color[0]}-${card}`,
            color,
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
          color,
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
}

function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function createPlayers(num) {
  for (let i = 0; i < num; i++) {
    players.push({
      id: `player${i + 1}`,
      name: `Jugador ${i + 1}`,
      cards: [],
      points: 0,
      saidUNO: false,
      isHuman: true,
    });
  }
}

function dealCards() {
  const cardsPerPlayer = 7;
  for (let i = 0; i < players.length; i++) {
    players.players[i].cards = deck.slice(
      i * cardsPerPlayer,
      (i + 1) * cardsPerPlayer
    );
  }
  deck = deck.slice(players.length * cardsPerPlayer);
}

function playCard() {}

function drawCard() {}

function nextTurn() {}

function checkUNO() {}

function countPoints() {}

function resetRound() {}
