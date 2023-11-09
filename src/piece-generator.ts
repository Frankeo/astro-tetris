export function generatePiece(): Piece {
  const keys = Object.keys(shapes);
  const key = keys[
    Math.floor(Math.random() * keys.length)
  ] as keyof typeof shapes;
  return {
    position: { x: 2, y: 2 },
    shape: shapes[key],
  };
}

const shapes = {
  CUBE: [
    [1, 1],
    [1, 1],
  ],
  ZET: [
    [1, 1, 0],
    [0, 1, 1],
  ],
  L: [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  I: [[1], [1], [1], [1]],
  T: [
    [1, 1, 1],
    [0, 1, 0],
  ],
};
