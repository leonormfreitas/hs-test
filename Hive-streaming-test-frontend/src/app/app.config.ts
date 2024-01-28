import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import {DatePipe} from '@angular/common'

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { RequestsService } from './services/requests.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideClientHydration(), 
    importProvidersFrom(HttpClientModule), 
    importProvidersFrom(DatePipe), 
    provideHttpClient(withFetch()), 
    HttpClientModule]
};
