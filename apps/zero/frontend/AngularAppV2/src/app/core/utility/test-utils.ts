// angular
import { NO_ERRORS_SCHEMA, Type } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

// i18n
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { Subject } from "rxjs";

export  let mockTranslateService = {
  get:()=> new Subject(),
  onTranslationChange:new Subject(),
  onLangChange:new Subject(),
  onDefaultLangChange:new Subject(),
}
export let configureTestingModuleForComponents = async (
  targetCpnt:Type<any>,
  providers:Partial<{
    mockTranslateService:any
  }> = {}
)=>{
  await TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      TranslateModule
    ],
    declarations: [
      targetCpnt
    ],
    providers:[
      {provide:TranslateService,useValue:providers.mockTranslateService}
    ],
    schemas:[
      NO_ERRORS_SCHEMA
    ]

  }).compileComponents();

  
}

export let configureTestingModuleForServices =  (
  targetService:Function,
  providers:Partial<{
    mockTranslateService:any
  }> = {}
)=>{
  TestBed.configureTestingModule({
    providers:[
      {provide:TranslateService,useValue:providers.mockTranslateService}
    ],
  })

  let service = TestBed.inject(targetService);
  return service
  
}

export function grabComponentInstance(targetCpnt: Type<any>) {
  let fixture = TestBed.createComponent(targetCpnt);
  let cpnt = fixture.componentInstance;
  return { fixture,  cpnt };
}
