import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  // providers: [
  //   provideZoneChangeDetection({ eventCoalescing: true }), 
  //   provideRouter(routes),
  //   provideClientHydration()]
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    CookieService
  ]
};
