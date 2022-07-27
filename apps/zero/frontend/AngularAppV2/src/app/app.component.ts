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
    private configService:ConfigService
  ){}
  @HostBinding('class') myClass: string = `View`;
  ngUnsub= new Subject<void>()

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





  generateSubDropdown:(level:number) =>WmlDropdownOptionsMeta[] = (level=0) => {
  
    let backgroundColor = this.utilService.generateRandomColor()
    return Array(this.utilService.generateRandomNumber(5,5))
    .fill(null)
    .map((nullVal,index0)=>{
      let options:WmlDropdownOptionsMeta[] = []
      let type:WmlDropdownOptionsMeta["type"] =  this.utilService.generateRandomNumber(7) > 4  ? "select":"option"
      if(level++ < 3){
        options =type === "select" ? this.generateSubDropdown(level) : []
        level--
      }
      return new WmlDropdownOptionsMeta({
        display:{
          cpnt:DropdownOptionComponent,
          meta:new DropdownOptionMeta({
            selectChevronIsPresent:type === "select",
            style:{
              backgroundColor
            }

          }),
        },
        children: new WmlDropdownMeta({
          options,
          dropdownStyle:{
            left:"100%",
            top:"100%",
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
    children:new WmlDropdownMeta({
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
    this.configService.initI18NValues()
    .pipe(
      takeUntil(this.ngUnsub),
      tap(()=>{
        
        this.pullAllDropdownOptions(this.wmlDropdownMeta.options)
        this.updateDropdownText();
      })
    )
    .subscribe()
  }
  allOptions:WmlDropdownOptionsMeta[] = []

  pullAllDropdownOptions(options:WmlDropdownOptionsMeta[]){
  
    options.forEach((option)=>{
      this.allOptions.push(option)
      this.pullAllDropdownOptions(option.children.options)
    })
  }
  private updateDropdownText() {
    this.allOptions.map((option, index0) => {
      let meta:DropdownOptionMeta = option.display.meta
      meta.title = index0 === 0 ? CONFIG.i18n.appDropdownSelect : CONFIG.i18n.appDropdownOption + " " + index0;
      meta.view.cdref?.detectChanges()
    });
  }

  ngAfterViewInit(){
    // console.log(this.nameField.view?.cdref)
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
