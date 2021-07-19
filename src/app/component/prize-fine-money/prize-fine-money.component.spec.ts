import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizeFineMoneyComponent } from './prize-fine-money.component';

describe('PrizeFineMoneyComponent', () => {
  let component: PrizeFineMoneyComponent;
  let fixture: ComponentFixture<PrizeFineMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrizeFineMoneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizeFineMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
