const res = document.querySelector(".result");
const GameBoard = (function () {
  const board = Array(9).fill(" ");

  const getBoard = () => board;

  const setMark = (index, mark) => {
    if (board[index] !== " ") return false;
    board[index] = mark;
    return true;
  };

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      if (board[i] !== " ") board[i] = " ";
    }
  };

  return { setMark, getBoard, resetBoard };
})();

const displayBoard = () => {
  const board = GameBoard.getBoard();

  console.log(`
      ${board[0]} | ${board[1]} | ${board[2]}
      ____________
      ${board[3]} | ${board[4]} | ${board[5]}
      ____________
      ${board[6]} | ${board[7]} | ${board[8]}
      ____________
    `);
};

function Player(name, marker) {
  const playerName = name;
  const playerMarker = marker;

  const getName = () => playerName;
  const getMarker = () => playerMarker;

  return { getName, getMarker };
}

const p1 = Player("Abdul", "X");
const p2 = Player("Hamza", "O");

const gameController = (function () {
  let currentPlayer = p1;

  let nextTurn = () => {
    currentPlayer = currentPlayer === p1 ? p2 : p1;
    res.textContent = `Currently it is ${currentPlayer.getName()}'s turn with the ${currentPlayer.getMarker()} marker.`;
    console.log(
      `Currently it is ${currentPlayer.getName()}'s turn with the ${currentPlayer.getMarker()} marker.`,
    );
  };

  let getCurrentPlayer = () => currentPlayer;

  const board = GameBoard.getBoard();

  let checkGame = () => {
    const marker = currentPlayer.getMarker();

    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of winPatterns) {
      if (board[a] === marker && board[b] === marker && board[c] === marker) {
        res.textContent = `${currentPlayer.getName()} is the winner.`;
        console.log(`${currentPlayer.getName()} is the winner.`);
        GameBoard.resetBoard();
        return "win";
      }
    }

    if (!board.includes(" ")) {
      res.textContent = "It's a draw";
      console.log("It's a draw.");
      GameBoard.resetBoard();
      return "draw";
    }
    return null;
  };

  return { nextTurn, getCurrentPlayer, checkGame };
})();

const cells = document.querySelectorAll(".g");

cells.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const currentPlayerBtn = gameController.getCurrentPlayer();

    // Only set mark if cell is empty
    const successful = GameBoard.setMark(index, currentPlayerBtn.getMarker());
    if (!successful) {
      console.log("Cell already occupied!");
      return;
    }
    // Update button text
    btn.textContent = currentPlayerBtn.getMarker();

    // Check for win/draw
    const result = gameController.checkGame();
    if (result) {
      // Reset DOM after board reset
      cells.forEach((b) => (b.textContent = ""));
      return;
    }

    // Switch turn
    gameController.nextTurn();
  });
});
