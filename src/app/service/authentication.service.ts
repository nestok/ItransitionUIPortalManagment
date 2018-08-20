import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {LoginRequestDto} from '../dto/LoginRequestDto';
import {LoginResponseDto} from '../dto/LoginResponseDto';
import {InfoService} from './info.service';
import {InfocodesService} from './infocodes.service';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient,
              private infoService: InfoService,
              private infocodesService: InfocodesService,
              private router: Router) {
  }

  login(loginRequestDto: LoginRequestDto) {
    return this.http.post<LoginResponseDto>(`${environment.userServerUrl}auth/login`, loginRequestDto)
      .pipe(map((res: LoginResponseDto) => {
        if (res && res.token) {
          localStorage.setItem('currentUser',
            JSON.stringify({id: res.userId, username: res.username, token: res.token, userRole: res.userRole}));
          this.router.navigate(['/']);
        } else {
          this.infoService.alertInformation(this.infocodesService.ERROR, 'Invalid username or login');
        }
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  activate(code: string) {
    return this.http.get(`${environment.userServerUrl}auth/activate/` + code);
  }

  isAuthorized(): boolean {
    return JSON.parse(localStorage.getItem('currentUser')) !== null;
  }

  isAdmin(): boolean {
    return this.isAuthorized() ? JSON.parse(localStorage.getItem('currentUser')).userRole === 'ROLE_ADMIN' : false;
  }

  getCurrentUsername(): string {
    if (this.isAuthorized()) {
      return JSON.parse(localStorage.getItem('currentUser')).username;
    }
  }

  getCurrentUserId(): number {
    return JSON.parse(localStorage.getItem('currentUser')).id;
  }

  setCurrentUsername(username: string) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    currentUser.username = username;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }

}
