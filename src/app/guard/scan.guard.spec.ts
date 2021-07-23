import { TestBed } from '@angular/core/testing';

import { ScanGuard } from './scan.guard';

describe('ScanGuard', () => {
  let guard: ScanGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ScanGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
