// NOTE: /game.js uses variables and functions from /shared.js

// Using COMPUTER as Web Worker will allow us to move its operations to its own thread
var COMPUTER = new Worker("js/computer_ai.js");

COMPUTER.onmessage = (e) => {
  // Get the COMPUTER calculated move after COMPUTER.postMessage() is called and play it
  setTimeout(() => {
    MakeMove(e.data);
  }, 100);
};

// This function sets up the environment
function NewGame() {
  if (ACTIVE_TURN == "USER" || GameOver(BOARD)) {
    // Set BOARD HTML color to busy
    document.getElementsByTagName("MAIN")[0].classList.add("busy");
    // Disable button
    document.getElementById("btnNewGame").disabled = true;
    ShowMessage("Setting up new game...");
    CleanBoard();
    setTimeout(() => {
      ShufflePlayOrder();
      document.getElementById("btnNewGame").disabled = false;
    }, 600);
  }
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
  USER_PLAYER = random_turn ? "X" : "O";
  COMPUTER_PLAYER = random_turn ? "O" : "X";
  ShowMessage(
    random_turn ? "You are playing first!" : "Computer is playing first."
  );
  if (!random_turn) {
    setTimeout(() => {
      // Give COMPUTER data it needs to calculate move
      COMPUTER.postMessage([BOARD, USER_PLAYER, COMPUTER_PLAYER, ACTIVE_TURN]);
    }, 600);
  } else {
    // USER plays first set BOARD HTML color to active
    document.getElementsByTagName("MAIN")[0].classList.remove("busy");
  }
}

// Function for triggering USER move
function PlayUser(position) {
  if (ACTIVE_TURN == "USER") {
    if (MakeMove(position)) {
      // It's COMPUTER's turn, set BOARD HTML color to busy
      document.getElementsByTagName("MAIN")[0].classList.add("busy");
      // If USER made move on 'position', give COMPUTER data it needs to calculate its move
      COMPUTER.postMessage([
        BOARD,
        USER_PLAYER,
        COMPUTER_PLAYER,
        ACTIVE_TURN,
        position,
      ]);
    }
  }
}

// Displays BOARD status messages to USER in HTML UI
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

// Changes message in notification bar depending on ACTIVE_TURN
function GetEndTurnMessage(ACTIVE_TURN) {
  if (ACTIVE_TURN == "USER") {
    ShowMessage("Your turn!");
    // It is USER's turn, set BOARD HTML color to active
    document.getElementsByTagName("MAIN")[0].classList.remove("busy");
  } else {
    ShowMessage("Computer is thinking...");
  }
}

// Universal function for setting USER and COMPUTER moves
function MakeMove(position) {
  if (!GameOver(BOARD) && BOARD[position] === UNOCCUPIED) {
    let PLAYER = GetPlayerSymbol();
    RenderMove(position, PLAYER);
    BOARD[position] = PLAYER;
    SwitchTurn();
    GetEndTurnMessage(ACTIVE_TURN);
    return !GameOver(BOARD);
  }
  return false;
}

// Render/Show played move in HTML
function RenderMove(position, player) {
  return new Promise(function () {
    document
      .getElementById(`f${position}`)
      .insertAdjacentHTML("beforeend", player == "X" ? graphicsX : graphicsO);
  });
}

// Returns true if there is a winner, sets the endgame message in notification bar
function GameOver(board) {
  switch (CheckForWinner(board)) {
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
  // Game is over, return true and set BOARD HTML color to busy
  document.getElementsByTagName("MAIN")[0].classList.add("busy");
  return true;
}
