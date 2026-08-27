import {
  Component,
  inject
} from '@angular/core';

import { AsyncPipe } from '@angular/common';

import {
  Store
} from '@ngrx/store';

import {
  User,
  CreateUser
} from '../../models/user.model';

import {
  selectUsers,
  selectLoading,
  selectError
} from '../../store/user.selectors';

import * as UserActions from '../../store/user.actions';

import {
  UserForm
} from '../user-form/user-form';

import * as AuthActions
  from '../../../auth/store/auth.actions';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    AsyncPipe,
    UserForm
  ],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList {

  private readonly store = inject(Store);

  readonly users$ =
    this.store.select(selectUsers);

  readonly loading$ =
    this.store.select(selectLoading);

  readonly error$ =
    this.store.select(selectError);

  showForm = false;

  selectedUser: User | null = null;

  constructor() {

    this.store.dispatch(
      UserActions.loadUsers()
    );
  }

  openAddForm(): void {

    this.selectedUser = null;

    this.showForm = true;
  }

  openEditForm(user: User): void {

    this.selectedUser = user;

    this.showForm = true;
  }

  closeForm(): void {

    this.showForm = false;

    this.selectedUser = null;
  }

  saveUser(user: CreateUser | User): void {

    if (this.selectedUser) {

      this.store.dispatch(
        UserActions.updateUser({
          user: user as User
        })
      );

    } else {

      this.store.dispatch(
        UserActions.addUser({
          user: user as CreateUser
        })
      );
    }

    this.closeForm();
  }

  deleteUser(user: User): void {

  const confirmed = window.confirm(
    `Are you sure you want to delete "${user.username}"?`
  );

  if (!confirmed) {
    return;
  }

  this.store.dispatch(
    UserActions.deleteUser({
      id: user.id
    })
  );
}

logout(): void {

  this.store.dispatch(
    AuthActions.logout()
  );

}
}