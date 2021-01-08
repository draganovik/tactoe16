// Import shared variables and functions from /shared.js
importScripts("/js/shared.js");

// Wait for postMessage() in /game.js and run calculations after
self.onmessage = (e) => {
  // Sets the local copy of shared data
  BOARD = e.data[0];
  USER_PLAYER = e.data[1];
  COMPUTER_PLAYER = e.data[2];
  ACTIVE_TURN = e.data[3];
  // Calculate move
  var move = Play(e.data[4]);
  // Return move to game.js
  self.postMessage(move);
};

//#region COMPUTER logic

// COMPUTER move used in algorithm
var choice = [];

// Simulation level limit used in COMPUTER algorithm
var depthLimit = 9;

// MAIN: function for triggering COMPUTER algorithm
function Play(userMove) {
  let availableMoves = GetAvailableMoves(BOARD);
  if (availableMoves.length == 16) {
    // Pick a random move if playing first
    choice = availableMoves[Math.round(Math.random() * availableMoves.length)];
  } else if (availableMoves.length == 15 && userMove != undefined) {
    // If COMPUTER is playing secund, speed up the calculation
    getStaticMove(userMove);
  } else {
    // Set choice to best move
    alphaBetaMinimax(BOARD, 0, -Infinity, +Infinity);
  }
  // FAILSAFE if setting choice breaks get the first UNOCCUPIED field
  return choice ? choice : availableMoves[0];
}
// Override COMPUTER second move to speed up process
function getStaticMove(userMove) {
  switch (userMove) {
    case 5:
      choice = 6;
      break;
    case 6:
      choice = 5;
      break;
    case 7:
      choice = 1;
      break;
    case 8:
      choice = 4;
      break;
    case 9:
      choice = 5;
      break;
    case 10:
      choice = 5;
      break;
    case 11:
      choice = 5;
      break;
    case 12:
      choice = 2;
      break;
    case 13:
      choice = 1;
      break;
    case 14:
      choice = 2;
      break;
    case 15:
      choice = 0;
      break;
    default:
      alphaBetaMinimax(BOARD, 0, -Infinity, +Infinity);
      break;
  }
}
// Alpha–beta pruning algorithm for searching the best move
function alphaBetaMinimax(node, depth, alpha, beta) {
  // If game is over or too long, return simulation score
  var gameState = CheckForWinner(node);
  if (gameState !== 0 || depth > depthLimit) return gameScore(gameState, depth);

  // Simulation setup
  depth += 1;
  var availableMoves = GetAvailableMoves(node);
  var move, result;

  if (ACTIVE_TURN === "COMPUTER") {
    // Run alphaBetaMinimax for every UNOCCUPIED move
    for (var i = 0; i < availableMoves.length; i++) {
      move = availableMoves[i];
      // Get new simulation score
      result = alphaBetaMinimax(getNewState(move, node), depth, alpha, beta);
      // Reset node
      node = undoMove(node, move);
      // Pick best result
      if (result > alpha) {
        alpha = result;
        if (depth == 1) choice = move;
      } else if (alpha >= beta) {
        return alpha;
      }
    }
    return alpha;
  } else {
    for (var i = 0; i < availableMoves.length; i++) {
      // Run alphaBetaMinimax for every UNOCCUPIED move
      move = availableMoves[i];
      // Get simulation score
      result = alphaBetaMinimax(getNewState(move, node), depth, alpha, beta);
      // Reset node
      node = undoMove(node, move);
      // Pick best result
      if (result < beta) {
        beta = result;
        if (depth == 1) choice = move;
      } else if (beta <= alpha) {
        return beta;
      }
    }
    return beta;
  }
}

// Gives a simulated board rating based on number of moves and winner
function gameScore(gameState, depth) {
  switch (gameState) {
    case 1:
      // Tie
      return 0;
    case 2:
      // COMPUTER wins
      return depth - 16;
    case 3:
      // USER wins
      return 16 - depth;
    case 0:
      // Simulation is too deep
      return 0;
  }
}

// Cleans the move COMPUTER created in #alphaBetaMinimax for simulated board
function undoMove(board, move) {
  board[move] = UNOCCUPIED;
  SwitchTurn();
  return board;
}

// Simulates board with a possible move
function getNewState(move, board) {
  board[move] = GetPlayerSymbol();
  SwitchTurn();
  return board;
}

//#endregion
