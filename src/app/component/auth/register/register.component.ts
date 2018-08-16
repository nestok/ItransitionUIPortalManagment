import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {UserService, RegularService} from '../../../service/index';
import {InfocodesService} from '../../../service/infocodes.service';
import {InfoService} from '../../../service/info.service';
import {Subscription} from 'rxjs';
import {ErrorDto} from '../../../dto/ErrorDto';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  submitSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private regularService: RegularService,
    private infoCodesService: InfocodesService,
    private infoService: InfoService) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(this.regularService.firstNamePattern)]],
      lastName: ['', [Validators.required, Validators.pattern(this.regularService.lastNamePattern)]],
      username: ['', [Validators.required, Validators.pattern(this.regularService.usernamePattern)]],
      password: ['', [Validators.required, Validators.pattern(this.regularService.passwordPattern)]],
      email: ['', [Validators.required, Validators.pattern(this.regularService.emailPattern)]]
    });
  }

  get formControl() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.submitSubscription = this.userService.register(this.registerForm.value)
      .subscribe(
        () => {
          this.infoService.alertInformation(this.infoCodesService.SUCCESS, 'Successful registration');
          this.loading = false;
          this.router.navigate(['/login']);
        },
        (errorResponse) => {
          this.infoService.alertInformation(this.infoCodesService.ERROR, errorResponse.error);
          this.loading = false;
        });
  }

  ngOnDestroy() {
    this.submitSubscription && this.submitSubscription.unsubscribe();
  }
}
