export const validateMove = (cellIndex, board) => {
  let errors = [];
  if (cellIndex === undefined) {
    errors.push({ msg: 'cellIndex is required' });
  }
  if (!board) {
    errors.push({ msg: 'Board does not exist' });
    return errors;
  }
  if (board.finished) {
    errors.push({ msg: 'Game is finished' });
  }
  if (board.moves.find((mv) => mv.cellIndex == cellIndex)) {
    errors.push({ msg: 'Cell already played' });
  }
  if (cellIndex > 8 || cellIndex < 0) {
    errors.push({ msg: 'Cell index must be between 0 and 8' });
  }
  return errors;
};

export const checkIfGameIsOver = (board) => {
  const { moves } = board;
  if (moves.length < 5) {
    return board;
  }
  // reconstruct board matrix from moves
  const matrix = [];
  for (let i = 0; i < 9; i++) {
    const cell = moves.find((move) => move.cellIndex == i);
    if (!cell) {
      matrix.push({ played: false });
    } else {
      matrix.push({ played: true, player: cell.player });
    }
  }
  // check rows
  for (let i = 0; i < 9; i += 3) {
    if (matrix[i].played && matrix[i + 1].played && matrix[i + 2].played) {
      if (
        matrix[i].player == matrix[i + 1].player &&
        matrix[i].player == matrix[i + 2].player
      ) {
        board.finished = true;
        board.winner = 'player' + matrix[i].player;
      }
    }
  }
  // check collums
  for (let i = 0; i < 3; i++) {
    if (matrix[i].played && matrix[i + 3].played && matrix[i + 6].played) {
      if (
        matrix[i].player == matrix[i + 3].player &&
        matrix[i].player == matrix[i + 6].player
      ) {
        board.finished = true;
        board.winner = 'player' + matrix[i].player;
      }
    }
  }
  // check main diagonal
  if (matrix[0].played && matrix[4].played && matrix[8].played) {
    if (
      matrix[0].player == matrix[4].player &&
      matrix[0].player == matrix[8].player
    ) {
      board.finished = true;
      board.winner = 'player' + matrix[0].player;
    }
  }

  // check secondary diagonal
  if (matrix[2].played && matrix[4].played && matrix[6].played) {
    if (
      matrix[2].player == matrix[4].player &&
      matrix[2].player == matrix[6].player
    ) {
      board.finished = true;
      board.winner = 'player' + matrix[2].player;
    }
  }

  // check if draw
  if (!board.finished && moves.length == 9) {
    board.finished = true;
    board.draw = 'true';
  }
  return board;
};
