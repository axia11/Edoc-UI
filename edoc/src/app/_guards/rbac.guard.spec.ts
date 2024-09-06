import { TestBed } from '@angular/core/testing';

import { RBACGuard } from './rbac.guard';

describe('RBACGuard', () => {
  let guard: RBACGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RBACGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
