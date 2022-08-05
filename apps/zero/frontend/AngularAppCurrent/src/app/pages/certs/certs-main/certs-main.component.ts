// angular
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


// services
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';
import { BaseService } from '@core/base/base.service';

// rxjs
import { Subject, timer } from 'rxjs';
import { takeUntil,tap } from 'rxjs/operators';

// misc
import { CONFIG } from '@app/core/config/configs';

// wml-components
import { WMLButton, WMLUIProperty } from '@shared/wml-components/models';
import { AutomationService } from '@helpers/automation/automation/automation.service';

@Component({
  selector: 'certs-main',
  templateUrl: './certs-main.component.html',
  styleUrls: ['./certs-main.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class CertsMainComponent   {

  constructor(
    private cdref:ChangeDetectorRef,
    private utilService:UtilityService,
    private configService:ConfigService,
    private baseService:BaseService,
    private router:Router,
    private automationService:AutomationService
  
  ) { }
  classPrefix = this.utilService.generateClassPrefix(CONFIG.classPrefix.certsMain)
  @HostBinding('class') myClass: string = this.classPrefix(`View`);

  ngUnsub= new Subject<void>();
  
  certViewerImgSrc = ""
  certViewerImgAlt = ""
  certViewerView = new WMLUIProperty({isPresent:false})
  certViewerCard = new WMLUIProperty({class:this.classPrefix('Pod2Item0')})
  closeCertViewerWasTriggered = false
  
  certViewerCardTransitionend = (evt:Event)=>{
    evt.stopPropagation()
    if(this.closeCertViewerWasTriggered){
      this.certViewerView.isPresent = false;
      this.cdref.detectChanges();
      this.closeCertViewerWasTriggered = false
    }

  }
  openCertViewer =(evt:Event,card:CertCard)=> {
    evt.stopPropagation()
    this.certViewerView.isPresent = true;
    
    this.cdref.detectChanges();
    timer(1000)
      .pipe(
        takeUntil(this.ngUnsub),
        tap(() => {
          
          this.certViewerImgSrc = card.imgSrc
          this.certViewerImgAlt = card.imgAlt          
          this.certViewerCard.class = this.classPrefix('Pod2Item1')
          this.certViewerCard.style.height = "100%";
          this.certViewerCard.style.width = "100%";
          this.cdref.detectChanges();
        })
      )
      .subscribe()
  }

  closeCertViewer =(evt:Event)=> {
    
    evt.stopPropagation()
    this.closeCertViewerWasTriggered = true;
    this.certViewerCard.class = this.classPrefix('Pod2Item0')
    this.certViewerCard.style.height = "1%";
    this.certViewerCard.style.width = "1%";
    this.cdref.detectChanges();

  } 

  backButton = new WMLButton({
    text:new WMLUIProperty({
      value:"certsMain.backTextValue"
    }),
    button:new WMLUIProperty({
      click:(evt:Event)=>{
        this.utilService.clearArray(this.displayCards)
        this.displayCards.push(...this.certCards);
        this.backButton.button.isPresent = false
        this.cdref.detectChanges()        
      },
      isPresent:false
    })
  })
  certCards:CertCard[] = Array(5)
  .fill(null)
  .map((nullVal,index0)=>{
    return new CertCard({
      imgSrc:[
        "assets/media/certs_0.png",
        "assets/media/certs_1.png",
        "assets/media/certs_2.png",
        "assets/media/certs_3.png",
        "assets/media/certs_4.jfif",
      ][index0],
      imgAlt:"certsMain.cardsImgAlts."+index0,
      displayTitle:"certsMain.cardTitles."+index0,
      title:CONFIG.certsMain.categories[index0],
      click:(evt,card)=>{
        this.utilService.clearArray(this.displayCards)
        this.displayCards.push(...this.certCategory[card.title]);
        this.backButton.button.isPresent = true
        this.cdref.detectChanges()

      }
    })
  })
  displayCards:CertCard[] =[]

  awsCertCards:CertCard[] = Array(3)
  .fill(null)
  .map((nullVal,index0)=>{
    return new CertCard({
      imgSrc:`assets/media/aws_${index0}.PNG`,
      imgAlt:  "certsMain.awsImgAlts."+index0,
      displayTitle:  "certsMain.awsTitles."+index0,
      click:this.openCertViewer
    })
  })

  codecademyCertCards:CertCard[] = Array(5)
  .fill(null)
  .map((nullVal,index0)=>{
    return new CertCard({
      imgSrc:`assets/media/codecademy_${index0}.PNG`,
      imgAlt:  "certsMain.codecademyImgAlts."+index0,
      displayTitle:  "certsMain.codecademyTitles."+index0,
      click:this.openCertViewer      
    })
  })

  courseraCertCards:CertCard[] = Array(6)
  .fill(null)
  .map((nullVal,index0)=>{
    return new CertCard({
      imgSrc:`assets/media/coursera_${index0}.PNG`,
      imgAlt:  "certsMain.courseraImgAlts."+index0,
      displayTitle:  "certsMain.courseraTitles."+index0,
      click:this.openCertViewer      
    })
  })

  gcpCertCards:CertCard[] = Array(4)
  .fill(null)
  .map((nullVal,index0)=>{
    return new CertCard({
      imgSrc:`assets/media/gcp_${index0}.PNG`,
      imgAlt:  "certsMain.gcpImgAlts."+index0,
      displayTitle:  "certsMain.gcpTitles."+index0,
      click:this.openCertViewer
    })
  })

  pluralSightCertCards:CertCard[] = Array(7)
  .fill(null)
  .map((nullVal,index0)=>{
    return new CertCard({
      imgSrc:`assets/media/pluralSight (${index0}).PNG`,
      imgAlt:  "certsMain.pluralSightImgAlts."+index0,
      displayTitle:  "certsMain.pluralSightTitles."+index0,
      click:this.openCertViewer  
    })
  })  

  certCategory = {
    [CONFIG.certsMain.categories[0]]:this.awsCertCards,
    [CONFIG.certsMain.categories[1]]:this.codecademyCertCards,
    [CONFIG.certsMain.categories[2]]:this.courseraCertCards,
    [CONFIG.certsMain.categories[3]]:this.gcpCertCards,
    [CONFIG.certsMain.categories[4]]:this.pluralSightCertCards,
  }



  ngOnInit(): void {
    this.initDisplayCards();

  }

  ngAfterViewInit(): void {
    // this.automationService.openCertViewer()
  }



  initDisplayCards() {
    this.displayCards.push(...this.certCards);
    this.cdref.detectChanges();
  }

  ngOnDestroy(){
    this.ngUnsub.next();
    this.ngUnsub.complete()
  }  

}


class CertCard{
  constructor(params:Partial<CertCard>={}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }

  imgSrc:string = ""
  imgAlt:string = ""
  title:string= ""
  displayTitle:string = "Title"
  subtitle:string = "SubTitile"
  description:string = "Description"  
  click:(evt:Event,card:CertCard)=>void = (evt,card)=>{}
}