// testing
import { ComponentFixture } from '@angular/core/testing';
import { configureTestingModuleForComponents, grabComponentInstance, mockTranslateService } from '@app/core/utility/test-utils';

import { WmlDropdownOptionComponent } from './wml-dropdown-option.component';

describe('WmlDropdownOptionComponent', () => {
  let cpnt: WmlDropdownOptionComponent;
  let fixture: ComponentFixture<WmlDropdownOptionComponent>;


  beforeEach(async () => {
    await configureTestingModuleForComponents(WmlDropdownOptionComponent,{mockTranslateService});
    ({fixture, cpnt} =  grabComponentInstance(WmlDropdownOptionComponent));
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
