
import { Routes } from '@angular/router';

import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Assignments } from './components/assignments/assignments';
import { Submit } from './components/submit/submit';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login',       component: Login },
  { path: 'register',    component: Register },
  { path: 'assignments', component: Assignments },
  { path: 'submit',      component: Submit },

  { path: '**', redirectTo: 'login' } // ** match anything
];