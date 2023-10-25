import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertsRoutingModule } from './certs-routing.module';
import { CertsMainComponent } from './certs-main/certs-main.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    CertsMainComponent
  ],
  imports: [
    CommonModule,
    CertsRoutingModule,
    SharedModule
  ]
})
export class CertsModule { }
