import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../service/index';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private authenticationService: AuthenticationService) {

  }

  ngOnInit() {

  }

  isLogin(): boolean {
    return this.authenticationService.isLogin();
  }

  ngOnDestroy(): void {

  }

  isAdmin(): boolean {
    return this.authenticationService.isAdmin();
  }

}
