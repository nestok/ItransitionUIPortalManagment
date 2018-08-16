import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AuthenticationService} from '../../../service/index';
import {RegularService} from '../../../service/regular.service';
import {LoginRequestDto} from '../../../dto/LoginRequestDto';
import {Subscription} from 'rxjs';
import {InfocodesService} from '../../../service/infocodes.service';
import {InfoService} from '../../../service/info.service';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  submitSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private infoService: InfoService,
    private infoCodesService: InfocodesService,
    private regularService: RegularService,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(this.getUsernamePattern())]],
      password: ['', [Validators.required, Validators.pattern(this.getPasswordPattern())]]
    });
    this.authenticationService.logout();
  }

  get formControl() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.loginForm.invalid) {
      this.loading = true;
      this.submitSubscription = this.authenticationService.login(new LoginRequestDto(this.formControl.username.value, this.formControl.password.value))
        .subscribe(() => {
            this.loading = false;
          },
          (errorResponse) => {
            this.infoService.alertInformation(this.infoCodesService.ERROR, errorResponse.error);
            this.loading = false;
          }
        );
    }
  }

  getUsernamePattern(): string {
    return this.regularService.usernamePattern;
  }

  getPasswordPattern(): string {
    return this.regularService.passwordPattern;
  }

  ngOnDestroy() {
    this.submitSubscription && this.submitSubscription.unsubscribe();
  }
}
