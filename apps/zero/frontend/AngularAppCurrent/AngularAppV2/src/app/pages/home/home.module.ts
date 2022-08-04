import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '@shared/shared.module';
import { HomeIntroComponent } from './home-intro/home-intro.component';


@NgModule({
  declarations: [
  
    HomeIntroComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
  ]
})
export class HomeModule { }
