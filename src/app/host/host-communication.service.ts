import { Injectable, OnDestroy } from '@angular/core';
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
    this.connection = new Promise<DataConnection>((resolve, reject) => {
      this.peer.on('connection', (connection) => {
        if(connection.open) resolve(connection);
        else {
          console.log('Got connection. waiting for open', connection);
          connection.on('open', () => resolve(connection));
          connection.on('error', reject);
        }
      });
      this.peer.on('error', reject);
    }).catch((err) => {
      console.error('connection error', err);
      throw err;
    });
    this.connection.then((connection) => {
      console.log('Connected', connection);
      connection.on('data', (data) => {
        // connection.send('Hi from host');
        console.log('got data', data);
        this.$messages.next(data);
      });
      connection.on('error', err => {
        console.log('connection error', err);
      })
    });
  }

  ngOnDestroy(): void {
    this.peer.destroy();
  }

  async postMessage(message: any): Promise<void> {
    try {
      console.log('[HOST] posting message', message);
      const connection = await this.connection;
      await connection.send(message);
    } catch (err) {
      console.error('send error', err);
      throw err;
    }
  }
}
