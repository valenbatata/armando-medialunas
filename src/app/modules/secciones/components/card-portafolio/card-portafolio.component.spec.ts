import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPortafolioComponent } from './card-portafolio.component';

describe('CardPortafolioComponent', () => {
  let component: CardPortafolioComponent;
  let fixture: ComponentFixture<CardPortafolioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardPortafolioComponent]
    });
    fixture = TestBed.createComponent(CardPortafolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
