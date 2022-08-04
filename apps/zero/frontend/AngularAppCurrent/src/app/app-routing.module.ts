import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path:'intro',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },

  {
    path:'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },  

  {
    path:'resume',
    loadChildren: () => import('./pages/resume/resume.module').then(m => m.ResumeModule)
  },  

  {
    path:'certs',
    loadChildren: () => import('./pages/certs/certs.module').then(m => m.CertsModule)
  },  
  
  {
    path:'contact',
    loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule)
  },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
