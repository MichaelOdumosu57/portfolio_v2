// testing
import { ComponentFixture } from '@angular/core/testing';
import { configureTestingModuleForComponents, grabComponentInstance, mockTranslateService } from '@app/core/utility/test-utils';
import { Subject } from 'rxjs';
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
      expect(cpnt.myClass).toEqual('View')
    })

    it("should have all properties be the correct class instance", () => {
      expect(cpnt.ngUnsub).toBeInstanceOf(Subject<void>)
      expect(cpnt.meta).toBeInstanceOf(WmlDropdownMeta)
    })
  })

  describe("ngOnDestroy",()=>{

    beforeEach(()=>{
      spyOn(cpnt.ngUnsub,'next')
      spyOn(cpnt.ngUnsub,'complete')
    })
    
    it(` when called | 
     as appropriate | 
     does the required action `,()=>{
        // act
        cpnt.ngOnDestroy();

        // assert
        expect(cpnt.ngUnsub.next).toHaveBeenCalled();
        expect(cpnt.ngUnsub.complete).toHaveBeenCalled();
    })
  })  
});
