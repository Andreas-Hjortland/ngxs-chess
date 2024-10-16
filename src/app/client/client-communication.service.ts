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

  private resolve!: (conn: DataConnection) => void;
  private reject!: (err: Error) => void;
  private connection = new Promise<DataConnection>((resolve, reject) => {
    this.resolve = resolve;
    this.reject = reject;
  });

  connect(peerId: string): void {
    console.log('client connect', peerId);
    if (this.peer) throw new Error('Already connected');

    const peer = this.peer = new Peer();
    peer.on('error', (err) => {
      console.error('peer error', err);
      this.reject(err);
    });
    peer.once('open', (id) => {
      const connection = peer.connect(peerId);
      console.log('client connecting', id, connection);
      if(connection.open) {
        console.log('connection open', connection);
        this.resolve(connection);
      } else {
        connection.once('open', () => {
          console.log('connected', connection);
          // connection.send('Hi from client');
          this.resolve(connection);
        });
        connection.once('error', (err) => {
          this.reject(err);
        });
      }
      connection.on('error', (err) => {
        console.log('connection error', err);
      });
      connection.on('data', (data) => {
        console.log('got data', data);
        this.$messages.next(data);
      });
    });
  }

  ngOnDestroy(): void {
    console.log('destroy peer');
    this.peer?.destroy();
  }

  postMessage(message: any): void {
    console.log('[CLIENT] posting message when ready', message);
    this.connection.then((conn) => {
      conn.send(message)
      console.log('[CLIENT] message posted', message);
    }).catch(err => {
      console.error('send error', err);
      throw err;
    });
  }
}
