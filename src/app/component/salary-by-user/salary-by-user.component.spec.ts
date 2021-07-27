import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryByUserComponent } from './salary-by-user.component';

describe('SalaryByUserComponent', () => {
  let component: SalaryByUserComponent;
  let fixture: ComponentFixture<SalaryByUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalaryByUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryByUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
