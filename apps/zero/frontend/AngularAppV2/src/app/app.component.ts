// angular
import { Component, HostBinding } from '@angular/core';

// rxjs
import { takeUntil,tap } from 'rxjs';
import { Subject,BehaviorSubject } from 'rxjs';

// reactive forms
import { FormControl, FormGroup } from '@angular/forms';

// misc
import { CONFIG } from '@core/config/configs';
import { DropdownOptionComponent, DropdownOptionMeta } from '@shared/dropdown-option/dropdown-option.component';


// wml compoenets
import { WmlDropdownComponent, WmlDropdownMeta } from '@shared/wml-components/wml-dropdown/wml-dropdown.component';
import { WMLField } from '@shared/wml-components/wml-fields/wml-fields.component';
import { WMLForm } from  '@shared/wml-components/wml-form/wml-form.component';
import { WmlDropdownOptionsMeta } from '@shared/wml-components/wml-dropdown/wml-dropdown-option/wml-dropdown-option.component';
import { WmlDropdownService } from '@shared/wml-components/wml-dropdown/wml-dropdown-service/wml-dropdown.service';

// services
import { UtilityService } from '@app/core/utility/utility.service';
import { ConfigService } from '@core/config/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private utilService:UtilityService,
    private configService:ConfigService,
    private wmlDropdownService:WmlDropdownService,
  ){}
  @HostBinding('class') myClass: string = `View`;
  ngUnsub= new Subject<void>()

  rootFormGroup = new FormGroup({
    [CONFIG.app.nameFieldFormControlName]:new FormControl(),
    [CONFIG.app.dropdownFieldFormControlName]:new FormControl(),
    
  });
  nameField = new WMLField({
    type:"custom",
    custom:{
      selfType:"wml-card",
      fieldParentForm:this.rootFormGroup,
      fieldFormControlName:CONFIG.app.nameFieldFormControlName
    }
  })





  generateSubDropdown:(level:number) =>WmlDropdownOptionsMeta[] = (level=0) => {
  
    let backgroundColor = this.utilService.generateRandomColor()
    return Array(this.utilService.generateRandomNumber(5,3))
    .fill(null)
    .map((nullVal,index0)=>{
      let options:WmlDropdownOptionsMeta[] = []
      let type:WmlDropdownOptionsMeta["type"] =  this.utilService.generateRandomNumber(7) > 4  ? "select":"option"
      if(level++ < 2){
        options =type === "select" ? this.generateSubDropdown(level) : []
        level--
      }

      let sideOrBottom = this.utilService.generateRandomNumber(50) % 2 === 0 
      return new WmlDropdownOptionsMeta({
        display:{
          cpnt:DropdownOptionComponent,
          meta:new DropdownOptionMeta({
            selectChevronIsPresent:type === "select",
            style:{
              backgroundColor
            },

          }),
        },
        displayType:sideOrBottom ? "dropdownFirst" :"optionFirst",
        dropdownChild: new WmlDropdownMeta({
          
          options,
          dropdownStyle:{
            left:sideOrBottom ?"100%" : "0px",
          }
        }),
        sourceValue:index0,
        type
      })
    })

  }


  dropdownSelect = new WmlDropdownOptionsMeta({
    display:{
      cpnt:DropdownOptionComponent,
      meta:new DropdownOptionMeta({
        selectChevronIsPresent:true
      }),
    },
    dropdownChild:new WmlDropdownMeta({

      options:this.generateSubDropdown(0),
    }),
    sourceValue:1,
    type:"select"
  })


  wmlDropdownMeta = new WmlDropdownMeta({
    options:[this.dropdownSelect],
    
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

  ngOnInit(){
    console.log(this.nameField)
    this.configService.initI18NValues()
    .pipe(
      takeUntil(this.ngUnsub),
      tap(()=>{
        
        this.allOptions  = this.wmlDropdownService.pullAllDropdownOptionsViaDropdown(this.wmlDropdownMeta)
        this.updateDropdownText();
        
      })
    )
    .subscribe()
  }
  allOptions:WmlDropdownOptionsMeta[] = []


  private updateDropdownText() {
    this.allOptions.map((option, index0) => {
      let meta:DropdownOptionMeta = option.display.meta
      meta.title = index0 === 0 ? CONFIG.i18n.appDropdownSelect : CONFIG.i18n.appDropdownOption + " " + index0;
      meta.view.cdref?.detectChanges()
    });
  }


  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
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
    
  }

}
