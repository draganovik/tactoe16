// Global variables
var board = new Array();
var BOARD_SIZE = 16;
var UNOCCUPIED = " ";
var USER_PLAYER;
var COMPUTER_PLAYER;
var active_turn;
var choice;

// This function sets up the enviroment
function NewGame() {
  CleanBoard();
  ShufflePlayOrder();
}

// Clean the fields in HTML and resets board array
function CleanBoard() {
  for (i = 0; i < BOARD_SIZE; i++) {
    board[i] = UNOCCUPIED;
    document.getElementById(`f${i}`).innerHTML = "";
  }
}

// Picks a random player between the USER and COMPUTER
function ShufflePlayOrder() {
  let random_turn = Math.round(Math.random() * 1);
  active_turn = random_turn ? "USER" : "COMPUTER";
  ShowMessage(
    random_turn ? "You are playing first!" : "Computer is playing first."
  );
  USER_PLAYER = random_turn ? "X" : "O";
  COMPUTER_PLAYER = random_turn ? "O" : "X";
  if (!random_turn) {
    setTimeout(() => {
      MakeMoveComputer();
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

// Universal function for seting USER and COMPUTER moves
function MakeMove(position) {
  let PLAYER = ChangeTurn();
  if (!GameOver(board) && board[position] === UNOCCUPIED) {
    RenderMove(position, PLAYER);
    board[position] = PLAYER;
    if (!GameOver(board)) {
      if (active_turn == "COMPUTER") {
        ShowMessage("Computer is thinking...");
        setTimeout(() => {
          MakeMoveComputer(position);
        }, 600);
      } else {
        ShowMessage("Your turn!");
      }
    }
  }
}

// Render/Show played move in HTML
function RenderMove(position, player) {
  return new Promise(function () {
    document
      .getElementById(`f${position}`)
      .insertAdjacentHTML("beforeend", player == "X" ? graphicsX : graphicsO);
  });
}

//#region COMPUTER AI logic

// Function for triggering COMPUTER move
function MakeMoveComputer(humanMove) {
  let availableMoves = GetAvailableMoves(board);
  if (availableMoves.length == 16) {
    choice = availableMoves[Math.round(Math.random() * availableMoves.length)];
  } else if (availableMoves.length > 13 && humanMove != undefined) {
    choice = getStaticMove(humanMove);
  } else {
    console.log("Alpha-Beta Minimax takeover!");
    alphaBetaMinimax(board, 0, -Infinity, +Infinity);
  }
  // FAILSAFE if setting choice breaks get the first UNOCCUPIED field
  MakeMove(choice ? choice : availableMoves[0]);
  choice = [];
}

// Hardcoded initial moves (to prevent USER from creating deadly 3 fields configuration)
function getStaticMove(humanMove) {
  if (humanMove < 2 || humanMove == 4) {
    return board[5] == UNOCCUPIED ? 5 : availableMoves[5];
  } else if (humanMove < 4 || humanMove == 7) {
    return board[6] == UNOCCUPIED ? 6 : availableMoves[6];
  } else if (humanMove == 5) {
    return board[4] == UNOCCUPIED ? 4 : 1;
  } else if (humanMove < 4 || humanMove == 7) {
    return board[6] == UNOCCUPIED ? 6 : availableMoves[6];
  } else if (humanMove == 6) {
    return board[2] == UNOCCUPIED ? 2 : 7;
  } else if (humanMove > 13 || humanMove == 11) {
    return board[10] == UNOCCUPIED ? 10 : availableMoves[10];
  } else if (humanMove == 10) {
    return board[11] == UNOCCUPIED ? 11 : 14;
  } else if (humanMove == 9) {
    return board[13] == UNOCCUPIED ? 13 : availableMoves[13];
  } else {
    return 9;
  }
}

// Alpha–beta pruning algorithm for searching the best move
function alphaBetaMinimax(node, depth, alpha, beta) {
  if (CheckForWinner(node) !== 0) return GameScore(node, depth);

  depth += 1;
  var availableMoves = GetAvailableMoves(node);
  var move, result, possible_game;

  if (active_turn === "COMPUTER") {
    for (var i = 0; i < availableMoves.length; i++) {
      move = availableMoves[i];
      possible_game = GetNewState(move, node);
      result = alphaBetaMinimax(possible_game, depth, alpha, beta);
      node = UndoMove(node, move);
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
      move = availableMoves[i];
      possible_game = GetNewState(move, node);
      result = alphaBetaMinimax(possible_game, depth, alpha, beta);
      node = UndoMove(node, move);
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

// Gives a gameworld rating based on number of moves and outcome of the game
function GameScore(game, depth) {
  var score = CheckForWinner(game);
  // Tie
  if (score === 1) return 0;
  // Computer wins
  else if (score === 2) return depth - 16;
  // User wins
  else if (score === 3) return 16 - depth;
}

// Cleans the possible move AI created in alphaBetaMinimax for simulated gameworld nodes
function UndoMove(game, move) {
  game[move] = UNOCCUPIED;
  ChangeTurn();
  return game;
}

// Simulates gameworld with a possible move
function GetNewState(move, game) {
  game[move] = ChangeTurn();
  return game;
}

//#endregion

// End current player turn and switch to other player
function ChangeTurn() {
  if (active_turn === "COMPUTER") {
    active_turn = "USER";
    return COMPUTER_PLAYER;
  } else {
    active_turn = "COMPUTER";
    return USER_PLAYER;
  }
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
      game[i] === USER_PLAYER &&
      game[i + 1] === USER_PLAYER &&
      game[i + 4] === USER_PLAYER &&
      game[i + 5] === USER_PLAYER
    )
      return 2;
    if (
      game[i] === COMPUTER_PLAYER &&
      game[i + 1] === COMPUTER_PLAYER &&
      game[i + 4] === COMPUTER_PLAYER &&
      game[i + 5] === COMPUTER_PLAYER
    )
      return 3;
  }

  // Check for horizontal wins
  for (i = 0; i <= 12; i += 4) {
    if (
      game[i] === USER_PLAYER &&
      game[i + 1] === USER_PLAYER &&
      game[i + 2] === USER_PLAYER &&
      game[i + 3] === USER_PLAYER
    )
      return 2;
    if (
      game[i] === COMPUTER_PLAYER &&
      game[i + 1] === COMPUTER_PLAYER &&
      game[i + 2] === COMPUTER_PLAYER &&
      game[i + 3] === COMPUTER_PLAYER
    )
      return 3;
  }

  // Check for vertical wins
  for (i = 0; i <= 3; i++) {
    if (
      game[i] === USER_PLAYER &&
      game[i + 4] === USER_PLAYER &&
      game[i + 8] === USER_PLAYER &&
      game[i + 12] === USER_PLAYER
    )
      return 2;
    if (
      game[i] === COMPUTER_PLAYER &&
      game[i + 4] === COMPUTER_PLAYER &&
      game[i + 8] === COMPUTER_PLAYER &&
      game[i + 12] === COMPUTER_PLAYER
    )
      return 3;
  }

  // Check for diagonal wins
  if (
    (game[0] === USER_PLAYER &&
      game[5] === USER_PLAYER &&
      game[10] === USER_PLAYER &&
      game[15] === USER_PLAYER) ||
    (game[3] === USER_PLAYER &&
      game[6] === USER_PLAYER &&
      game[9] === USER_PLAYER &&
      game[12] === USER_PLAYER)
  )
    return 2;

  if (
    (game[0] === COMPUTER_PLAYER &&
      game[5] === COMPUTER_PLAYER &&
      game[10] === COMPUTER_PLAYER &&
      game[15] === COMPUTER_PLAYER) ||
    (game[3] === COMPUTER_PLAYER &&
      game[6] === COMPUTER_PLAYER &&
      game[9] === COMPUTER_PLAYER &&
      game[12] === COMPUTER_PLAYER)
  )
    return 3;

  // Check for tie
  for (i = 0; i < BOARD_SIZE; i++) {
    if (game[i] === UNOCCUPIED) return 0;
  }
  return 1;
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
