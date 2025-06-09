import { isDevMode } from '@angular/core';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideState, provideStore } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './shared/effects/auth.effects';
import { CoreEffects } from './shared/effects/core.effects';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { credentialsInterceptor } from './shared/interceptors/auth.interceptor';
import { authFeature, authReducer } from './shared/reducers/auth.reducer';
import { tabsFeature } from './home/reducers/tabs.reducer';
import { TabsEffects } from './home/effects/tabs.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([credentialsInterceptor])),

    // provideClientHydration(withEventReplay()),
    provideState(authFeature),
    provideState(tabsFeature),
    provideStore(reducers, { metaReducers }),
    provideEffects(AuthEffects, CoreEffects, TabsEffects),

    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),
  ],
};
