import { Injectable, OnDestroy } from '@angular/core';
import { MessageCommunicationService } from 'ngxs-message-plugin';
import Peer, { DataConnection } from 'peerjs';
import { Subject } from 'rxjs';

@Injectable()
export class ClientCommunicationService
  implements MessageCommunicationService, OnDestroy
{
  private $messages = new Subject<any>();
  public readonly messages$ = this.$messages.asObservable();

  private peer?: Peer;
  private connection?: Promise<DataConnection>;

  private resolve!: (conn: DataConnection) => void;
  constructor() {
    this.connection = new Promise((resolve) => {
      this.resolve = resolve;
    });
  }

  connect(peerId: string): void {
    console.log('client connect', peerId);
    if (this.peer) throw new Error('Already connected');

    const peer = (this.peer = new Peer());
    setTimeout(() => {
      const connection = peer.connect(peerId);
      connection.on('open', () => {
        connection.on('data', (data) => {
          console.log('got data', data);
          this.$messages.next(data);
        });
        // connection.send('Hi from client');
        this.resolve(connection);
      });
      connection.on('error', (err) => {
        console.error('connection error', err);
      });
    }, 1000);
  }

  ngOnDestroy(): void {
    this.peer?.destroy();
  }

  postMessage(message: any): void {
    console.log('[CLIENT] posting message', message);
    this.connection?.then((conn) => conn.send(message)).catch(err => {
      console.error('send error', err);
      throw err;
    });
  }
}
