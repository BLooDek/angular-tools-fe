import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouter } from '@angular/router';
import { isDevMode } from '@angular/core';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';

import { authInterceptor } from './shared/interceptors/logout.interceptor';
import { credentialsInterceptor } from './shared/interceptors/auth.interceptor';
import { authFeature, authReducer } from './shared/reducers/auth.reducer';
import { notesFeature } from './home/reducers/notes.reducer';
import { AuthEffects } from './shared/effects/auth.effects';
import { CoreEffects } from './shared/effects/core.effects';
import { NotesEffects } from './home/effects/notes.effects';
import { tabsFeature } from './home/reducers/tabs.reducer';
import { TabsEffects } from './home/effects/tabs.effects';
import { routes } from './app.routes';
import { metaReducers, reducers } from './reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([credentialsInterceptor, authInterceptor])
    ),

    // provideClientHydration(withEventReplay()),
    provideState(authFeature),
    provideState(tabsFeature),
    provideState(notesFeature),
    provideStore(reducers, { metaReducers }),
    provideEffects([NotesEffects, AuthEffects, CoreEffects, TabsEffects]),

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
