import { BOARD_HEIGHT, BOARD_WIDTH } from "./constants";

export function checkColissions(piece: Piece) {
    return piece.position.x < 0 || (piece.position.x + piece.shape[0].length) > BOARD_WIDTH || (piece.position.y + piece.shape.length) > BOARD_HEIGHT;
}

export function isPositionOcupied(piece: Piece, board: number[][]) {
    let isOcupied = false;
    for (let y = 0; y < piece.shape.length; y++) {
        const row = piece.shape[y];
        for (let x = 0; x < row.length; x++) {
            const value = row[x];
            if (value && board[piece.position.y + y][piece.position.x + x] === 1) {
                isOcupied = true;
                break;
            }            
        }
    }
    return isOcupied;
}
