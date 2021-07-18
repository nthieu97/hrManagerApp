import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeOffAddComponent } from './time-off-add.component';

describe('TimeOffAddComponent', () => {
  let component: TimeOffAddComponent;
  let fixture: ComponentFixture<TimeOffAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeOffAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeOffAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
