import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CONFIG } from '@core/config/configs';
import { CertsMainComponent } from './certs-main/certs-main.component';

const routes: Routes = [
  {
    path:'',
    component:CertsMainComponent
  },
  // TODO: mabye implemente canDeactiveGuard hack
  ...CONFIG.certsMain.categories
  .map((category)=>{
    return{
      path:category,
      component:CertsMainComponent,
      
    }
  })


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertsRoutingModule { }
