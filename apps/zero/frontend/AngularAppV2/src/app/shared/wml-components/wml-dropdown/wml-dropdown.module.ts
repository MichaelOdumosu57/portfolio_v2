import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WmlDropdownComponent } from './wml-dropdown.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WmlDropdownOptionComponent } from './wml-dropdown-option/wml-dropdown-option.component';



@NgModule({
  declarations: [
    WmlDropdownComponent,
    WmlDropdownOptionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class WmlDropdownModule { }
