import {RouterModule, Routes} from '@angular/router';

import {AdminGuard} from './util/guards';
import {LoginComponent} from './component/auth/login/login.component';
import {HomeComponent} from './component/home/home.component';
import {UserListComponent} from './component/user/user-list/user-list.component';
import {RegisterComponent} from './component/auth/register/register.component';
import {ReplyAddComponent} from './component/reply/reply-add/reply-add.component';
import {ReplyInfoManagementComponent} from './component/reply/reply-info-management/reply-info-management.component';
import {AuthorizedGuard} from './util/guards/authorized.guard';
import {TeamStatusComponent} from './component/reply/team-status/team-status.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'add-reply', component: ReplyAddComponent, canActivate: [AuthorizedGuard]},
  {path: 'users', component: UserListComponent, canActivate: [AdminGuard]},
  {path: 'reply-configure', component: ReplyInfoManagementComponent, canActivate: [AdminGuard]},
  {path: 'team-status', component: TeamStatusComponent, canActivate: [AuthorizedGuard]},
  {path: '**', redirectTo: 'exception404'}
];

export const routing = RouterModule.forRoot(appRoutes);
