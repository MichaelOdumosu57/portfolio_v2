// testing
import { TestBed } from '@angular/core/testing';
import { configureTestingModuleForServices } from '@core/utility/test-utils';

import { TemplateService } from './template.service';

describe('TemplateService', () => {
  let service: TemplateService;



  beforeEach(() => {
    service = configureTestingModuleForServices(TemplateService)
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
