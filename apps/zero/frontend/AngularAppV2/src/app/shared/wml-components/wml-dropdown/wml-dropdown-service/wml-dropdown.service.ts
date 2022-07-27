import { Injectable } from '@angular/core';
import { WmlDropdownOptionsMeta } from '../wml-dropdown-option/wml-dropdown-option.component';

@Injectable({
  providedIn: 'root'
})
export class WmlDropdownService {

  constructor() { }

  pullAllDropdownOptions(options:WmlDropdownOptionsMeta[]){
    let allOptions:WmlDropdownOptionsMeta[] = [] 
    options.forEach((option)=>{
      allOptions.push(option)
      allOptions.push(...this.pullAllDropdownOptions(option.children.options))
    })

    return allOptions
  }
}
