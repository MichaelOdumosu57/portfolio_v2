import { ChangeDetectionStrategy, ChangeDetectorRef, Component,  HostBinding,  Input, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';

// service
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';

// rxjs
import { Subject } from 'rxjs';
import { CONFIG } from '@app/core/config/configs';
import { SampleCpntComponent, SampleCpntMeta } from '../../sample-cpnt/sample-cpnt.component';

// wml compoentns
import { WMLWrapper } from '../models';
import { addCustomComponent } from '../functions';
import { WmlInputComponent, WmlInputMeta } from '../wml-input/wml-input.component';
import { AbstractControl, FormControl, FormControlName, FormGroup } from '@angular/forms';

@Component({
  selector: 'wml-fields',
  templateUrl: './wml-fields.component.html',
  styleUrls: ['./wml-fields.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class WmlFieldComponent implements OnInit {

  constructor(
    private cdref:ChangeDetectorRef,
    private utilService:UtilityService,
    private configService:ConfigService,
    
  ) { }

  @HostBinding('class') myClass: string = `View`;
  ngUnsub= new Subject()
  @Input("field") wmlField?:WMLField
  @ViewChild("customLabels",{read:ViewContainerRef,static:true}) customLabels!:ViewContainerRef;
  @ViewChild("customField", {read:ViewContainerRef,static:true}) customField!:ViewContainerRef;
  @ViewChild("customError", {read:ViewContainerRef,static:true}) customError!:ViewContainerRef;

  initComponent(){

    if(this.wmlField){
      this.wmlField.view.cdref = this.cdref
    }
    

    if(this.wmlField?.field.type ==="custom"){

      addCustomComponent(this.customField,this.wmlField.field.custom.cpnt as Type<any>,this.wmlField.field.custom.meta)

    }
  }

  initUpdateComponent(){

  }


  ngOnInit(): void {
    
    this.initComponent()
    this.initUpdateComponent()
    
  }

  ngOnDestroy(){
    this.ngUnsub.next(null);
    this.ngUnsub.complete()
  }

}


export class WMLField extends WMLWrapper {
  constructor(
    params:{
      type:"default" | "custom",
      default?:{
        wmlfield:Partial<WMLField> 
      },
      custom?:{
        selfType?: WMLField["self"]["type"],
        fieldType?: WMLField["field"]["type"],
        fieldCustomCpnt?:WMLField["field"]["custom"]["cpnt"],
        fieldCustomMeta?:WMLField["field"]["custom"]["meta"],
        fieldParentForm?:WMLField["field"]["parentForm"],
        fieldFormControlName?:WMLField["field"]["formControlName"],
      }
    } = {
      type:"default",
      default:{
        wmlfield:{}
      },
      custom:{
        selfType:"wml-card"
      }
    }
  ){
    super();
    if(params.type === "default"){
      Object.assign(
        this,
        {
          ...params.default?.wmlfield
        }
      )
    }

    else if(params.type === "custom"){
      let custom = params.custom ?? {}
      this.self.type = custom.selfType ?? "standalone"
      this.field.type = custom.fieldType ?? "custom"
      this.field.custom.cpnt = custom.fieldCustomCpnt ?? WmlInputComponent 
      this.field.custom.meta = custom.fieldCustomMeta ?? new WmlInputMeta({
        wmlField:this
      })
      this.field.parentForm = custom.fieldParentForm ?? this.field.parentForm  
      this.field.formControlName = custom.fieldFormControlName ?? this.field.formControlName  
    }


  }
  self:{
    type:"standalone" | "wml-card"
  }= {
    type:"wml-card"
  }
  label ={}
  field:{

    type:"input" | "custom"  //may just make all components dynamic and provide metas 
    parentForm:FormGroup,
    formControlName:string
    custom:{
      cpnt?:Type<any>
      meta:any,
    }
    
  } = {
    type:"custom",
    custom:{
      cpnt:SampleCpntComponent,
      meta:new SampleCpntMeta
    },
    parentForm:new FormGroup({
      name:new FormControl()
    }),
    formControlName:"name"
  }
  errors= {}
}