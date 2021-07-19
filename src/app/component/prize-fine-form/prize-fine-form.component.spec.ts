import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizeFineFormComponent } from './prize-fine-form.component';

describe('PrizeFineFormComponent', () => {
  let component: PrizeFineFormComponent;
  let fixture: ComponentFixture<PrizeFineFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrizeFineFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizeFineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
