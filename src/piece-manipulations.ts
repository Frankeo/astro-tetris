import { type Piece } from "./env";

function alterPiece(
  piece: Piece,
  board: number[][],
  valueToAssign: number,
): void {
  const { x: pieceX, y: pieceY } = piece.position;
  piece.shape.forEach((row: number[], y: number) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        board[pieceY + y][pieceX + x] = valueToAssign;
      }
    });
  });
}

export function solidifyPiece(piece: Piece, board: number[][]): void {
  alterPiece(piece, board, 1);
}

export function removePiece(piece: Piece, board: number[][]): void {
  alterPiece(piece, board, 0);
}

export function addPiece(piece: Piece, board: number[][]): void {
  alterPiece(piece, board, 2);
}
