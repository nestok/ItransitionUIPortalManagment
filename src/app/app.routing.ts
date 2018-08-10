import {RouterModule, Routes} from '@angular/router';

import {AdminGuard} from './util/guards';
import {LoginComponent} from './component/auth/login/login.component';
import {HomeComponent} from './component/home/home.component';
import {UserListComponent} from './component/user/user-list/user-list.component';
import {RegisterComponent} from './component/auth/register/register.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'auth/activate/:code', component: LoginComponent},
  {path: 'users', component: UserListComponent},
  {path: '**', redirectTo: 'exception404'}
];

export const routing = RouterModule.forRoot(appRoutes);
