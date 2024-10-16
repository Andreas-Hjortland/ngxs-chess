import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ClientCommunicationService } from './client-communication.service';

@Injectable()
export class ClientResolverService  {

  public readonly service = inject(ClientCommunicationService);

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): void {
    const id = route.paramMap.get('id');
    this.service.connect(id!);
  }
}
