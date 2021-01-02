var board = new Array();
var BOARD_SIZE = 16;
var UNOCCUPIED = " ";
var USER_PLAYER;
var COMPUTER_PLAYER;
var active_turn;
var choice;

function NewGame() {
  for (i = 0; i < BOARD_SIZE; i++) {
    board[i] = UNOCCUPIED;
    document.getElementById("f" + i).innerHTML = "";
  }

  var notification_bar = document.getElementById("notification-bar");
  let random_turn = Math.round(Math.random() * 2);
  active_turn = random_turn ? "USER" : "COMPUTER";
  notification_bar.innerHTML = random_turn
    ? "Your turn!"
    : "Computer is thinking.";
  USER_PLAYER = random_turn ? "X" : "O";
  COMPUTER_PLAYER = random_turn ? "O" : "X";
  if (!random_turn) {
    MakeMoveComputer();
  }
}

function MakeMove(pos) {
  if (!GameOver(board) && board[pos] === UNOCCUPIED) {
    RenderMove(pos, USER_PLAYER);
    board[pos] = USER_PLAYER;
    if (!GameOver(board)) {
      var notification_bar = document.getElementById("notification-bar");
      active_turn = "COMPUTER";
      notification_bar.innerHTML = "Computer is thinking.";
      MakeMoveComputer();
    }
  }
}

function RenderMove(position, player) {
  return new Promise(function () {
    document
      .getElementById("f" + position)
      .insertAdjacentHTML(
        "beforeend",
        player == "X" ? PlayerGraphicsX : PlayerGraphicsO
      );
  });
}

function MakeMoveComputer() {
  var start, end, time;
  start = new Date().getTime() / 1000;
  let availableMoves = GetAvailableMoves(board);
  if (availableMoves.length > 13) {
    let randomPosition = Math.floor(Math.random() * availableMoves.length - 1);
    choice = availableMoves[randomPosition];
  } else {
    alphaBetaMinimax(board, 0, -Infinity, +Infinity);
  }
  end = new Date().getTime() / 1000;
  time = end - start;
  console.log(time + " seconds");
  // Failsafe for Math.random and just in case minimax beaks
  var move = choice ? choice : availableMoves[0];
  console.log(move);
  RenderMove(move, COMPUTER_PLAYER);
  board[move] = COMPUTER_PLAYER;
  choice = [];
  active_turn = "USER";
  if (!GameOver(board)) {
    var notification_bar = document.getElementById("notification-bar");
    notification_bar.innerHTML = "Your turn!";
  }
}

function GameScore(game, depth) {
  var score = CheckForWinner(game);
  if (score === 1) return 0;
  else if (score === 2) return depth - 17;
  else if (score === 3) return 17 - depth;
}

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

function UndoMove(game, move) {
  game[move] = UNOCCUPIED;
  ChangeTurn();
  return game;
}

function GetNewState(move, game) {
  var piece = ChangeTurn();
  game[move] = piece;
  return game;
}

function ChangeTurn() {
  var piece;
  if (active_turn === "COMPUTER") {
    piece = COMPUTER_PLAYER;
    active_turn = "USER";
  } else {
    piece = USER_PLAYER;
    active_turn = "COMPUTER";
  }
  return piece;
}

function GetAvailableMoves(game) {
  var possibleMoves = new Array();
  for (var i = 0; i < BOARD_SIZE; i++) {
    if (game[i] === UNOCCUPIED) possibleMoves.push(i);
  }
  return possibleMoves;
}

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

function GameOver(game) {
  if (CheckForWinner(game) === 0) {
    return false;
  } else if (CheckForWinner(game) === 1) {
    var notification_bar = document.getElementById("notification-bar");
    notification_bar.innerHTML = "It is a tie.";
  } else if (CheckForWinner(game) === 2) {
    var notification_bar = document.getElementById("notification-bar");
    notification_bar.innerHTML = "You have won! Congratulations!";
  } else {
    var notification_bar = document.getElementById("notification-bar");
    notification_bar.innerHTML = "The computer has won.";
  }
  return true;
}
