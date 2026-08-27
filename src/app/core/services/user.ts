import { Injectable, inject } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable,
  map,
  switchMap
} from 'rxjs';

import {
  User,
  CreateUser
} from '../../features/users/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl =
    'http://localhost:3000/users';

  getUsers(): Observable<User[]> {

    return this.http.get<User[]>(
      this.apiUrl
    );
  }

  addUser(user: CreateUser): Observable<User> {

    return this.getUsers().pipe(

      map(users => {

        const maxId = users.length
          ? Math.max(
              ...users.map(user => Number(user.id))
            )
          : 0;

        const newUser: User = {
          id: maxId + 1,
          username: user.username,
          email: user.email,
          'job-role': user['job-role']
        };

        return newUser;
      }),

      switchMap(newUser =>
        this.http.post<User>(
          this.apiUrl,
          newUser
        )
      )
    );
  }

  updateUser(user: User): Observable<User> {

    return this.http.put<User>(
      `${this.apiUrl}/${user.id}`,
      user
    );
  }

  deleteUser(id: number): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    );
  }
}
