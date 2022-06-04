import { ElementRef, Injectable, OnDestroy, ViewChild } from '@angular/core';
import { MessageCommunicationService } from 'ngxs-message-plugin';
import Peer, { DataConnection } from 'peerjs';
import { Subject } from 'rxjs';

@Injectable()
export class HostCommunicationService
  implements MessageCommunicationService, OnDestroy
{
  private readonly $messages = new Subject<any>();
  public readonly messages$ = this.$messages.asObservable();
  public readonly peerId: Promise<string>;

  private readonly peer = new Peer();
  public readonly connection: Promise<DataConnection>;

  constructor() {
    this.peerId = new Promise((resolve) => {
      this.peer.on('open', (id) => {
        console.log('host listening', id);

        resolve(id);
      });
    });
    this.connection = new Promise((resolve, reject) => {
      this.peer.on('connection', resolve);
      this.peer.on('error', reject);
    });
    this.connection.then((connection) => {
      connection.on('data', (data) => {
        // connection.send('Hi from host');
        console.log('got data', data);
        this.$messages.next(data);
      });
    });
  }

  ngOnDestroy(): void {
    this.peer.destroy();
  }

  async postMessage(message: any): Promise<void> {
    console.log('[HOST] posting message', message);
    const connection = await this.connection;
    connection.send(message);
  }
}
