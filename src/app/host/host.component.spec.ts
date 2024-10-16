import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostComponent } from './host.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { MessageCommunicationService } from 'ngxs-message-plugin';
import { HostCommunicationService } from './host-communication.service';
import { provideStore } from '@ngxs/store';
import { ChessState } from '../chessboard/chessboard.state';

describe('HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideStore([ChessState]),
        {
          provide: MessageCommunicationService,
          useClass: HostCommunicationService,
        }
      ]
  })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
