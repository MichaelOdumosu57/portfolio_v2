import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MediaPrefixPipe } from './media-prefix.pipe';
import { SanitizedComponent } from './sanitized/sanitized.component';
import { SanitizeUrlPipe } from './sanitize-url.pipe';
import { UpdateInputValDirective } from './update-input-val.directive';
import { PlusMinusComponent } from './plus-minus/plus-minus.component';
import { InventoryComponent } from './inventory/inventory.component';
import { EntryPropertyTypeDirective } from './inventory/directive/entry-property-type.directive';
import { PenroseComponent } from './penrose/penrose.component';

// ngx translate
import {TranslateLoader, TranslateModule,TranslatePipe,TranslateService} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient,HttpClientModule} from '@angular/common/http';
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
}
//


@NgModule({
    declarations: [
        MediaPrefixPipe,
        SanitizedComponent,
        SanitizeUrlPipe,
        PenroseComponent,
        InventoryComponent,
        PlusMinusComponent,
        UpdateInputValDirective,
        EntryPropertyTypeDirective
    ],
    providers:[TranslateService],
    imports: [
        CommonModule,
        SharedRoutingModule,
        TranslateModule.forChild({
            // defaultLanguage: 'en',
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
            isolate:false
        })
    ],
    exports: [
        MediaPrefixPipe,
        SanitizedComponent,
        SanitizeUrlPipe,
        PenroseComponent,
        InventoryComponent,
        PlusMinusComponent,
        UpdateInputValDirective,
        EntryPropertyTypeDirective
    ]
})
export class SharedModule {
    static forRoot(): any {
        return {
            ngModule: SharedModule,
            providers: []
        }
    }
}
