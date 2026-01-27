const GameBoard = (function () {
  const board = Array(9).fill(" ");

  const getBoard = () => board;

  const setMark = (index, mark) => {
    if (board[index] !== " ") return false;
    board[index] = mark;
    return true;
  };

  return { setMark, getBoard };
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
