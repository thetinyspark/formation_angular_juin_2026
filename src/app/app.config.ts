import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import routeConfig from './app.routes';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideClientHydration, provideProtractorTestingSupport } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { environment } from '../environments/environment';
import {NgModule} from '@angular/core';
import { catalogInterceptor } from './interceptors/catalog.interceptor';

@NgModule({
  providers: [{provide: APP_BASE_HREF, useValue: environment.baseHref}]
})
class AppModule {}


export const appConfig: ApplicationConfig = {
  providers: [
    provideProtractorTestingSupport(),
    provideRouter(routeConfig), 
    provideClientHydration(), 
    importProvidersFrom(HttpClientModule), 
    importProvidersFrom(AppModule)
  ]
};

if( !environment.production){
  appConfig.providers.push(
    provideHttpClient(withInterceptors([catalogInterceptor]))
  );
}
