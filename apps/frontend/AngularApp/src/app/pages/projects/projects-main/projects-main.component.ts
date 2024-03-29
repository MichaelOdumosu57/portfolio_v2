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
    ["https://michaelodumosu57.github.io/ Facebook_Project"],
    ["https://gx8pv.csb.app"],
    ["https://michaelodumosu57 .github.io/SocialMediaApp"],
    ["https://lawforlearners. firebaseapp.com/home"],
    ["https://i18n-paypal-okta-brochure.netlify.app/home"],
    ["https://windmillcode.github.io/portal-sample-app/"],
    ["N/A"],
    ["https://github.com/MichaelOdumosu57/ mkimbe_online_store"],
    ["https://myportfolio-7d6b0.firebaseapp.com/resume"],
    ["https://michaelodumosu57.github.io/crexi_take_home"],
    ["https://github.com/ MichaelOdumosu57/ proof_of_vibes_near_hackathon"],
    ["https://proof-of-vibes-preview.web.app"],
    ["https://63c32253e1cda000087c4769--grand-dasik-23dd9f.netlify.app/"],
    ["https://play.google.com/store/apps/details?id=com.windmillcode.songs_practice"],
    ["https://ride-platform.web.app/"],
    ["https://waveride-56f1a.web.app/"],
    [
      "https://wave-and-grind-4rgp1.web.app/",
      "https://play.google.com/apps/testing/com.windmillcode.session_by_me"
    ],
    ["https://findmyrole-preview.web.app/"],
    ["https://659815fa624754145bc2e0fd--cerulean-crisp-d02c30.netlify.app/"],
    ["https://ui.preview.eneobia.com"]
  ]
  .map((displayValues,index0)=>{
    let imgSrc="assets/media/projects_"+index0+".png"
    if(
      [
        "https://michaelodumosu57 .github.io/SocialMediaApp",
        "https://michaelodumosu57.github.io/crexi_take_home",
        "https://proof-of-vibes-preview.web.app",
        "https://63c32253e1cda000087c4769--grand-dasik-23dd9f.netlify.app/",
        "https://play.google.com/store/apps/details?id=com.windmillcode.songs_practice",
        "https://wave-and-grind-4rgp1.web.app/"
      ]
      .find((val)=>{
        return displayValues.includes(val)
      })
    ){
      imgSrc="assets/media/projects_"+index0+".gif"
    }
    return new ProjectInfo({
      title:"projectsMain.projects."+index0+".title",
      desc:"projectsMain.projects."+index0+".desc",
      imgSrc,
      displayValues: displayValues.map((val)=>{
        return {
          val,
          href:val.split(" ").join("")
        }
      })
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
      crexiTakeHome,
      nearHackathon,
      proofOfVibes,
      sampleSportsApp,
      bakaSongs,
      ridePlfatform,
      waveRide,
      waveAndGrind,
      findmyrole,
      zawadiYaManutako,
      eneobia,
    ]= this.projects
    this.projects = [
      eneobia,
      zawadiYaManutako,
      findmyrole,
      waveAndGrind,
      waveRide,
      ridePlfatform,
      bakaSongs,
      proofOfVibes,
      crexiTakeHome,
      portfolioV1,
      sampleSportsApp,
      receiptTracker,
      socialUploader,
      pohelaBoishakh,
      sampleEcommerce,
      mkimbe,
      meetupApp,
      nearHackathon,
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
  displayValues:{
    val:string,
    href:string
  }[]=[]
}
