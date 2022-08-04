import { TestBed } from '@angular/core/testing';

import { TranslateReadyResolver } from './translate-ready.resolver';

describe('TranslateReadyResolver', () => {
  let resolver: TranslateReadyResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TranslateReadyResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
