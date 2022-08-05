import { ChangeDetectorRef } from "@angular/core";



export class WMLUIProperty{
  constructor(params:Partial<WMLUIProperty> = {}){
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
  isPresent:boolean = true 
  value:string = ""
  class?:string = ""
  style:Partial<CSSStyleDeclaration> = {}
  type?:any
  click?:(evt:Event)=> void = (evt?:Event)=>{
    evt?.stopImmediatePropagation()
  }
}


export class WMLView extends WMLUIProperty{ 
  constructor(params:Partial<WMLView> ={}){
    super();
    Object.assign(
      this,
      {
        ...params
      }
    )
  }

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


export class WMLButton extends WMLWrapper {
  constructor(params:Partial<WMLButton> = {}){
    super()
    Object.assign(
      this,
      {
        ...params
      }
    )
  }
  button = new WMLUIProperty();
  text = new WMLUIProperty();
  icon = new WMLUIProperty();

}