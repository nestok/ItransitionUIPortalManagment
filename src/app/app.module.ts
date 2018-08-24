import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserModule} from '@angular/platform-browser';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppComponent} from './app.component';
import {routing} from './app.routing';
import {AdminGuard} from './util/guards';
import {JwtInterceptor} from './util/helpers';
import {AuthenticationService, UserService} from './service';
import {HeaderComponent} from './component/shared/header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './component/auth/login/login.component';
import {HomeComponent} from './component/home/home.component';
import {UserListComponent} from './component/user/user-list/user-list.component';
import {RegularService} from './service/regular.service';
import {RegisterComponent} from './component/auth/register/register.component';
import {InfocodesService} from './service/infocodes.service';
import {InfoService} from './service/info.service';
import {ToastrModule} from 'ngx-toastr';
import {ReplyService} from './service/reply.service';
import { ReplyAddComponent } from './component/reply/reply-add/reply-add.component';
import { ReplyInfoManagementComponent } from './component/reply/reply-info-management/reply-info-management.component';
import { DeleteConfirmationDialogComponent } from './component/shared/delete-confirmation-dialog/delete-confirmation-dialog.component';
import {AuthorizedGuard} from './util/guards/authorized.guard';
import { TeamStatusComponent } from './component/reply/team-status/team-status.component';
import { Exception404Component } from './component/exception/exception404/exception404.component';


@NgModule({
  imports: [
    ToastrModule.forRoot(),
    NgbModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    routing
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    UserListComponent,
    RegisterComponent,
    ReplyAddComponent,
    ReplyInfoManagementComponent,
    DeleteConfirmationDialogComponent,
    TeamStatusComponent,
    Exception404Component
  ],
  schemas: [],
  providers: [
    AdminGuard,
    AuthorizedGuard,
    AuthenticationService,
    RegularService,
    InfocodesService,
    InfoService,
    ReplyService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ DeleteConfirmationDialogComponent ]
})

export class AppModule {
}
