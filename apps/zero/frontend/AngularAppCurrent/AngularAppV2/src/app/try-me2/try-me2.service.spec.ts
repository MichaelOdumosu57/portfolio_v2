// testing
import { configureTestingModuleForServices } from '@core/utility/test-utils';
import { TestBed } from '@angular/core/testing';

// services
import { UtilityService } from '@core/utility/utility.service';

import { TryMe2Service } from './try-me2.service';

describe('TryMe2Service', () => {
  let service: TryMe2Service;
  let utilService:UtilityService

  beforeEach(() => {
    service = configureTestingModuleForServices(TryMe2Service)
    utilService =TestBed.inject(UtilityService)
  });

  describe("init", () => {

    it("should create", () => {
      expect(service).toBeTruthy()
    })  

    it("should have all values initalize properly", () => {
    })

    it("should have all properties be the correct class instance", () => {

    })
  })
});
