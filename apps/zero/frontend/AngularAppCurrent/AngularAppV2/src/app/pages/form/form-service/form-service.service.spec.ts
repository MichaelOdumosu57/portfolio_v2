// testing
import { configureTestingModuleForServices } from '@core/utility/test-utils';
import { TestBed } from '@angular/core/testing';

import { FormService } from './form-service.service';
import { UtilityService } from '@core/utility/utility.service';

describe('FormServiceService', () => {
  let service: FormService;
  let utilService:UtilityService

  beforeEach(() => {
    service = configureTestingModuleForServices(FormService)
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
