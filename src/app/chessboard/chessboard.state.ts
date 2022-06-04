import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import produce from 'immer';
import {
  Square,
  Turn,
  Piece,
  toIdx,
  isBlank,
  isWhite,
  isValidMove,
  Board,
  isBlack,
} from './chess-rules';

export class Move {
  public static readonly type = '[CHESS] Move';

  constructor(public readonly from: Square, public readonly to: Square) {}
}

export type ChessStateModel = {
  turn: Turn;
  victor?: Turn;
  capturedPieces: Piece[];
  board: Board;
};

@State<ChessStateModel>({
  name: 'chess',
  defaults: {
    capturedPieces: [],
    board: [
      ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
      ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
      ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖'],
    ],
    turn: 'white',
  },
})
@Injectable()
export class ChessState {
  @Selector()
  static whiteCaptured(state: ChessStateModel) {
    return state.capturedPieces.filter(isWhite);
  }
  @Selector()
  static blackCaptured(state: ChessStateModel) {
    return state.capturedPieces.filter(isBlack);
  }
  @Action(Move)
  public move({ setState }: StateContext<ChessStateModel>, action: Move) {
    setState(
      produce((draft) => {
        if (typeof draft.victor !== 'undefined') {
          throw new Error('Game already concluded');
        }

        const [fromFileIdx, fromRankIdx] = toIdx(action.from);
        const [toFileIdx, toRankIdx] = toIdx(action.to);

        const sourcePiece = draft.board[fromRankIdx][fromFileIdx];
        const targetPiece = draft.board[toRankIdx][toFileIdx];

        if (isBlank(sourcePiece)) {
          throw new Error(
            'No piece to move on board from position ' +
              action.from.file +
              action.from.rank
          );
        }

        if (isWhite(sourcePiece)) {
          if (draft.turn !== 'white') {
            throw new Error('Cannot move a white piece on blacks turn');
          }
        } else {
          if (draft.turn !== 'black') {
            throw new Error('Cannot move a black piece on whites turn');
          }
        }

        if (!isValidMove(draft.board, action.from, action.to)) {
          throw new Error('Invalid move');
        }

        // Is move valid per piece type
        // Will move set yourself in check
        // En passant rules
        // Castling rules

        if (!isBlank(targetPiece)) {
          draft.capturedPieces.push(targetPiece);
        }

        // TODO: Castling and en passant
        draft.board[fromRankIdx][fromFileIdx] = '';
        draft.board[toRankIdx][toFileIdx] = sourcePiece;

        // Test if check mate and eventually set victor

        draft.turn = draft.turn === 'white' ? 'black' : 'white';
      })
    );
  }
}
