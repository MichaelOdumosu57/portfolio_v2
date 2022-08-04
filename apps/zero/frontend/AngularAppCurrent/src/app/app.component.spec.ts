// angular
import { AppComponent } from './app.component';

// testing
import { ComponentFixture } from '@angular/core/testing';
import { configureTestingModuleForComponents, grabComponentInstance, mockTranslateService } from '@core/utility/test-utils';

// wml componnts
import { WMLField } from './shared/wml-components/wml-fields/wml-fields.component';
import { WMLForm } from './shared/wml-components/wml-form/wml-form.component';


describe('AppComponent', () => {

  let fixture:ComponentFixture<any>
  let cpnt:AppComponent


  beforeEach(async () => {
    await configureTestingModuleForComponents(AppComponent,{mockTranslateService});
    ({fixture, cpnt} =  grabComponentInstance(AppComponent));
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
