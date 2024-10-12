import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientCommunicationService } from './client-communication.service';

@Injectable()
export class ClientResolverService  {
  constructor(public readonly service: ClientCommunicationService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): void | Observable<void> | Promise<void> {
    const id = route.paramMap.get('id');
    this.service.connect(id!);
  }
}
