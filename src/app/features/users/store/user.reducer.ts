import {
  createReducer,
  on
} from '@ngrx/store';

import {
  User
} from '../models/user.model';

import * as UserActions from './user.actions';

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export const initialUserState: UserState = {
  users: [],
  loading: false,
  error: null
};

export const userReducer = createReducer(

  initialUserState,

  on(
    UserActions.loadUsers,
    state => ({
      ...state,
      loading: true,
      error: null
    })
  ),

  on(
    UserActions.loadUsersSuccess,
    (state, { users }) => ({
      ...state,
      users,
      loading: false
    })
  ),

  on(
    UserActions.loadUsersFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error
    })
  ),

  on(
    UserActions.addUserSuccess,
    (state, { user }) => ({
      ...state,
      users: [...state.users, user]
    })
  ),

  on(
    UserActions.updateUserSuccess,
    (state, { user }) => ({
      ...state,
      users: state.users.map(existingUser =>
        existingUser.id === user.id
          ? user
          : existingUser
      )
    })
  ),

  on(
    UserActions.deleteUserSuccess,
    (state, { id }) => ({
      ...state,
      users: state.users.filter(user => user.id !== id)
    })
  )
);