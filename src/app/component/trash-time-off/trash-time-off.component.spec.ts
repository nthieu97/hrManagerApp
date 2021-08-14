import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashTimeOffComponent } from './trash-time-off.component';

describe('TrashTimeOffComponent', () => {
  let component: TrashTimeOffComponent;
  let fixture: ComponentFixture<TrashTimeOffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrashTimeOffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashTimeOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
