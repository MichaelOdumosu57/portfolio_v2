import { ChangeDetectionStrategy, ChangeDetectorRef, Component,  HostBinding,  Input, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';

// service
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';

// rxjs
import { combineLatest, merge, Subject } from 'rxjs';
import { takeUntil,tap } from 'rxjs/operators';
import { CONFIG } from '@app/core/config/configs';
import { SampleCpntComponent, SampleCpntMeta } from '../../sample-cpnt/sample-cpnt.component';

// wml compoentns
import { WMLCustomComponent, WMLUIProperty, WMLWrapper } from '../models';
import { addCustomComponent } from '../functions';
import { WmlInputComponent, WmlInputMeta } from '../wml-input/wml-input.component';
import { AbstractControl, FormControl, FormControlName, FormGroup } from '@angular/forms';
import { WmlLabelComponent, WmlLabelMeta } from './wml-label/wml-label.component';

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
  @ViewChild("customLabel",{read:ViewContainerRef,static:true}) customLabel!:ViewContainerRef;
  @ViewChild("customField", {read:ViewContainerRef,static:true}) customField!:ViewContainerRef;
  @ViewChild("customError", {read:ViewContainerRef,static:true}) customError!:ViewContainerRef;

  initComponent(){

    if(this.wmlField){
      this.wmlField.view.cdref = this.cdref
    }
    

    ["label","field"].forEach((key,index0)=>{

      if(  this.wmlField?.[key]?.type === "custom"){
        this.wmlField[key].custom.meta.wmlField = this.wmlField 
    
        addCustomComponent(
          [this.customLabel,this.customField][index0],
          this.wmlField[key].custom.cpnt as Type<any>,
          this.wmlField[key].custom.meta
        )
  
      }
    })

  }

  initUpdateComponent(){

  }

  errorMsgIsPresentByListening:any= false
  listenForErrorMsg(){


    let formControl = this.wmlField?.field?.parentForm.controls[this.wmlField?.field?.formControlName]

    return formControl?.statusChanges
    .pipe(
      takeUntil(this.ngUnsub),
      tap((resp)=>{
        this.errorMsgIsPresentByListening = (formControl?.errors !== null && formControl?.dirty)
        if(this.wmlField){
          this.wmlField.error.displayMsg = this.wmlField.error.msgs[ Object.keys(formControl?.errors ?? {})[0] ] ?? this.wmlField.error.displayMsg
          
        } 
        this.cdref.detectChanges()   
      })
    )


   
  }




  ngOnInit(): void {
    this.initComponent()
    this.initUpdateComponent()
    this.listenForErrorMsg()?.subscribe()
    
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
        labelValue?:WmlLabelMeta["labels"][number][number]["value"],
        labelRequired?:boolean,
        errorMsgs?:WMLField["error"]["msgs"],
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
      let labelWMLLabelMeta:WmlLabelMeta = this.label.custom.meta
      this.self.type = custom.selfType ?? "standalone"
      this.field.type = custom.fieldType ?? "custom"
      this.field.custom.cpnt = custom.fieldCustomCpnt ?? WmlInputComponent 
      this.field.custom.meta = custom.fieldCustomMeta ?? new WmlInputMeta({
        wmlField:this
      })
      this.field.parentForm = custom.fieldParentForm ?? this.field.parentForm  
      this.field.formControlName = custom.fieldFormControlName ?? this.field.formControlName 

      labelWMLLabelMeta.labels[0][1].value = custom.labelValue ?? labelWMLLabelMeta.labels[0][1].value 
      if(custom.labelRequired === false){
        labelWMLLabelMeta.labels[0].shift()  
      }
      
      this.error.msgs = custom.errorMsgs ?? this.error.msgs
    }

    

  }
  self:{
    type:"standalone" | "wml-card"
  }= {
    type:"wml-card"
  }
  label = {
    type:"custom",
    custom:new WMLCustomComponent({
      cpnt:WmlLabelComponent,
      meta:new WmlLabelMeta()
    })
  }
  field:{

    type:"input" | "custom"  //may just make all components dynamic and provide metas 
    parentForm:FormGroup,
    formControlName:string
    custom:WMLCustomComponent
    
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
  error:{
    msgs:{
      [k:string]:string
    }
    displayMsg:string
    isPresent:boolean
  }= {
    msgs:{
      required:"This field is required"
    },
    isPresent:false,
    displayMsg:"Please correct the above error",
  }
}