import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientComponent } from './client.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideStore } from '@ngxs/store';
import { ClientCommunicationService } from './client-communication.service';
import { MessageCommunicationService } from 'ngxs-message-plugin';
import { ChessState } from '../chessboard/chessboard.state';

describe('ClientComponent', () => {
  let component: ClientComponent;
  let fixture: ComponentFixture<ClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideStore([ChessState]),
        {
          provide: MessageCommunicationService,
          useClass: ClientCommunicationService,
        }
      ]
  })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
