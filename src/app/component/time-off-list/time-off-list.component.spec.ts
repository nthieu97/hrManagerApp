import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeOffListComponent } from './time-off-list.component';

describe('TimeOffListComponent', () => {
  let component: TimeOffListComponent;
  let fixture: ComponentFixture<TimeOffListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeOffListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeOffListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
