// angular
import { NgModule,APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient } from '@angular/common/http';


// misc
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { environment as env } from '@environment/environment';
import { HomeMainComponent } from './pages/home/home-main/home-main.component';

// i18n
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CONFIG } from '@core/config/configs';





if (env.production) {

  Object.entries(console)
  .forEach((x, i) => {
      let [key, val] = x
      if (typeof val === "function") {
          ((console as any)[key] as any) = () => { }
      }
  })
}



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}



function waitFori18nextToLoad(translateService: TranslateService): () => Observable<any> {
  return () => {
    
    return translateService.use('en')

  }

 }

@NgModule({
  declarations: [
    AppComponent,
    HomeMainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
    }
  })
  ],

  providers: [{
    provide: APP_INITIALIZER,
    useFactory: waitFori18nextToLoad,
    deps:[TranslateService],
    multi: true
   }],
  bootstrap: [AppComponent]
})
export class AppModule {  }
