import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WmlFieldComponent } from './wml-fields.component';


@NgModule({
  declarations: [
    WmlFieldComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    WmlFieldComponent
  ],
})
export class WmlFieldModule { }
