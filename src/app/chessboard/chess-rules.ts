export type Piece =
  | ''
  | '♖'
  | '♘'
  | '♗'
  | '♕'
  | '♔'
  | '♙'
  | '♟'
  | '♜'
  | '♞'
  | '♝'
  | '♛'
  | '♚';

export type Board = [
  [Piece, Piece, Piece, Piece, Piece, Piece, Piece, Piece],
  [Piece, Piece, Piece, Piece, Piece, Piece, Piece, Piece],
  [Piece, Piece, Piece, Piece, Piece, Piece, Piece, Piece],
  [Piece, Piece, Piece, Piece, Piece, Piece, Piece, Piece],
  [Piece, Piece, Piece, Piece, Piece, Piece, Piece, Piece],
  [Piece, Piece, Piece, Piece, Piece, Piece, Piece, Piece],
  [Piece, Piece, Piece, Piece, Piece, Piece, Piece, Piece],
  [Piece, Piece, Piece, Piece, Piece, Piece, Piece, Piece]
];

export type Square = {
  file: 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';
  rank: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
};

export function isBlank(piece: Piece) {
  return !piece;
}

export function isBlack(piece: Piece) {
  return !isBlank(piece) && !isWhite(piece);
}

export function owner(piece: Piece): Turn | undefined {
  if (isBlank(piece)) return;

  return isWhite(piece) ? 'white' : 'black';
}

export function isWhite(piece: Piece) {
  switch (piece) {
    case '♖':
    case '♘':
    case '♗':
    case '♕':
    case '♔':
    case '♙':
      return true;
  }
  return false;
}

export type Turn = 'white' | 'black';

export function toIdx(square: Square): [number, number] {
  return [square.file.charCodeAt(0) - 'a'.charCodeAt(0), 8 - square.rank];
}
export function fromIdx(x: number, y: number): Square {
  const file = 'a'.charCodeAt(0) + x;
  if (file < 'a'.charCodeAt(0) || file > 'h'.charCodeAt(0)) {
    throw new Error('Invalid file index ' + x);
  }
  if (y < 0 || y > 8) {
    throw new Error('Invalid rank index ' + y);
  }
  return {
    file: String.fromCharCode('a'.charCodeAt(0) + x) as Square['file'],
    rank: (y + 1) as Square['rank'],
  };
}

const valid: Square[] = [];
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    valid.push({
      file: String.fromCharCode('a'.charCodeAt(0) + i),
      rank: j + 1,
    } as unknown as Square);
  }
}
export function validMoves(board: Board, from: Square): Square[] {
  return valid.filter((f) => f.file !== from.file || f.rank !== from.rank);
}

export function isValidMove(board: Board, from: Square, to: Square): boolean {
  return validMoves(board, from).some(
    (validMove) => validMove.file === to.file && validMove.rank === to.rank
  );
}

export function isCheckMate(board: Board): boolean {
  return false;
}
