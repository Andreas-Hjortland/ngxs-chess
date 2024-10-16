import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Host, inject, OnInit, ViewChild } from '@angular/core';
import { MessageCommunicationService } from 'ngxs-message-plugin';
import { HostCommunicationService } from './host-communication.service';
import QRious from 'qrious';
import { ChessboardComponent } from '../chessboard/chessboard.component';

@Component({
    selector: 'app-host',
    templateUrl: './host.component.html',
    styleUrls: ['./host.component.scss'],
    standalone: true,
    imports: [ChessboardComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HostComponent implements OnInit, AfterViewInit{
  @ViewChild('qr')
  private readonly qrCanvas!: ElementRef<HTMLCanvasElement>;

  public peerId: string = '';
  public connected: false | string = false;
  private readonly service = inject(MessageCommunicationService) as HostCommunicationService;
  private readonly cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.service.connection.then(c => {
      this.connected = c.peer;
      this.cdr.markForCheck();
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
      this.cdr.markForCheck();
    });
  }
}
