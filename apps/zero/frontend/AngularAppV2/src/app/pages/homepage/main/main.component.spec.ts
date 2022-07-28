// angular
import { MainComponent } from './main.component';

// testing
import { ComponentFixture } from '@angular/core/testing';
import { configureTestingModuleForComponents, grabComponentInstance, mockTranslateService } from '@core/utility/test-utils';

// wml componnts
import { WMLField } from'@shared/wml-components/wml-fields/wml-fields.component';
import { WMLForm } from '@shared/wml-components/wml-form/wml-form.component';


describe('MainComponent', () => {

  let fixture:ComponentFixture<any>
  let cpnt:MainComponent


  beforeEach(async () => {
    await configureTestingModuleForComponents(MainComponent,{mockTranslateService});
    ({fixture, cpnt} =  grabComponentInstance(MainComponent));
    fixture.detectChanges()
  })

  describe("init", () => {

    it("should create", () => {
      expect(cpnt).toBeTruthy()
    })  

    it("should have all values initalize properly", () => {
      expect(cpnt.fields).toEqual([cpnt.nameField,cpnt.dropdownField,cpnt.dockField,cpnt.textAreaField])
    })

    it("should have all properties be the correct class instance", () => {
      expect(cpnt.nameField).toBeInstanceOf(WMLField)
      expect(cpnt.dockField).toBeInstanceOf(WMLField)
      expect(cpnt.wmlForm).toBeInstanceOf(WMLForm)
    })
  })

  describe("removeDockField",()=>{

    beforeEach(()=>{
      spyOn(cpnt,"updateWMLFormFields")
    })

    it(` when called | 
     as appropriate | 
     does the required action `,()=>{
      
      // act
      cpnt.removeDockField()

      // assert
      expect(cpnt.fields).toEqual([cpnt.nameField,cpnt.dropdownField])
      expect(cpnt.updateWMLFormFields).toHaveBeenCalled()
    })
  })

  describe("addDockField",()=>{

    beforeEach(()=>{
      spyOn(cpnt,"updateWMLFormFields")
    })

    it(` when called | 
     as appropriate | 
     does the required action `,()=>{
      
      // act
      cpnt.addDockField()

      // assert
      expect(cpnt.fields).toEqual([cpnt.nameField,cpnt.dropdownField,cpnt.dockField])
      expect(cpnt.updateWMLFormFields).toHaveBeenCalled()
    })
  })  
});
