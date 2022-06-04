import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { RouterModule, Routes } from '@angular/router';
import { ChessboardModule } from '../chessboard/chessboard.module';
import { NgxsMessagePluginModule } from 'ngxs-message-plugin';
import { ClientCommunicationService } from './client-communication.service';
import { ClientResolverService } from './client-resolver.service';

console.log('client module');

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    resolve: {
      __notinuse__: ClientResolverService,
    },
  },
];

@NgModule({
  declarations: [ClientComponent],
  imports: [
    CommonModule,
    NgxsMessagePluginModule.forChild({
      messageHandler: ClientCommunicationService,
    }),
    ChessboardModule,
    RouterModule.forChild(routes),
  ],
  providers: [ClientCommunicationService, ClientResolverService],
  exports: [RouterModule],
})
export class ClientModule {}
