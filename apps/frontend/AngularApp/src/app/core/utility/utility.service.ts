// angular
import { LowerCasePipe, TitleCasePipe } from '@angular/common';
import { Injectable } from '@angular/core';

// i18n
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',

})
export class UtilityService {

  constructor(
    public translateService: TranslateService,

  ) { }


  generateRandomNumber = (range: number = 100, additional: number = 0) => {
    return Math.floor(Math.random() * range) + additional
  }

  generateRandomColor = () => {
    return `#${this.generateRandomNumber(0xFFFFFF).toString(16)}`
  }

  selectRandomOptionFromArray = (myArray: Array<any>, index?: number) => {
    return myArray[this.generateRandomNumber(index ?? myArray.length)]
  }

  getValueByi18nKey = (value: string) => {


    return value 
  }

  changeLanguage(langCode:string){
    this.translateService.use(langCode)
  }


  async waitForTranslationsToLoad() {
    return lastValueFrom(this.translateService.use('en'));
  }

  eventDispatcher(event: string, element: HTMLElement | Window | Element) {

    try {
      let eventModern = new Event(event)
      element.dispatchEvent(eventModern)
    }
    catch (e) {
      let eventLegacy = document.createEvent("Event");
      eventLegacy.initEvent(event, false, true);
      element.dispatchEvent(eventLegacy)
    }
  }

  numberParse(dimension: any /* string or array */): number {

    if (typeof dimension === "string") {
      return parseFloat(dimension.split("p")[0])
    }
    else {
      return dimension
        .map((x: string) => {
          return parseFloat(x.split("p")[0])
        })
    }
  }
  generateClassPrefix(prefix:string) {
    return (val: string) => {
      return prefix + val
    }
  }



  clearArray(A: Array<any>) {
    A.splice(0,A.length)
  }

  makeLowerCase = new LowerCasePipe().transform
  makeTitleCase = new TitleCasePipe().transform
}
