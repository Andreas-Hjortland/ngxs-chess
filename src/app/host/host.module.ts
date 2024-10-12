import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsMessagePluginModule } from 'ngxs-message-plugin';
import { RouterModule, Routes } from '@angular/router';
import { HostComponent } from './host.component';
import { ChessboardModule } from '../chessboard/chessboard.module';
import { HostCommunicationService } from './host-communication.service';

console.log('host module');

const routes: Routes = [
  {
    path: '',
    component: HostComponent,
  },
];

@NgModule({
  declarations: [HostComponent],
  imports: [
    RouterModule.forChild(routes),
    ChessboardModule,
    NgxsMessagePluginModule.forRoot({
      messageHandler: HostCommunicationService,
    }),
  ],
  providers: [HostCommunicationService],
  exports: [RouterModule],
})
export class HostModule {}
