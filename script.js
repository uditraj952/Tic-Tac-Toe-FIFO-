const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const xScoreDisplay = document.getElementById("xScore");
const oScoreDisplay = document.getElementById("oScore");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

let xMoves = [];
let oMoves = [];

let xScore = 0;
let oScore = 0;

const MAX_MARKS = 4; // max marks allowed

const winningConditions = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

statusText.textContent = `Player ${currentPlayer}'s Turn`;

cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

function handleCellClick(e) {

  if (!gameActive) return; // 🔥 STOP EVERYTHING after win

  const index = e.target.getAttribute("data-index");

  if (board[index] !== "") return;

  // FIFO BEFORE placing 5th move
  if (currentPlayer === "X") {
    if (xMoves.length === MAX_MARKS) {
      removeOldestMove(xMoves, "X");
    }
    xMoves.push(index);
  } else {
    if (oMoves.length === MAX_MARKS) {
      removeOldestMove(oMoves, "O");
    }
    oMoves.push(index);
  }

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add(currentPlayer);

  checkWinner();

  if (gameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function removeOldestMove(movesArray, player) {
  const removedIndex = movesArray.shift();
  board[removedIndex] = "";
  cells[removedIndex].textContent = "";
  cells[removedIndex].classList.remove(player);
}

function checkWinner() {

  for (let [a, b, c] of winningConditions) {

    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {

      gameActive = false; // 🔥 Freeze game

      statusText.textContent = `🏆 Player ${board[a]} Wins!`;

      if (board[a] === "X") {
        xScore++;
        xScoreDisplay.textContent = xScore;
      } else {
        oScore++;
        oScoreDisplay.textContent = oScore;
      }

      return;
    }
  }
}