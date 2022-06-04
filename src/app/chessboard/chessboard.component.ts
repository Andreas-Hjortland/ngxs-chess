import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { fromIdx, isValidMove, Turn as PlayerColor } from './chess-rules';
import { ChessState, ChessStateModel, Move } from './chessboard.state';

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.scss'],
})
export class ChessboardComponent implements OnInit {
  @Input() color: PlayerColor = 'white';

  @Select(ChessState.blackCaptured)
  public readonly blackCaptured$!: Observable<
    ReturnType<typeof ChessState.blackCaptured>
  >;

  @Select(ChessState.whiteCaptured)
  public readonly whiteCaptured$!: Observable<
    ReturnType<typeof ChessState.whiteCaptured>
  >;

  @Select(ChessState)
  public readonly state$!: Observable<ChessStateModel>;

  constructor(private store: Store) {}

  log(name: string, $event: any) {
    console.log(name, $event);
  }

  onDrop($event: CdkDragDrop<any, any>) {
    const source = fromIdx($event.item.data[0], $event.item.data[1]);
    const target = fromIdx($event.container.data[0], $event.container.data[1]);
    const { board, turn } = this.store.selectSnapshot(ChessState);
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
      this.store.selectSnapshot(ChessState).board,
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
