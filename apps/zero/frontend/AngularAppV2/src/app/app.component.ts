import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CONFIG } from '@core/config/configs';
import { DropdownOptionComponent, DropdownOptionMeta } from '@shared/dropdown-option/dropdown-option.component';
import { SampleCpntComponent, SampleCpntMeta } from '@shared/sample-cpnt/sample-cpnt.component';
import { WmlDropdownComponent, WmlDropdownMeta } from '@shared/wml-components/wml-dropdown/wml-dropdown.component';
import { WMLField } from '@shared/wml-components/wml-fields/wml-fields.component';
import { WMLForm } from  '@shared/wml-components/wml-form/wml-form.component';
import { UtilityService } from '@app/core/utility/utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private utilService:UtilityService,
  ){}
  title = 'AngularAppV2';

  rootFormGroup = new FormGroup({
    [CONFIG.app.nameFieldFormControlName]:new FormControl(),
    [CONFIG.app.dropdownFieldFormControlName]:new FormControl()
  });
  nameField = new WMLField({
    type:"custom",
    custom:{
      selfType:"wml-card",
      fieldParentForm:this.rootFormGroup,
      fieldFormControlName:CONFIG.app.nameFieldFormControlName
    }
  })

  wmlDropdownMeta = new WmlDropdownMeta({
    select:{
      display:{
        cpnt:DropdownOptionComponent,
        meta:new DropdownOptionMeta({
          title:"Selector",
          subTitle:"Subtitle"
        }),
      },
      sourceValue:1,
    },
    options:Array(this.utilService.generateRandomNumber(5))
    .fill(null)
    .map((nullVal,index0)=>{
      return {
        display:{
          cpnt:DropdownOptionComponent,
          meta:new DropdownOptionMeta(),
        },
        sourceValue:index0,
        multiple:false
      }
    })
  })
  dropdownField = new WMLField({
    type:"custom",
    custom:{
      selfType:"wml-card",
      fieldParentForm:this.rootFormGroup,
      fieldFormControlName:CONFIG.app.dropdownFieldFormControlName,
      fieldCustomCpnt:WmlDropdownComponent,
      fieldCustomMeta: this.wmlDropdownMeta

    }
  })

  dockField = new WMLField({
    type:"default",
  })
  fields = [this.nameField,this.dropdownField,this.dockField]
  wmlForm = new WMLForm({
    fields:this.fields
  })

  ngAfterViewInit(){
    // console.log(this.nameField.view?.cdref)
  }

  removeDockField=()=>{
    
    this.fields = [this.nameField,this.dropdownField]
    this.updateWMLFormFields()
  }  

  addDockField=()=>{
    this.fields = [this.nameField,this.dropdownField,this.dockField]
    this.updateWMLFormFields()
  }

  updateWMLFormFields(){
    this.wmlForm.fields = this.fields
  }

  submit(){
    console.log(this.rootFormGroup.getRawValue())
  }

  removeDropdownOption(){
    this.wmlDropdownMeta.options.pop()
    this.dropdownField.view.cdref?.detectChanges()
    
    console.log(this.wmlDropdownMeta.options.length)
  }

}
