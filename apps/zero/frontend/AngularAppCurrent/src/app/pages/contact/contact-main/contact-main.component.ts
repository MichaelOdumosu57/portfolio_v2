// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';

// services
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';
import { BaseService } from '@core/base/base.service';

// rxjs
import { Subject } from 'rxjs';
import { takeUntil,tap } from 'rxjs/operators';

// misc
import { CONFIG } from '@app/core/config/configs';

// wml-components
import { WMLField } from '@shared/wml-components/wml-fields/wml-fields.component';

// reactive-forms
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WMLForm } from '@shared/wml-components/wml-form/wml-form.component';
import { WmlInputMeta } from '@shared/wml-components/wml-input/wml-input.component';
import { WMLButton, WMLUIProperty } from '@shared/wml-components/models';

@Component({
  selector: 'contact-main',
  templateUrl: './contact-main.component.html',
  styleUrls: ['./contact-main.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class ContactMainComponent  {

  constructor(
    private cdref:ChangeDetectorRef,
    private utilService:UtilityService,
    private configService:ConfigService,
    private baseService:BaseService
  ) { }
  classPrefix = this.utilService.generateClassPrefix(CONFIG.classPrefix.contactMain)
  @HostBinding('class') myClass: string = this.classPrefix(`View`);
  ngUnsub= new Subject<void>()

  rootFormGroup = new FormGroup({
    [CONFIG.contactMain.nameFieldFormControlName]: new FormControl(null,[Validators.required]),
    [CONFIG.contactMain.msgTextFieldFormControlName]: new FormControl(null,[Validators.required]),
  })
  
  nameField = new WMLField({
    type: "custom",
    custom: {
      selfType: "wml-card",
      fieldParentForm: this.rootFormGroup,
      fieldFormControlName: CONFIG.contactMain.nameFieldFormControlName,
      labelValue:this.utilService.getValueByi18nKey("contactMain.form.name.label")
    }
  })


  msgTextMeta  = new WmlInputMeta({ type: "textarea" })
  msgTextField = new WMLField({
    type: "custom",
    custom: {
      selfType: "wml-card",
      fieldParentForm: this.rootFormGroup,
      fieldFormControlName: CONFIG.contactMain.msgTextFieldFormControlName,
      fieldCustomMeta: this.msgTextMeta,
      labelValue:this.utilService.getValueByi18nKey("contactMain.form.msg.label"),
      errorMsgs:{
        required:this.utilService.getValueByi18nKey("contactMain.form.msgText.errorMsgs.required")
      }
    }
  })

  submitButton = new WMLButton({
    text:new WMLUIProperty({
      value:"contactMain.submit.text"
    })
  })

  fields= [this.nameField,this.msgTextField]
  wmlForm = new WMLForm({
    fields: this.fields
  })

  socialMediaContacts =Array(6)
  .fill(null)
  .map((nullVal,index0)=>{
    return new ContactSocialMedia({
      imgSrc:"assets/media/contact_"+index0+".png",
      imgAlt:"contactMain.socialMedia."+index0,
      displayTitle:"contactMain.socialMedia."+index0,
      navigateTo:()=> window.location.href = [
        "mailto:michaelodumosu57@gmail.com",
        "https://www.facebook.com/mchael.odumosu/",
        "https://twitter.com/MOdumosu",
        "https://app.slack.com/client/T02A6UJ4EJD/setup-invites",
        "https://discord.com/channels/michaelodumosu57#0118",        
        "https://www.linkedin.com/in/michael-odumosu-a58367b1",
      ][index0],
      titleStyle :{
        background:[
          "radial-gradient(farthest-corner at 100% 0px, red 0%, white 250%)",
          "radial-gradient(farthest-corner at 100% 0px, royalblue 0%, navy 200%)",
          "radial-gradient(farthest-corner at 100% 0px, cyan 0%, skyblue 200%)",
          "radial-gradient(farthest-corner at 100% 0px, aquamarine 0%, green 200%)",
          "radial-gradient(farthest-corner at 100% 0px, aquamarine 0%, purple 200%)",
          "radial-gradient(farthest-corner at 100% 0px, cyan 0%, blue 200%)",
        ][index0]
      }
    })
  })

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }  

}


class ContactSocialMedia{
  constructor(params:Partial<ContactSocialMedia>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }

  imgSrc:string = ""
  imgAlt:string = ""
  title:string= ""
  navigateTo:()=>void= ()=>{}
  titleStyle:Partial<CSSStyleDeclaration>= {}
  displayTitle:string = "Title"
}