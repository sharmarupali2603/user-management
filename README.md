# User Management Module

A simple User Management application built with Angular and NgRx, with JSON Server used as a simulated REST API backend.

The application provides mock authentication and complete user CRUD functionality.

## Features

### Authentication

- Mock username/password login
- Login form validation
- Authentication state managed using NgRx
- Protected User Management route using an Angular route guard
- Logout functionality
- Redirect to login when an unauthenticated user attempts to access the dashboard

### User Management

- Fetch users from JSON Server
- Display users in a responsive table
- Add a new user
- Edit an existing user
- Delete a user
- Numeric sequential user IDs
- Job role selection
- Reactive form validation
- Loading states
- Error handling
- Empty-state handling

### State Management

NgRx is used for application state management.

The implementation includes:

- Actions
- Reducers
- Effects
- Selectors
- Store

All user-related API operations are handled through NgRx effects and services rather than directly from the UI components.

## Technology Stack

- Angular 22
- TypeScript
- NgRx 22
- RxJS
- JSON Server
- HTML
- CSS
- Angular Reactive Forms
- Git / GitHub

Nx was not used because it is optional in the assignment requirements.

## Project Structure

```text
src/
└── app/
    ├── core/
    │   └── guards/
    │       └── auth.guard.ts
    │
    ├── features/
    │   ├── auth/
    │   │   ├── login/
    │   │   └── store/
    │   │       ├── auth.actions.ts
    │   │       ├── auth.effects.ts
    │   │       ├── auth.reducer.ts
    │   │       └── auth.selectors.ts
    │   │
    │   └── users/
    │       ├── components/
    │       │   ├── user-list/
    │       │   └── user-form/
    │       │
    │       ├── models/
    │       │   └── user.model.ts
    │       │
    │       ├── services/
    │       │   └── user.service.ts
    │       │
    │       └── store/
    │           ├── user.actions.ts
    │           ├── user.effects.ts
    │           ├── user.reducer.ts
    │           └── user.selectors.ts
    │
    ├── app.config.ts
    ├── app.routes.ts
    ├── app.ts
    └── app.html

db.json
package.json
README.md