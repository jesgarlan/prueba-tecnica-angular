import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ThemeModule } from './@theme/theme.module';
import { CoreModule } from './@core/core.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { registerLocaleData } from '@angular/common';
import { TranslationService } from './@core/services/translation.service';
import localeEs from '@angular/common/locales/es';
import { HttpLoaderFactory, translationInitializer } from './@core/services/Translate';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }
    })
  ],
  exports: [TranslateModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' },
    {
      provide: APP_INITIALIZER,
      useFactory: translationInitializer,
      deps: [TranslationService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
