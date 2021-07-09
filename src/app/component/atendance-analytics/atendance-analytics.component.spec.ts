import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendanceAnalyticsComponent } from './atendance-analytics.component';

describe('AtendanceAnalyticsComponent', () => {
  let component: AtendanceAnalyticsComponent;
  let fixture: ComponentFixture<AtendanceAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtendanceAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtendanceAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
