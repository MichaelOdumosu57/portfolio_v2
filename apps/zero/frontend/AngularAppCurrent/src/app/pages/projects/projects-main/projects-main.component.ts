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
    "https://michaelodumosu57.github.io/ Facebook_Project",
    "https://gx8pv.csb.app",
    "https://michaelodumosu57 .github.io/SocialMediaApp",
    "https://lawforlearners. firebaseapp.com/home",
    "https://i18n-paypal-okta-brochure.netlify.app/home",
    "https://windmillcode.github.io/portal-sample-app/",
    "N/A",
    "https://github.com/MichaelOdumosu57/ mkimbe_online_store",
    "https://myportfolio-7d6b0.firebaseapp.com/resume",
    "https://r76j1j-8888.preview.csb.app/profiles"
    // "https://lwqx5.csb.app/"
  ]
  .map((displayValue,index0)=>{
    let imgSrc="assets/media/projects_"+index0+".png"
    if( 
      [
        "https://michaelodumosu57 .github.io/SocialMediaApp",
        "https://r76j1j-8888.preview.csb.app/profiles"
      ]
      .includes(displayValue) 
    ){
      imgSrc="assets/media/projects_"+index0+".gif"
    }
    return new ProjectInfo({
      title:"projectsMain.projects."+index0+".title",
      desc:"projectsMain.projects."+index0+".desc",
      imgSrc,
      href:displayValue.split(" ").join(""),
      displayValue
    })
  })

  ngOnInit(): void {
    let [
      facebookProject,
      receiptTracker,
      socialUploader,
      lawForLearners,
      pohelaBoishakh,
      sampleEcommerce,
      meetupApp,
      mkimbe,
      portfolioV1,
      crexiTakeHome
    ]= this.projects
    this.projects = [
      crexiTakeHome,
      portfolioV1,      
      receiptTracker,
      socialUploader,
      pohelaBoishakh,
      sampleEcommerce,
      mkimbe,
      meetupApp,
      facebookProject,
      lawForLearners,
    ]
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
  displayValue:string=""
}