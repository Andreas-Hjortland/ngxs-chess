import { Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { ClientCommunicationService } from './client-communication.service';
import { ClientResolverService } from './client-resolver.service';
import { provideStates } from '@ngxs/store';
import { withNgxsMessagePlugin } from 'ngxs-message-plugin';

export default [
  {
    path: '',
    component: ClientComponent,
    providers: [
      ClientCommunicationService,
      ClientResolverService,
      provideStates([], withNgxsMessagePlugin(false, {
        messageHandler: ClientCommunicationService,
      }))
    ],
    resolve: {
      __notinuse__: ClientResolverService,
    },
    pathMatch: 'full',
  },
] satisfies Routes;
