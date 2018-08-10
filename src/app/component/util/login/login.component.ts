import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {AuthenticationService} from '../../../service/index';
import {RegularService} from '../../../service/regular.service';
import {LoginRequestDto} from '../../../dto/LoginRequestDto';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private regularService: RegularService,
    private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(this.usernamePattern())]],
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern())]]
    });
    this.authenticationService.logout();
  }

  get formControl() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (!this.loginForm.invalid) {
      this.loading = true;
      this.authenticationService.login(new LoginRequestDto(this.formControl.username.value, this.formControl.password.value))
        .pipe(first())
        .subscribe(() => {
          this.loading = false;
        });
    }
  }

  usernamePattern(): string {
    return this.regularService.usernamePattern;
  }

  passwordPattern(): string {
    return this.regularService.passwordPattern;
  }
}
