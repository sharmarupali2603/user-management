import {
  Component,
  inject
} from '@angular/core';

import {
  AsyncPipe
} from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Router
} from '@angular/router';

import {
  Store
} from '@ngrx/store';

import {
  selectAuthError,
  selectAuthLoading,
  selectIsAuthenticated
} from '../store/auth.selectors';

import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private readonly fb = inject(FormBuilder);

  private readonly store = inject(Store);

  private readonly router = inject(Router);

  readonly loading$ =
    this.store.select(selectAuthLoading);

  readonly error$ =
    this.store.select(selectAuthError);

  readonly isAuthenticated$ =
    this.store.select(selectIsAuthenticated);

  readonly loginForm =
    this.fb.nonNullable.group({

      username: [
        '',
        [
          Validators.required
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]

    });

  constructor() {

    this.isAuthenticated$
      .subscribe(isAuthenticated => {

        if (isAuthenticated) {
          this.router.navigate(['/users']);
        }

      });

  }

  onSubmit(): void {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;
    }

    this.store.dispatch(
      AuthActions.login({
        credentials: this.loginForm.getRawValue()
      })
    );
  }
}