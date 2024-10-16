import { Routes } from '@angular/router';
import { provideStates } from '@ngxs/store';
import { withNgxsMessagePlugin } from 'ngxs-message-plugin';
import { HostCommunicationService } from './host-communication.service';
import { HostComponent } from './host.component';

export default [
    {
      path: '',
      component: HostComponent,
      providers: [
        HostCommunicationService,
        provideStates([], 
          withNgxsMessagePlugin(true, {
            messageHandler: HostCommunicationService,
          })
        )
      ],
      pathMatch: 'full',
    }
] satisfies Routes;