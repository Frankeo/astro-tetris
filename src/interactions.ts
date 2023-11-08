import { checkColissions, isPositionOcupied } from "./colissions";
import { BOARD_WIDTH } from "./constants";
import { drawBoard } from "./draw-helpers";
import { generatePiece } from "./piece-generator";
import { addPiece, removePiece, solidifyPiece } from "./piece-manipulations";

function dropPiece(piece: Piece, board: number[][]) {
    piece.position.y++
    if(checkColissions(piece, board) || isPositionOcupied(piece, board)) {
        piece.position.y--
        solidifyPiece(piece, board)
        checkAndRemoveWinningRow(board)
        const newPiece = generatePiece();
        piece.position = newPiece.position;
        piece.shape = newPiece.shape;
        checkGameOver(board)
    }
    return piece
}

function checkGameOver(board: number[][]) {
    if(board[4].some(value => value === 1))
    {
        clearBoard(board);
        const scorage = document.getElementById("scorage")!;
        scorage.innerText = "0";
    }
}

function clearBoard(board: number[][]) {
    for (let y = 0; y < board.length; y++) {
        const row = board[y];
        for (let x = 0; x < row.length; x++) {
            board[y][x] = 0
        }
    }
}

function addMovements(ctx: CanvasRenderingContext2D, board : number[][], piece: Piece) {
    document.addEventListener("keydown", (event) => {
        removePiece(piece, board)
        if(event.key === "ArrowRight") {
            piece.position.x++
            if(checkColissions(piece, board)) {
                piece.position.x--
            }
        }
        if(event.key === "ArrowLeft") {
            piece.position.x--
            if(checkColissions(piece, board)) {
                piece.position.x++
            }
        }
        if(event.key == "ArrowUp") {
            piece.shape = piece.shape[0].map((_val, index) => piece.shape.map(row => row[index]).reverse())
        }
        if(event.key === "ArrowDown") {
            dropPiece(piece, board)
        }
        addPiece(piece, board);
        drawBoard(ctx, board);
    })
}



function checkAndRemoveWinningRow(board : number[][]) {
    board.forEach((row, y) => {
        if (row.every(value => value === 1)) {
            board.splice(y, 1);
            board.unshift(new Array<number>(BOARD_WIDTH).fill(0))
            const scorage = document.getElementById("scorage")!;
            scorage.innerText = String(Number(scorage?.innerText) + 1);
        }
    })
}

export function addInteractions(ctx: CanvasRenderingContext2D, board : number[][], piece: Piece) {
    setInterval(() => {
        removePiece(piece, board);
        dropPiece(piece, board)
        addPiece(piece, board);
        drawBoard(ctx, board);
    }, 500)
    addMovements(ctx, board, piece);
}
