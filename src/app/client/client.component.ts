import { Component, OnInit } from '@angular/core';
import { ChessboardComponent } from '../chessboard/chessboard.component';

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss'],
    standalone: true,
    imports: [ChessboardComponent]
})
export class ClientComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
