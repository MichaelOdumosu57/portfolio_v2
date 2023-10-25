// testing
import { ComponentFixture } from '@angular/core/testing';
import { configureTestingModuleForComponents, grabComponentInstance, mockTranslateService } from '@core/utility/test-utils';

import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let cpnt: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async () => {
    await configureTestingModuleForComponents(NavComponent,{mockTranslateService});
    ({fixture, cpnt} =  grabComponentInstance(NavComponent));
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
