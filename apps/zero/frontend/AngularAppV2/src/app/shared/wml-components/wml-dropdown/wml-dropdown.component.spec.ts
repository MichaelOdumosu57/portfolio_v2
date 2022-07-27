// testing
import { ComponentFixture } from '@angular/core/testing';
import { configureTestingModuleForComponents, grabComponentInstance, mockTranslateService } from '@app/core/utility/test-utils';
import { WmlDropdownOptionsMeta } from './wml-dropdown-option/wml-dropdown-option.component';

import { WmlDropdownComponent, WmlDropdownMeta } from './wml-dropdown.component';

describe('WmlDropdownComponent', () => {
  let cpnt: WmlDropdownComponent;
  let fixture: ComponentFixture<WmlDropdownComponent>;

  beforeEach(async () => {
    await configureTestingModuleForComponents(WmlDropdownComponent,{mockTranslateService});
    ({fixture, cpnt} =  grabComponentInstance(WmlDropdownComponent));
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
