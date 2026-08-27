import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login')
        .then(component => component.Login)
  },

//   {
//     path: 'users',
//     canActivate: [authGuard],
//     loadComponent: () =>
//       import(
//         './features/users/components/user-list/user-list'
//       ).then(component => component.UserList)
//   },
{
  path: 'users',
  loadComponent: () =>
    import(
      './features/users/components/user-list/user-list'
    ).then(component => component.UserList)
},

  {
    path: '**',
    redirectTo: 'login'
  }

];