import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessboardComponent } from './chessboard.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ChessState } from './chessboard.state';
import { provideStore } from '@ngxs/store';

describe('ChessboardComponent', () => {
  let component: ChessboardComponent;
  let fixture: ComponentFixture<ChessboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChessboardComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideStore([ChessState]),
      ]
  })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChessboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
