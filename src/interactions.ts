/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { checkColissions } from "./colissions";
import { BOARD_WIDTH } from "./constants";
import { drawBoard } from "./draw-helpers";
import { generatePiece } from "./piece-generator";
import { addPiece, removePiece, solidifyPiece } from "./piece-manipulations";

function dropPiece(piece: Piece, board: number[][]): Piece {
  piece.position.y++;
  if (checkColissions(piece, board)) {
    piece.position.y--;
    solidifyPiece(piece, board);
    checkAndRemoveWinningRow(board);
    const newPiece = generatePiece();
    piece.position = newPiece.position;
    piece.shape = newPiece.shape;
    checkGameOver(board);
  }
  return piece;
}

function checkGameOver(board: number[][]): void {
  if (board[4].some((value) => value === 1)) {
    clearBoard(board);
    const scorage = document.getElementById("scorage")!;
    scorage.innerText = "0";
  }
}

function clearBoard(board: number[][]): void {
  for (let y = 0; y < board.length; y++) {
    const row = board[y];
    for (let x = 0; x < row.length; x++) {
      board[y][x] = 0;
    }
  }
}

function addMovements(
  ctx: CanvasRenderingContext2D,
  board: number[][],
  piece: Piece,
): void {
  let xDown: number | null = null;
  let yDown: number | null = null;
  document.addEventListener(
    "touchstart",
    function (evt) {
      xDown = evt.touches[0].clientX;
      yDown = evt.touches[0].clientY;
    },
    false,
  );

  document.addEventListener(
    "touchmove",
    function (event) {
      removePiece(piece, board);
      if (xDown == null || yDown == null) {
        return;
      }
      const xUp = event.touches[0].clientX;
      const yUp = event.touches[0].clientY;
      const xDiff = xDown - xUp;
      const yDiff = yDown - yUp;
      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          moveLeft(piece, board);
        } else {
          moveRight(piece, board);
        }
      } else {
        if (yDiff > 0) {
          rotatePiece(piece, board);
        } else {
          dropPiece(piece, board);
        }
      }
      xDown = null;
      yDown = null;
      addPiece(piece, board);
      drawBoard(ctx, board);
    },
    false,
  );

  document.addEventListener("keydown", (event) => {
    removePiece(piece, board);
    if (event.key === "ArrowRight") {
      moveRight(piece, board);
    }
    if (event.key === "ArrowLeft") {
      moveLeft(piece, board);
    }
    if (event.key === "ArrowUp") {
      rotatePiece(piece, board);
    }
    if (event.key === "ArrowDown") {
      dropPiece(piece, board);
    }
    addPiece(piece, board);
    drawBoard(ctx, board);
  });
}

function moveRight(piece: Piece, board: number[][]): void {
  piece.position.x++;
  if (checkColissions(piece, board)) {
    piece.position.x--;
  }
}

function moveLeft(piece: Piece, board: number[][]): void {
  piece.position.x--;
  if (checkColissions(piece, board)) {
    piece.position.x++;
  }
}

function rotatePiece(piece: Piece, board: number[][]): void {
  piece.shape = piece.shape[0].map((_val, index) =>
    piece.shape.map((row) => row[index]).reverse(),
  );
  if (checkColissions(piece, board)) {
    piece.shape = piece.shape[0].map((_val, index) =>
      piece.shape.map((row) => row[row.length - 1 - index]),
    );
  }
}

function checkAndRemoveWinningRow(board: number[][]): void {
  board.forEach((row, y) => {
    if (row.every((value) => value === 1)) {
      board.splice(y, 1);
      board.unshift(new Array<number>(BOARD_WIDTH).fill(0));
      const scorage = document.getElementById("scorage")!;
      scorage.innerText = String(Number(scorage?.innerText) + 1);
    }
  });
}

export function addInteractions(
  ctx: CanvasRenderingContext2D,
  board: number[][],
  piece: Piece,
): void {
  setInterval(() => {
    removePiece(piece, board);
    dropPiece(piece, board);
    addPiece(piece, board);
    drawBoard(ctx, board);
  }, 500);
  addMovements(ctx, board, piece);
}
