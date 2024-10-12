import { NgModule } from '@angular/core';
import { ChessboardComponent } from './chessboard.component';
import { OwnerPipe } from './owner.pipe';
import { NgxsModule } from '@ngxs/store';
import { ChessState } from './chessboard.state';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ChessboardComponent, OwnerPipe],
  imports: [
    CommonModule,
    DragDropModule,
    NgxsModule.forFeature([ChessState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  exports: [ChessboardComponent],
})
export class ChessboardModule {}
