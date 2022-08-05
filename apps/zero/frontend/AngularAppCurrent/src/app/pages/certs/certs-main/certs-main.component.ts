// angular
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';


// services
import { ConfigService } from '@app/core/config/config.service';
import { UtilityService } from '@app/core/utility/utility.service';
import { BaseService } from '@core/base/base.service';

// rxjs
import { Subject } from 'rxjs';

// misc
import { CONFIG } from '@app/core/config/configs';

// wml-components
import { WMLUIProperty } from '@shared/wml-components/models';

@Component({
  selector: 'certs-main',
  templateUrl: './certs-main.component.html',
  styleUrls: ['./certs-main.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class CertsMainComponent  {

  constructor(
    private cdref:ChangeDetectorRef,
    private utilService:UtilityService,
    private configService:ConfigService,
    private baseService:BaseService,
    private router:Router
  ) { }
  classPrefix = this.utilService.generateClassPrefix(CONFIG.classPrefix.certsMain)
  @HostBinding('class') myClass: string = this.classPrefix(`View`);
  ngUnsub= new Subject<void>() 

  
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
      displayTitle:  "certsMain.awsTitles."+index0
    })
  })

  codecademyCertCards:CertCard[] = Array(5)
  .fill(null)
  .map((nullVal,index0)=>{
    return new CertCard({
      imgSrc:`assets/media/codecademy_${index0}.PNG`,
      imgAlt:  "certsMain.codecademyImgAlts."+index0,
      displayTitle:  "certsMain.codecademyTitles."+index0      
    })
  })

  courseraCertCards:CertCard[] = Array(6)
  .fill(null)
  .map((nullVal,index0)=>{
    return new CertCard({
      imgSrc:`assets/media/coursera_${index0}.PNG`,
      imgAlt:  "certsMain.courseraImgAlts."+index0,
      displayTitle:  "certsMain.courseraTitles."+index0      
    })
  })

  gcpCertCards:CertCard[] = Array(4)
  .fill(null)
  .map((nullVal,index0)=>{
    return new CertCard({
      imgSrc:`assets/media/gcp_${index0}.PNG`,
      imgAlt:  "certsMain.gcpImgAlts."+index0,
      displayTitle:  "certsMain.gcpTitles."+index0      
    })
  })

  pluralSightCertCards:CertCard[] = Array(7)
  .fill(null)
  .map((nullVal,index0)=>{
    return new CertCard({
      imgSrc:`assets/media/pluralSight (${index0}).PNG`,
      imgAlt:  "certsMain.pluralSightImgAlts."+index0,
      displayTitle:  "certsMain.pluralSightTitles."+index0      
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