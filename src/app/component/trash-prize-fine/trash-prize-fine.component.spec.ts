import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashPrizeFineComponent } from './trash-prize-fine.component';

describe('TrashPrizeFineComponent', () => {
  let component: TrashPrizeFineComponent;
  let fixture: ComponentFixture<TrashPrizeFineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrashPrizeFineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashPrizeFineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
