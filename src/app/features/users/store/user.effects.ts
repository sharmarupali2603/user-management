import {
  Injectable,
  inject
} from '@angular/core';

import {
  Actions,
  createEffect,
  ofType
} from '@ngrx/effects';

import {
  catchError,
  map,
  mergeMap,
  of
} from 'rxjs';

import {
  UserService} from '../../../core/services/user';

import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {

  private readonly actions$ = inject(Actions);

  private readonly userService =
    inject(UserService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(

      ofType(UserActions.loadUsers),

      mergeMap(() =>
        this.userService.getUsers().pipe(

          map(users =>
            UserActions.loadUsersSuccess({ users })
          ),

          catchError(error =>
            of(
              UserActions.loadUsersFailure({
                error: this.getErrorMessage(error)
              })
            )
          )
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(

      ofType(UserActions.addUser),

      mergeMap(({ user }) =>
        this.userService.addUser(user).pipe(

          map(createdUser =>
            UserActions.addUserSuccess({
              user: createdUser
            })
          ),

          catchError(error =>
            of(
              UserActions.addUserFailure({
                error: this.getErrorMessage(error)
              })
            )
          )
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(

      ofType(UserActions.updateUser),

      mergeMap(({ user }) =>
        this.userService.updateUser(user).pipe(

          map(updatedUser =>
            UserActions.updateUserSuccess({
              user: updatedUser
            })
          ),

          catchError(error =>
            of(
              UserActions.updateUserFailure({
                error: this.getErrorMessage(error)
              })
            )
          )
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(

      ofType(UserActions.deleteUser),

      mergeMap(({ id }) =>
        this.userService.deleteUser(id).pipe(

          map(() =>
            UserActions.deleteUserSuccess({ id })
          ),

          catchError(error =>
            of(
              UserActions.deleteUserFailure({
                error: this.getErrorMessage(error)
              })
            )
          )
        )
      )
    )
  );

  private getErrorMessage(error: unknown): string {

    if (
      typeof error === 'object' &&
      error !== null &&
      'message' in error
    ) {
      return String(
        (error as { message: unknown }).message
      );
    }

    return 'Something went wrong. Please try again.';
  }
}