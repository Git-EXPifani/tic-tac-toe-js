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
  let currentPlayer = p2;

  let nextTurn = () => {
    currentPlayer = currentPlayer === p1 ? p2 : p1;
    console.log(`${currentPlayer.getName()}'s turn`);
  };

  let getCurrentName = () => {
    console.log(
      `${currentPlayer.getName()} is the name of the current player. `,
    );
  };

  const board = GameBoard.getBoard();

  let checkGame = () => {
    //Win Condition 1
    if (
      board[0] == currentPlayer.getMarker() &&
      board[1] == currentPlayer.getMarker() &&
      board[2] == currentPlayer.getMarker()
    ) {
      console.log(`${currentPlayer.getName()} is the winner.`);
    }
  };
  return { nextTurn, getCurrentName, checkGame };
})();
