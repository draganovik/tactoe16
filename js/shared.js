// Global variables used by /computer_ai.js and /game.js
var BOARD = new Array();
var BOARD_SIZE = 16;
var UNOCCUPIED = " ";
var USER_PLAYER = "X";
var COMPUTER_PLAYER = "O";
var ACTIVE_TURN = "USER";

// Gets a array of moves not claimed by eather player
function GetAvailableMoves(board) {
  var possibleMoves = new Array();
  for (var i = 0; i < BOARD_SIZE; i++) {
    if (board[i] === UNOCCUPIED) possibleMoves.push(i);
  }
  return possibleMoves;
}

// Returns the current player simbol (X || O) and changes ACTIVE_TURN to other player
function SwitchTurn() {
  if (ACTIVE_TURN === "COMPUTER") {
    ACTIVE_TURN = "USER";
  } else {
    ACTIVE_TURN = "COMPUTER";
  }
}
function GetPlayerSymbol() {
  if (ACTIVE_TURN === "COMPUTER") {
    return COMPUTER_PLAYER;
  } else {
    return USER_PLAYER;
  }
}

// Checks if given board has a winning combination
function CheckForWinner(board) {
  // Check for square wins
  for (i = 0; i <= 10; i++) {
    if (i == 3 || i == 7) {
      i++;
    }
    if (
      board[i] != UNOCCUPIED &&
      board[i] === board[i + 1] &&
      board[i] === board[i + 4] &&
      board[i] === board[i + 5]
    )
      return board[i] == USER_PLAYER ? 2 : 3;
  }

  // Check for horizontal wins
  for (i = 0; i <= 12; i += 4) {
    if (
      board[i] != UNOCCUPIED &&
      board[i] === board[i + 1] &&
      board[i] === board[i + 2] &&
      board[i] === board[i + 3]
    )
      return board[i] == USER_PLAYER ? 2 : 3;
  }

  // Check for vertical wins
  for (i = 0; i <= 3; i++) {
    if (
      board[i] != UNOCCUPIED &&
      board[i] === board[i + 4] &&
      board[i] === board[i + 8] &&
      board[i] === board[i + 12]
    )
      return board[i] == USER_PLAYER ? 2 : 3;
  }

  // Check for main diagonal win
  if (
    board[0] != UNOCCUPIED &&
    board[0] === board[5] &&
    board[0] === board[10] &&
    board[0] === board[15]
  ) {
    return board[0] == USER_PLAYER ? 2 : 3;
  }
  // Check for secondary diagonal win
  if (
    board[3] != UNOCCUPIED &&
    board[3] === board[6] &&
    board[3] === board[9] &&
    board[3] === board[12]
  ) {
    return board[3] == USER_PLAYER ? 2 : 3;
  }

  // Game is not over
  for (i = 0; i < BOARD_SIZE; i++) {
    if (board[i] === UNOCCUPIED) return 0;
  }
  // It's tie
  return 1;
}
