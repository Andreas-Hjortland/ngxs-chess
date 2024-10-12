import { AfterViewInit, Component, ElementRef, Host, OnInit, ViewChild } from '@angular/core';
import { HostHandler, MessageCommunicationService } from 'ngxs-message-plugin';
import { HostCommunicationService } from './host-communication.service';
import QRious from 'qrious';

@Component({
  selector: 'app-host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss'],
})
export class HostComponent implements OnInit, AfterViewInit{
  @ViewChild('qr')
  private readonly qrCanvas!: ElementRef<HTMLCanvasElement>;

  public peerId: string = '';
  public connected: false | string = false;
  private readonly service: HostCommunicationService;

  constructor(
    service: MessageCommunicationService,
  ) {
    this.service = <HostCommunicationService>service;
  }

  ngOnInit(): void {
    this.service.connection.then(c => {
      this.connected = c.peer;
      console.log('connection', c);
    });
  }

  ngAfterViewInit(): void {
    this.service.peerId.then((peerId) => {
      new QRious({
        element: this.qrCanvas.nativeElement,
        value: document.baseURI + 'join/' + peerId,
        size: 256,
      });
      this.peerId = peerId;
    });
  }
}
