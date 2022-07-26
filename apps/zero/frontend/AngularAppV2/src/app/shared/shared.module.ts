// angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// wml components
import { WmlComponentsModule } from './wml-components/wml-components.module';

// misc
import { SampleCpntComponent } from './sample-cpnt/sample-cpnt.component';


// i18n
import { TranslateModule } from '@ngx-translate/core';
import { DropdownOptionComponent } from './dropdown-option/dropdown-option.component';




@NgModule({
  imports:[
    CommonModule,
    TranslateModule
  ],
  exports: [
    WmlComponentsModule,
    TranslateModule,
    HttpClientModule,
    SampleCpntComponent,
  ],
  declarations: [
    SampleCpntComponent,
    DropdownOptionComponent
  ]  
})
export class SharedModule { }
