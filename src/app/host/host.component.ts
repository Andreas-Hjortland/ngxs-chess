import { Component, ElementRef, ViewChild } from '@angular/core';
import { HostHandler, MessageCommunicationService } from 'ngxs-message-plugin';
import { HostCommunicationService } from './host-communication.service';
import QRious from 'qrious';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss'],
})
export class HostComponent {
  @ViewChild('qr')
  private readonly qrCanvas!: ElementRef<HTMLCanvasElement>;

  public peerId: string = '';
  public connected: false | string = false;
  public readonly baseUrl =
    document.querySelector('base')?.href ?? location.origin + '/';
  constructor(service: MessageCommunicationService) {
    (<HostCommunicationService>service).connection.then((c) => {
      this.connected = c.peer;
      console.log('connection', c);
    });
    (<HostCommunicationService>service).peerId.then((peerId) => {
      new QRious({
        element: this.qrCanvas.nativeElement,
        value: this.baseUrl + 'join/' + peerId,
        size: 256,
      });
      this.peerId = peerId;
    });
  }
}
