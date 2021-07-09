import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionEditFormComponent } from './position-edit-form.component';

describe('PositionEditFormComponent', () => {
  let component: PositionEditFormComponent;
  let fixture: ComponentFixture<PositionEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionEditFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
