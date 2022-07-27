// testing
import { ComponentFixture, fakeAsync, flush } from '@angular/core/testing';
import { configureTestingModuleForComponents, grabComponentInstance, mockTranslateService } from '@app/core/utility/test-utils';
import { UtilityService } from '@core/utility/utility.service';
import { Subject } from 'rxjs';
import { WmlDropdownOptionsMeta } from './wml-dropdown-option/wml-dropdown-option.component';
import { WmlDropdownSampleComponent } from './wml-dropdown-sample/wml-dropdown-sample.component';

import { WmlDropdownComponent, WmlDropdownMeta, WmlDropdownParentSubjParams } from './wml-dropdown.component';

describe('WmlDropdownComponent', () => {
  let cpnt: WmlDropdownComponent;
  let fixture: ComponentFixture<WmlDropdownComponent>;
  let utilService:UtilityService

  beforeEach(async () => {
    await configureTestingModuleForComponents(WmlDropdownComponent,{mockTranslateService});
    ({fixture, cpnt} =  grabComponentInstance(WmlDropdownComponent));
    utilService = fixture.debugElement.injector.get(UtilityService)
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


  describe("ngAfterViewInit",()=>{
    beforeEach(()=>{
      spyOn(cpnt,"showInitalOptionAndSetAsRoot");
      spyOn(cpnt,"resizeInitialDropdown");
      spyOn(cpnt,"attachParentsToChild");      
      spyOn(cpnt,"subscribeToCommunicateWithParentSubj").and.callThrough()
      spyOn(cpnt,"setCommunicateWithParentSubj");
    })

    it(` when called | 
     as appropriate | 
     does the required action `,()=>{
      
      // act
      cpnt.ngAfterViewInit();

      // assert
      expect(cpnt.showInitalOptionAndSetAsRoot).toHaveBeenCalled();
      expect(cpnt.resizeInitialDropdown).toHaveBeenCalled();
      expect(cpnt.attachParentsToChild).toHaveBeenCalled();
      expect(cpnt.subscribeToCommunicateWithParentSubj).toHaveBeenCalled();
      expect(cpnt.setCommunicateWithParentSubj).toHaveBeenCalled();
    })
  })

  describe("subscribeToCommunicateWithParentSubj",()=>{
    beforeEach(()=>{
      spyOn(cpnt,"showDropdown");
      spyOn(cpnt,"hideDropdown");
    })

    it(` when called | 
     and resp.type === "showDropdown" | 
     does the required action `,(()=>{
        
        // arrange
        let obs$ = cpnt.subscribeToCommunicateWithParentSubj();
        
        obs$.subscribe(()=>{
          // assert
          expect(cpnt.showDropdown).toHaveBeenCalled();
          expect(cpnt.hideDropdown).not.toHaveBeenCalled();
        })

        // act
        cpnt.communicateWithParentSubj.next(new WmlDropdownParentSubjParams({
          type:"showDropdown",
          option:new WmlDropdownOptionsMeta({})
        }));

  

    }))

    it(` when called | 
     and resp.type === "hideDropdown", | 
     does the required action `,(()=>{
        
        // arrange
        let obs$ = cpnt.subscribeToCommunicateWithParentSubj();
        
        obs$.subscribe(()=>{
          // assert
          expect(cpnt.showDropdown).not.toHaveBeenCalled();
          expect(cpnt.hideDropdown).toHaveBeenCalled();
        })

        // act
        cpnt.communicateWithParentSubj.next(new WmlDropdownParentSubjParams({
          type:"hideDropdown",
          option:new WmlDropdownOptionsMeta({})
        }));

  

    }))    

  })

  describe("attachParentsToChild",()=>{
    
    it(` when called | 
     as appropriate | 
     does the required action `,()=>{
        // arrange
        cpnt.meta.options= Array(utilService.generateRandomNumber(5))
        .fill(null)
        .map(()=>{
          return new WmlDropdownOptionsMeta({})
        })

        // act
        cpnt.attachParentsToChild();

        // assert
        cpnt.meta.options.forEach((option,index0)=>{

          if (index0 === 0) {
            expect(option.parentOption).not.toEqual(cpnt.meta.options[0]);
          }
          else{
            expect(option.parentOption).toEqual(cpnt.meta.options[0]);
          }
          
          expect(option.parentDropdown).toEqual(cpnt.meta)
        })

    })
  })

  describe("resizeInitialDropdown",()=>{
    
    it(` when called | 
     as appropriate | 
     does the required action `,()=>{
      // act
      cpnt.resizeInitialDropdown();

      // assert
      expect(cpnt.meta.options[0].children.dropdownStyle.width).toEqual( "100%" )
    })

    it(` when called | 
     and !this.meta._root | 
     does the required action `,()=>{

      // arrange
      cpnt.meta.options[0] = new WmlDropdownOptionsMeta()
      cpnt.meta._root = false;

      // act
      cpnt.resizeInitialDropdown();

      // assert
      expect(cpnt.meta.options[0].children.dropdownStyle.width).not.toEqual( "100%" )
    })    
  })


  describe("showInitalOptionAndSetAsRoot",()=>{
    
    it(` when called | 
     as appropriate | 
     does the required action `,()=>{


      // act
      cpnt.showInitalOptionAndSetAsRoot();

      // assert
      expect(cpnt.meta.options[0].class).toEqual( "Pod0Item0")
      expect(cpnt.meta.options[0]._root).toEqual( true)
    })

    it(` when called | 
     and  !this.meta._root| 
     does the required action `,()=>{

      // arrage
      cpnt.meta._root= false
      cpnt.meta.options[0] = new WmlDropdownOptionsMeta()


      // act
      cpnt.showInitalOptionAndSetAsRoot();

      // assert
      expect(cpnt.meta.options[0].class).not.toEqual( "Pod0Item0")
      expect(cpnt.meta.options[0]._root).not.toEqual( true)
    })  
    
    it(` when called | 
    and  !this.meta._root| 
    does the required action `,()=>{

     // arrage
     cpnt.meta.options = []


     // act
     cpnt.showInitalOptionAndSetAsRoot();

     // assert
     expect(cpnt.meta.options[0].class).toEqual( "Pod0Item0")
     expect(cpnt.meta.options[0]._root).toEqual( true)
     expect(cpnt.meta.options[0].display.cpnt).toEqual(WmlDropdownSampleComponent)
   })  
  })


  describe("showDropdown",()=>{
    it(` when called | 
     as appropriate | 
     does the required action `,()=>{
      // arrange
      let resp = new WmlDropdownParentSubjParams({
        type:"showDropdown",
        option:new WmlDropdownOptionsMeta({
          children:new WmlDropdownMeta({
            options:Array(utilService.generateRandomNumber(10))
            .fill(null).map((_)=>{
              return new WmlDropdownOptionsMeta({})
            })
          })
        })
      })

      // act
      cpnt.showDropdown(resp);

      // assert
      resp.option.children.options.forEach((option) => {
        expect(option.class).toEqual("Pod0Item0");

      });

    })
  })

  describe("hideDropdown",()=>{
    it(` when called | 
     as appropriate | 
     does the required action `,()=>{
      // arrange
      cpnt.meta = new WmlDropdownMeta({
        options:Array(utilService.generateRandomNumber(3))
        .fill(null).map((_)=>{
          return new WmlDropdownOptionsMeta({
            children:new WmlDropdownMeta({
              options:Array(utilService.generateRandomNumber(3))
              .fill(null).map((_)=>{
                return new WmlDropdownOptionsMeta({})
              })
            })
          })
        })
      })
      let resp = new WmlDropdownParentSubjParams({
        type:"hideDropdown",
        option:new WmlDropdownOptionsMeta({})
      })

      // act
      cpnt.hideDropdown(resp);

      // assert
      cpnt.meta.options.forEach((option) => {
        option.children.options.forEach((option1) => {
          expect(option1.class).toEqual("Pod0Item1");
        })
  
      })

    })
  })
  

  describe("setCommunicateWithParentSubj",()=>{
    it(` when called | 
     as appropriate | 
     does the required action `,()=>{
      // act
      cpnt.setCommunicateWithParentSubj();

      // assert
      cpnt.meta.options.forEach((option) => {
        expect(option.communicateWithParentSubj).toEqual(cpnt.communicateWithParentSubj)
      });
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
