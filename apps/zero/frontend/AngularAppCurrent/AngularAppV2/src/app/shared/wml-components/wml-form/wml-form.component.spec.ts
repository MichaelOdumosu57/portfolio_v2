// testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestingModuleForComponents, grabComponentInstance, mockTranslateService } from '@app/core/utility/test-utils';

import { WmlFormComponent } from './wml-form.component';

describe('WmlFormComponent', () => {
  let cpnt: WmlFormComponent;
  let fixture: ComponentFixture<WmlFormComponent>;

  beforeEach(async () => {
    await configureTestingModuleForComponents(WmlFormComponent,{mockTranslateService});
    ({fixture, cpnt} =  grabComponentInstance(WmlFormComponent));
    fixture.detectChanges()
  })

  describe("init", () => {

    it("should create", () => {
      expect(cpnt).toBeTruthy()
    })  

    it("should have all values initalize properly", () => {
    })

    it("should have all properties be the correct class instance", () => {

    })
  })
});
