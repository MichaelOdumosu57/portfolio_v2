// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


// wml components
import { WmlComponentsModule } from './wml-components/wml-components.module';

// misc
import { SampleCpntComponent } from './sample-cpnt/sample-cpnt.component';


// i18n
import { TranslateModule } from '@ngx-translate/core';
import { DropdownOptionComponent } from './dropdown-option/dropdown-option.component';
import { NavComponent } from './nav/nav.component';




@NgModule({
  imports:[
    CommonModule,
    TranslateModule,
    RouterModule
  ],
  exports: [
    WmlComponentsModule,
    TranslateModule,
    HttpClientModule,
    SampleCpntComponent,
    NavComponent
  ],
  declarations: [
    SampleCpntComponent,
    DropdownOptionComponent,
    NavComponent
  ]  
})
export class SharedModule { }
