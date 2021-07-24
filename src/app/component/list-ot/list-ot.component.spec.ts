import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOtComponent } from './list-ot.component';

describe('ListOtComponent', () => {
  let component: ListOtComponent;
  let fixture: ComponentFixture<ListOtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
