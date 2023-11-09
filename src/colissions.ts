import { BOARD_HEIGHT, BOARD_WIDTH } from "./constants";

export function checkColissions(piece: Piece, board: number[][]): boolean {
  const pieceMaxX = piece.shape[0].length;
  const pieceMaxY = piece.shape.length;
  const { x, y } = piece.position;
  return (
    x < 0 ||
    x + pieceMaxX > BOARD_WIDTH ||
    y + pieceMaxY > BOARD_HEIGHT ||
    isPositionOcupied(piece, board)
  );
}

export function isPositionOcupied(piece: Piece, board: number[][]): boolean {
  let isOcupied = false;
  const { x: pieceX, y: pieceY } = piece.position;
  for (let y = 0; y < piece.shape.length; y++) {
    const row = piece.shape[y];
    for (let x = 0; x < row.length; x++) {
      const value = row[x];
      if (value !== 0 && board[pieceY + y][pieceX + x] === 1) {
        isOcupied = true;
        break;
      }
    }
  }
  return isOcupied;
}
