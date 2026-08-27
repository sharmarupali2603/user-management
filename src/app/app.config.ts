import { ApplicationConfig } from '@angular/core';

import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';

import { provideStore } from '@ngrx/store';

import { provideEffects } from '@ngrx/effects';

import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';

import {
  userReducer
} from './features/users/store/user.reducer';

import {
  UserEffects
} from './features/users/store/user.effects';

import {
  authReducer
} from './features/auth/store/auth.reducer';

import {
  AuthEffects
} from './features/auth/store/auth.effects';

export const appConfig: ApplicationConfig = {

  providers: [

    provideRouter(routes),

    provideHttpClient(),

    provideStore({
      auth: authReducer,
      users: userReducer
    }),

    provideEffects([
      UserEffects,
      AuthEffects
    ]),

    provideStoreDevtools({
      maxAge: 25
    })
  ]
};