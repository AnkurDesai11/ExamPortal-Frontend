import { TestBed } from '@angular/core/testing';

import { NormaluserGuard } from './normaluser.guard';

describe('NormaluserGuard', () => {
  let guard: NormaluserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NormaluserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
