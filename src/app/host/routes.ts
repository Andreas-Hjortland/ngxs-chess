import { Routes } from '@angular/router';
import { provideStore } from '@ngxs/store';
import { withNgxsMessagePlugin } from 'ngxs-message-plugin';
import { HostCommunicationService } from './host-communication.service';
import { HostComponent } from './host.component';

export default [
    {
      path: '',
      component: HostComponent,
      providers: [
        HostCommunicationService,
        provideStore([], 
          withNgxsMessagePlugin(true, {
            messageHandler: HostCommunicationService,
          })
        )
      ],
      pathMatch: 'full',
    }
] satisfies Routes;