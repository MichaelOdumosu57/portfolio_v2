import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'form',
    loadChildren: () => import('./pages/form/form.module').then(m => m.FormModule)
  },
  {
    path:'intro',
    loadChildren: () => import('./pages/intro/intro.module').then(m => m.IntroModule)
  },  
  {
    path:'',
    loadChildren: () => import('./pages/homepage/homepage.module').then(m => m.HomepageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
