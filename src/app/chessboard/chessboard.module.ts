import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChessboardComponent } from './chessboard.component';
import { OwnerPipe } from './owner.pipe';
import { NgxsModule } from '@ngxs/store';
import { ChessState } from './chessboard.state';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { environment } from 'src/environments/environment';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

@NgModule({
  declarations: [ChessboardComponent, OwnerPipe],
  imports: [
    DragDropModule,
    CommonModule,
    NgxsModule.forRoot([ChessState], {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  exports: [ChessboardComponent],
})
export class ChessboardModule {}
