import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { provideStates, Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { fromIdx, isValidMove, Turn as PlayerColor } from './chess-rules';
import { ChessState, ChessStateModel, Move } from './chessboard.state';
import { AsyncPipe } from '@angular/common';
import { OwnerPipe } from './owner.pipe';

@Component({
    selector: 'app-chessboard',
    templateUrl: './chessboard.component.html',
    styleUrls: ['./chessboard.component.scss'],
    standalone: true,
    imports: [
        CdkDropListGroup,
        CdkDropList,
        CdkDrag,
        AsyncPipe,
        OwnerPipe,
    ],
})
export class ChessboardComponent implements OnInit {
  @Input() color: PlayerColor = 'white';

  public readonly blackCaptured = this.store.selectSignal(ChessState.blackCaptured);
  public readonly whiteCaptured = this.store.selectSignal(ChessState.whiteCaptured);
  public readonly board = this.store.selectSignal(ChessState.board);
  public readonly turn = this.store.selectSignal(ChessState.turn);
  public readonly victor = this.store.selectSignal(ChessState.victor);

  constructor(private store: Store) {}

  log(name: string, $event: any) {
    console.log(name, $event);
  }

  onDrop($event: CdkDragDrop<any, any>) {
    const source = fromIdx($event.item.data[0], $event.item.data[1]);
    const target = fromIdx($event.container.data[0], $event.container.data[1]);
    const board = this.store.selectSnapshot(ChessState.board);
    if (isValidMove(board, source, target)) {
      this.store.dispatch(new Move(source, target)).subscribe({
        error(err) {
          alert(err.message);
        },
      });
    }
  }

  canDrop = (drag: CdkDrag, drop: CdkDropList): boolean => {
    const source = fromIdx(drag.data[0], drag.data[1]);
    const target = fromIdx(drop.data[0], drop.data[1]);

    const isValid = isValidMove(
      this.store.selectSnapshot(ChessState.board),
      source,
      target
    );
    // console.log(
    //   'canDrop',
    //   source.file + source.rank,
    //   target.file + target.rank,
    //   isValid
    // );
    return isValid;
  };

  ngOnInit(): void {}
}
