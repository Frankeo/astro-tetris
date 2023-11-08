function alterPiece(piece: Piece, board : number[][], valueToAssign: number) {
    piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if(value) {
                board[piece.position.y + y][piece.position.x + x] = valueToAssign
            }
        })
    })
}

export function solidifyPiece(piece: Piece, board : number[][]) {
    alterPiece(piece, board, 1)
}

export function removePiece(piece: Piece, board: number[][]) {
    alterPiece(piece, board, 0)
}

export function addPiece(piece: Piece, board: number[][]) {
    alterPiece(piece, board, 2)
}