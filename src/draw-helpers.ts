import { BLOCK_SIZE } from "./constants";

export function drawBoard(ctx: CanvasRenderingContext2D, board : number[][]) {
    board.forEach((row, y) => {
        row.forEach((value, x) => {
            ctx.fillStyle = (value === 0)? "black" : (value === 1 )? "yellow" : "red";
            ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, (x  + 1) * BLOCK_SIZE, (y  + 1)* BLOCK_SIZE);
        })
    })
}

