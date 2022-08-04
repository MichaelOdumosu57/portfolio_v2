import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HomeMainComponent } from '@app/pages/home/home-main/home-main.component';



@NgModule({
  declarations: [
    // FooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    // FooterComponent
  ]
})
export class CoreModule { }
