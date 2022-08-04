// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


// wml components
import { WmlComponentsModule } from './wml-components/wml-components.module';

// misc
import { SampleCpntComponent } from './sample-cpnt/sample-cpnt.component';
import { IntroMainComponent } from '@app/pages/intro/intro-main/intro-main.component';

// i18n
import { TranslateModule } from '@ngx-translate/core';
import { DropdownOptionComponent } from './dropdown-option/dropdown-option.component';
import { NavComponent } from './nav/nav.component';
import { PenroseComponent } from './penrose/penrose.component';
import { FooterComponent } from '@core/components/footer/footer.component';



let components = [
  SampleCpntComponent,
  FooterComponent,
  PenroseComponent,
  IntroMainComponent,
]
@NgModule({
  imports:[
    CommonModule,
    TranslateModule,
    RouterModule
  ],
  exports: [
    ...components,
    WmlComponentsModule,
    TranslateModule,
    HttpClientModule,
  ],
  declarations: [
    ...components,
    DropdownOptionComponent,
    NavComponent
  ]  
})
export class SharedModule { }
