import { TestBed } from '@angular/core/testing';

import { MoveIntroToAboveUsersScreenGuard } from './move-intro-to-above-users-screen.guard';

describe('MoveIntroToAboveUsersScreenGuard', () => {
  let guard: MoveIntroToAboveUsersScreenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MoveIntroToAboveUsersScreenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
