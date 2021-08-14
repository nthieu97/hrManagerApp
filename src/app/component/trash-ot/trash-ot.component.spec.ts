import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashOtComponent } from './trash-ot.component';

describe('TrashOtComponent', () => {
  let component: TrashOtComponent;
  let fixture: ComponentFixture<TrashOtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrashOtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashOtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
