import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../model';
import {ErrorDto} from '../dto/ErrorDto';

@Injectable()
export class UserService   {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${environment.userServerUrl}users`);
  }

  register(user: User) {
    return this.http.post<ErrorDto>(`${environment.userServerUrl}register`, user);
  }

}
