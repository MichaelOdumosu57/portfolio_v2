import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertsMainComponent } from './certs-main/certs-main.component';

const routes: Routes = [
  {
    path:'',
    component:CertsMainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertsRoutingModule { }
