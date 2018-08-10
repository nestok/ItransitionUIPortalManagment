import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {LoginRequestDto} from '../dto/LoginRequestDto';
import {LoginResponseDto} from '../dto/LoginResponseDto';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient,
              private router: Router) {
  }

  login(loginRequestDto: LoginRequestDto) {
    return this.http.post<LoginResponseDto>(`${environment.userServerUrl}auth/login`, loginRequestDto)
      .pipe(map((res: LoginResponseDto) => {
        if (res && res.token) {
          localStorage.setItem('currentUser',
            JSON.stringify({id: res.userId, username: res.username, token: res.token, userRole: res.userRole}));
          this.router.navigate(['/']);
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

  isLogin(): boolean {
    return JSON.parse(localStorage.getItem('currentUser')) !== null;
  }

  isAdmin(): boolean {
    return this.isLogin() ? JSON.parse(localStorage.getItem('currentUser')).userRole === 'ROLE_ADMIN' : false;
  }

  getCurrentUsername(): string {
    if (this.isLogin()) {
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
