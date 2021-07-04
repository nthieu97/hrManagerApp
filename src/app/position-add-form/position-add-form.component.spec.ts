import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionAddFormComponent } from './position-add-form.component';

describe('PositionAddFormComponent', () => {
  let component: PositionAddFormComponent;
  let fixture: ComponentFixture<PositionAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionAddFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
