// Global variables
var BOARD = new Array();
var BOARD_SIZE = 16;
var UNOCCUPIED = " ";
var USER_PLAYER;
var COMPUTER_PLAYER;
var ACTIVE_TURN;

// This function sets up the enviroment
function NewGame() {
  CleanBoard();
  ShufflePlayOrder();
}

// Clean the fields in HTML and reset BOARD array
function CleanBoard() {
  for (i = 0; i < BOARD_SIZE; i++) {
    BOARD[i] = UNOCCUPIED;
    document.getElementById(`f${i}`).innerHTML = "";
  }
}

// Picks a random player between the USER and COMPUTER
function ShufflePlayOrder() {
  let random_turn = Math.round(Math.random() * 1);
  ACTIVE_TURN = random_turn ? "USER" : "COMPUTER";
  ShowMessage(
    random_turn ? "You are playing first!" : "Computer is playing first."
  );
  USER_PLAYER = random_turn ? "X" : "O";
  COMPUTER_PLAYER = random_turn ? "O" : "X";
  if (!random_turn) {
    setTimeout(() => {
      Computer.Play();
    }, 600);
  }
}

// Displays game status messages to USER in UI
function ShowMessage(message, winner) {
  let notification_bar = document.getElementById("notification-bar");
  notification_bar.innerHTML = message;
  switch (winner) {
    case " ":
      notification_bar.classList.add("orange");
      break;
    case "O":
      notification_bar.classList.add("red");
      break;
    case "X":
      notification_bar.classList.add("blue");
      break;
    default:
      if (notification_bar) {
        notification_bar.classList.remove("blue");
        notification_bar.classList.remove("orange");
        notification_bar.classList.remove("red");
      }
      break;
  }
}

function GetEndTurnMessage(ACTIVE_TURN) {
  ACTIVE_TURN == "USER"
    ? ShowMessage("Your turn!")
    : ShowMessage("Computer is thinking...");
}

// Gets a array of moves not claimed by eather player
function GetAvailableMoves(game) {
  var possibleMoves = new Array();
  for (var i = 0; i < BOARD_SIZE; i++) {
    if (game[i] === UNOCCUPIED) possibleMoves.push(i);
  }
  return possibleMoves;
}

// Checks if given gameworld has a winning combination
function CheckForWinner(game) {
  // Check for square wins
  for (i = 0; i <= 10; i++) {
    if (i == 3 || i == 7) {
      i++;
    }
    if (
      game[i] != UNOCCUPIED &&
      game[i] === game[i + 1] &&
      game[i] === game[i + 4] &&
      game[i] === game[i + 5]
    )
      return game[i] == USER_PLAYER ? 2 : 3;
  }

  // Check for horizontal wins
  for (i = 0; i <= 12; i += 4) {
    if (
      game[i] != UNOCCUPIED &&
      game[i] === game[i + 1] &&
      game[i] === game[i + 2] &&
      game[i] === game[i + 3]
    )
      return game[i] == USER_PLAYER ? 2 : 3;
  }

  // Check for vertical wins
  for (i = 0; i <= 3; i++) {
    if (
      game[i] != UNOCCUPIED &&
      game[i] === game[i + 4] &&
      game[i] === game[i + 8] &&
      game[i] === game[i + 12]
    )
      return game[i] == USER_PLAYER ? 2 : 3;
  }

  // Check for main diagonal win
  if (
    game[0] != UNOCCUPIED &&
    game[0] === game[5] &&
    game[0] === game[10] &&
    game[0] === game[15]
  ) {
    return game[0] == USER_PLAYER ? 2 : 3;
  }
  // Check for secondary diagonal win
  if (
    game[3] != UNOCCUPIED &&
    game[3] === game[6] &&
    game[3] === game[9] &&
    game[3] === game[12]
  ) {
    return game[3] == USER_PLAYER ? 2 : 3;
  }

  // Check for tie
  for (i = 0; i < BOARD_SIZE; i++) {
    if (game[i] === UNOCCUPIED) return 0;
  }
  return 1;
}

// Universal function for seting USER and COMPUTER moves
function MakeMove(position) {
  if (!GameOver(BOARD) && BOARD[position] === UNOCCUPIED) {
    let PLAYER = ChangeTurn();
    RenderMove(position, PLAYER);
    BOARD[position] = PLAYER;
  }
  GetEndTurnMessage(ACTIVE_TURN);
  return !GameOver(BOARD);
}

// Render/Show played move in HTML
function RenderMove(position, player) {
  return new Promise(function () {
    document
      .getElementById(`f${position}`)
      .insertAdjacentHTML("beforeend", player == "X" ? graphicsX : graphicsO);
  });
}

// End current player turn and switch to other player
function ChangeTurn() {
  if (ACTIVE_TURN === "COMPUTER") {
    ACTIVE_TURN = "USER";
    return COMPUTER_PLAYER;
  } else {
    ACTIVE_TURN = "COMPUTER";
    return USER_PLAYER;
  }
}

// Sets the endgame enviroment
function GameOver(game) {
  switch (CheckForWinner(game)) {
    case 1:
      ShowMessage("It's a tie!", UNOCCUPIED);
      break;
    case 2:
      ShowMessage("You win! Congratulations!", USER_PLAYER);
      break;
    case 3:
      ShowMessage("Computer wins this time!", COMPUTER_PLAYER);
      break;
    default:
      return false;
  }
  return true;
}

// Function for triggering USER move
function PlayUser(position) {
  if (ACTIVE_TURN == "USER") {
    if (MakeMove(position)) {
      setTimeout(() => {
        Computer.Play(position);
      }, 600);
    }
  }
}

//#region COMPUTER AI class

class Computer {
  // COMPUTER move used in COMPUTER class
  static #choice = [];

  // Function for triggering COMPUTER move
  static Play(userMove) {
    let availableMoves = GetAvailableMoves(BOARD);
    if (availableMoves.length == 16) {
      this.#choice =
        availableMoves[Math.round(Math.random() * availableMoves.length)];
    } else if (availableMoves.length > 13 && userMove != undefined) {
      this.#choice = this.#getStaticMove(userMove, availableMoves);
    } else {
      console.log("Alpha-Beta Minimax takeover!");
      this.#alphaBetaMinimax(BOARD, 0, -Infinity, +Infinity);
    }
    // FAILSAFE if setting this.#choice breaks get the first UNOCCUPIED field
    MakeMove(this.#choice ? this.#choice : availableMoves[0]);
  }

  // Hardcoded initial moves (to prevent USER from creating deadly 3 fields configuration)
  static #getStaticMove(userMove, availableMoves) {
    if (userMove < 2 || userMove == 4) {
      return BOARD[5] == UNOCCUPIED ? 5 : availableMoves[5];
    } else if (userMove < 4 || userMove == 7) {
      return BOARD[6] == UNOCCUPIED ? 6 : availableMoves[6];
    } else if (userMove == 5) {
      return BOARD[4] == UNOCCUPIED ? 4 : 1;
    } else if (userMove < 4 || userMove == 7) {
      return BOARD[6] == UNOCCUPIED ? 6 : availableMoves[6];
    } else if (userMove == 6) {
      return BOARD[2] == UNOCCUPIED ? 2 : 7;
    } else if (userMove > 13 || userMove == 11) {
      return BOARD[10] == UNOCCUPIED ? 10 : availableMoves[10];
    } else if (userMove == 10) {
      return BOARD[11] == UNOCCUPIED ? 11 : 14;
    } else if (userMove == 9) {
      return BOARD[13] == UNOCCUPIED ? 13 : availableMoves[13];
    } else {
      return 9;
    }
  }

  // Alpha–beta pruning algorithm for searching the best move
  static #alphaBetaMinimax(node, depth, alpha, beta) {
    if (CheckForWinner(node) !== 0) return this.#gameScore(node, depth);

    depth += 1;
    var availableMoves = GetAvailableMoves(node);
    var move, result, possible_game;

    if (ACTIVE_TURN === "COMPUTER") {
      for (var i = 0; i < availableMoves.length; i++) {
        move = availableMoves[i];
        possible_game = this.#getNewState(move, node);
        result = this.#alphaBetaMinimax(possible_game, depth, alpha, beta);
        node = this.#undoMove(node, move);
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
        move = availableMoves[i];
        possible_game = this.#getNewState(move, node);
        result = this.#alphaBetaMinimax(possible_game, depth, alpha, beta);
        node = this.#undoMove(node, move);
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

  // Gives a gameworld rating based on number of moves and outcome of the game
  static #gameScore(game, depth) {
    var score = CheckForWinner(game);
    // Tie
    if (score === 1) return 0;
    // COMPUTER wins
    else if (score === 2) return depth - 16;
    // USER wins
    else if (score === 3) return 16 - depth;
  }

  // Cleans the possible move AI created in #alphaBetaMinimax for simulated gameworld nodes
  static #undoMove(game, move) {
    game[move] = UNOCCUPIED;
    ChangeTurn();
    return game;
  }

  // Simulates gameworld with a possible move
  static #getNewState(move, game) {
    game[move] = ChangeTurn();
    return game;
  }
}
//#endregion
