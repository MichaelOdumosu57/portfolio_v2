// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';

// services
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';
import { BaseService } from '@core/base/base.service';

// rxjs
import { Subject } from 'rxjs';
import { takeUntil,tap } from 'rxjs/operators';

// misc
import { CONFIG } from '@app/core/config/configs';

@Component({
  selector: 'projects-main',
  templateUrl: './projects-main.component.html',
  styleUrls: ['./projects-main.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class ProjectsMainComponent  {

  constructor(
    private cdref:ChangeDetectorRef,
    private utilService:UtilityService,
    private configService:ConfigService,
    private baseService:BaseService
  ) { }
  classPrefix = this.utilService.generateClassPrefix(CONFIG.classPrefix.projectsMain)  
  @HostBinding('class') myClass: string = this.classPrefix(`View`);
  ngUnsub= new Subject<void>()  
  projects:ProjectInfo[] = [
    "https://michaelodumosu57.github.io/Facebook_Project"
  ]
  .map((href,index0)=>{
    return new ProjectInfo({
      title:"projectsMain.projects."+index0+".title",
      desc:"projectsMain.projects."+index0+".desc",
      imgSrc:"assets/media/projects_"+index0+".png",
      href,
    })
  })

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }  

}


class ProjectInfo{
  constructor(params:Partial<ProjectInfo>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
  title:string = "Project Title"
  desc:string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
  imgSrc:string = ""
  imgAlt:string = ""
  href:string = ""
}