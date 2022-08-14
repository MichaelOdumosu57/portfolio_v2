import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WmlFieldComponent } from './wml-fields.component';
import { WmlLabelComponent } from './wml-label/wml-label.component';
import { WmlErrorComponent } from './wml-error/wml-error.component';


@NgModule({
  declarations: [
    WmlFieldComponent,
    WmlLabelComponent,
    WmlErrorComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    WmlFieldComponent
  ],
})
export class WmlFieldModule { }
