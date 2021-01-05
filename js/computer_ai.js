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
  var move = Computer.Play();
  self.postMessage(move);
};

//#region COMPUTER class

class Computer {
  // PRIVATE: COMPUTER move used in algorithm
  static #choice = [];

  // PRIVATE: Inception level limit used in COMPUTER algorithm
  static #depthLimit = 8;

  // MAIN: function for triggering COMPUTER algorithm
  static Play() {
    let availableMoves = GetAvailableMoves(BOARD);
    if (availableMoves.length == 16) {
      // Pick random move if playing first
      this.#choice =
        availableMoves[Math.round(Math.random() * availableMoves.length)];
    } else {
      // Get best move
      this.#alphaBetaMinimax(BOARD, 0, -Infinity, +Infinity);
    }
    // FAILSAFE if setting this.#choice breaks get the first UNOCCUPIED field
    return this.#choice ? this.#choice : availableMoves[0];
  }

  // PRIVATE: Alpha–beta pruning algorithm for searching the best move
  static #alphaBetaMinimax(node, depth, alpha, beta) {
    // if game is over or too long, return simulation score
    if (CheckForWinner(node) !== 0 || depth > this.#depthLimit)
      return this.#gameScore(node, depth);

    // Simulation setup
    depth += 1;
    var availableMoves = GetAvailableMoves(node);
    var move, result, possible_game;

    if (ACTIVE_TURN === "COMPUTER") {
      // Run alphaBetaMinimax for every UNOCCUPIED move
      for (var i = 0; i < availableMoves.length; i++) {
        move = availableMoves[i];
        // Create new BOARD simulation (node) with added move
        possible_game = this.#getNewState(move, node);
        // Get simulation score
        result = this.#alphaBetaMinimax(possible_game, depth, alpha, beta);
        // Reset node
        node = this.#undoMove(node, move);
        // Pick best result
        if (result > alpha) {
          alpha = result;
          if (depth == 1) this.#choice = move;
        } else if (alpha >= beta) {
          return alpha;
        }
      }
      return alpha;
    } else {
      for (var i = 0; i < availableMoves.length; i++) {
        // Run alphaBetaMinimax for every UNOCCUPIED move
        move = availableMoves[i];
        // Create new BOARD simulation (node) with added move
        possible_game = this.#getNewState(move, node);
        // Get simulation score
        result = this.#alphaBetaMinimax(possible_game, depth, alpha, beta);
        // Reset node
        node = this.#undoMove(node, move);
        // Pick best result
        if (result < beta) {
          beta = result;
          if (depth == 1) this.#choice = move;
        } else if (beta <= alpha) {
          return beta;
        }
      }
      return beta;
    }
  }

  // PRIVATE: Gives a simulated board rating based on number of moves and winner
  static #gameScore(board, depth) {
    var score = CheckForWinner(board);
    // Tie
    if (score === 1) return 0;
    // COMPUTER wins
    else if (score === 2) return depth - 16;
    // USER wins
    else if (score === 3) return 16 - depth;
    // Simulation is to deep
    else if (score === 0) return 0;
  }

  // PRIVATE: Cleans the move COMPUTER created in #alphaBetaMinimax for simulated board
  static #undoMove(board, move) {
    board[move] = UNOCCUPIED;
    SwitchTurn();
    return board;
  }

  // PRIVATE: Simulates board with a possible move
  static #getNewState(move, board) {
    board[move] = GetPlayerSymbol();
    SwitchTurn();
    return board;
  }
}

//#endregion
