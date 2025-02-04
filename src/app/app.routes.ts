import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { redirectIfAuthenticateGuard } from './guards/redirect-if-authenticate.guard';
import { CollectionRequestComponent } from './components/collection-request/collection-request.component';

export const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent  , canActivate: [redirectIfAuthenticateGuard] },
  { path: 'signup', component: SignupComponent , canActivate: [redirectIfAuthenticateGuard] },

  { path: 'dashboard', component: DashboardComponent , canActivate: [authGuard]},
  { path: 'home', component: HomeComponent , canActivate: [authGuard]},
  { path: 'collection-request', component: CollectionRequestComponent , canActivate: [authGuard]},

];
