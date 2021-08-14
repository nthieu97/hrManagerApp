import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOtByTimeComponent } from './list-ot-by-time.component';

describe('ListOtByTimeComponent', () => {
  let component: ListOtByTimeComponent;
  let fixture: ComponentFixture<ListOtByTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOtByTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOtByTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
