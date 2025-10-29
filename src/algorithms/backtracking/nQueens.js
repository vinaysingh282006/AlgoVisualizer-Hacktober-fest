export function* solveNQueens(n) {
  const board = Array.from({ length: n }, () => Array(n).fill(0));

  function isSafe(row, col) {
    for (let i = 0; i < row; i++) {
      if (board[i][col]) return false;
      const diff = row - i;
      if (col - diff >= 0 && board[i][col - diff]) return false;
      if (col + diff < n && board[i][col + diff]) return false;
    }
    return true;
  }

  function* backtrack(row = 0) {
    if (row === n) {
      yield { board: board.map(r => [...r]), status: "solution" };
      return;
    }
    for (let col = 0; col < n; col++) {
      yield { row, col, action: "try" };
      if (isSafe(row, col)) {
        board[row][col] = 1;
        yield { board: board.map(r => [...r]), row, col, action: "place" };
        yield* backtrack(row + 1);
        board[row][col] = 0;
        yield { board: board.map(r => [...r]), row, col, action: "remove" };
      } else {
        yield { board: board.map(r => [...r]), row, col, action: "conflict" };
      }
    }
  }

  yield* backtrack();
}
