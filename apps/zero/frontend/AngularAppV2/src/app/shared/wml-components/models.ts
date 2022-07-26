import { ChangeDetectorRef } from "@angular/core";

export class WMLView {
  constructor(params?:Partial<WMLView>){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }

  isPresent:boolean = true
  cdref?:ChangeDetectorRef
}

export class WMLWrapper {
  constructor(params:Partial<WMLWrapper> = {}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
  view:WMLView =new WMLView()
}
