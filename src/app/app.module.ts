import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import {AdminGuard} from './auth/guards';
import { JwtInterceptor } from './auth/helpers';
import {  AuthenticationService, UserService } from './service';
import { HeaderComponent } from './component/shared/header/header.component';
import {AccordionModule} from 'primeng/accordion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './component/util/login/login.component';
import {HomeComponent} from './component/home/home.component';
import { UserListComponent } from './component/user/user-list/user-list.component';
import {RegularService} from './service/regular.service';
import {RegisterComponent} from './component/util/register/register.component';
import {ErrorService} from './service/error.service';


@NgModule({
    imports: [
        BrowserAnimationsModule,
        NgbModule.forRoot(),
        BrowserModule,
        AccordionModule,
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
        RegisterComponent
    ],
  schemas: [],
    providers: [
        AdminGuard,
        AuthenticationService,
        RegularService,
        ErrorService,
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
