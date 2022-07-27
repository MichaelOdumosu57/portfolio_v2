// angular
import { LowerCasePipe, TitleCasePipe } from '@angular/common';
import { Injectable } from '@angular/core';

// i18n
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    private translateService: TranslateService
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
    return this.translateService.get(value)
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

  makeLowerCase = new LowerCasePipe().transform
  makeTitleCase = new TitleCasePipe().transform
}
