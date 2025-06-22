//Variables globales
let deck = [];
let discardPile = [];
const colors = ["red", "blue", "green", "yellow"];
const specialCards = ["jump", "reverse", "draw2"];

//Variables de control de juego
let players = [];
let currentPlayerIndex = 0;
let direction = 1; // 1 para sentido horario, -1 para antihorario

//cards
const card = {
  id: "R-5",
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

function initializeDeck() {}

function startGame() {}

function dealCards() {}

function playCard() {}

function drawCard() {}

function nextTurn() {}

function checkUNO() {}

function countPoints() {}

function resetRound() {}

