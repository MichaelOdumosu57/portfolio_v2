import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroMainComponent } from './intro-main/intro-main.component';

const routes: Routes = [
  {
    path:'',
    component:IntroMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntroRoutingModule { }
