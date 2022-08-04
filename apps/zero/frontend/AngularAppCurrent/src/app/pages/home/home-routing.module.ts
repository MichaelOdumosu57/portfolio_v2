import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeIntroComponent } from './home-intro/home-intro.component';

const routes: Routes = [
  {
    path:'',
    component:HomeIntroComponent,
  },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
