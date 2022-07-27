import { TestBed } from '@angular/core/testing';

import { WmlDropdownService } from './wml-dropdown.service';

describe('WmlDropdownService', () => {
  let service: WmlDropdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WmlDropdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
