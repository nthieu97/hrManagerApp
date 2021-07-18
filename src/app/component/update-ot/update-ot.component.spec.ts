import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOtComponent } from './update-ot.component';

describe('UpdateOtComponent', () => {
  let component: UpdateOtComponent;
  let fixture: ComponentFixture<UpdateOtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
