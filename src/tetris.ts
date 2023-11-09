/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { BOARD_HEIGHT, BOARD_WIDTH } from "./constants";
import { drawBoard } from "./draw-helpers";
import { addInteractions } from "./interactions";
import { generatePiece } from "./piece-generator";
import { addPiece } from "./piece-manipulations";

export function generateGame(): void {
  const canvas = document.getElementsByTagName("canvas")[0];
  const ctx = canvas.getContext("2d")!;
  const board = Array<number[]>(BOARD_HEIGHT)
    .fill([])
    .map(() => new Array<number>(BOARD_WIDTH).fill(0));
  const piece = generatePiece();
  addPiece(piece, board);
  drawBoard(ctx, board);
  addInteractions(ctx, board, piece);
}

export async function playMusic(): Promise<void> {
  const music = new Audio("./Tetris.mp3");
  music.loop = true;
  await music.play();
}
