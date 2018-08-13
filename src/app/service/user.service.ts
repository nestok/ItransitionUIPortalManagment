import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../model';
import {UserListDto} from '../dto/UserListDto';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<UserListDto[]>(`${environment.userServerUrl}user/loadAll`);
  }

  register(user: User) {
    return this.http.post(`${environment.userServerUrl}user/register`, user);
  }

  delete(id: number) {
    return this.http.delete(`${environment.userServerUrl}user/delete/` + id);
  }

}
