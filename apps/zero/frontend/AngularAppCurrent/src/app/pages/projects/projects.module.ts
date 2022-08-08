import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsMainComponent } from './projects-main/projects-main.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    ProjectsMainComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule
  ]
})
export class ProjectsModule { }
