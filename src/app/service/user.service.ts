import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../model';
import {UserListDto} from '../dto/UserListDto';
import {UserAddDto} from '../dto/UserAddDto';
import {ContributorsListDto} from '../dto/ContributorsListDto';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<UserListDto[]>(`${environment.userServerUrl}user/loadAll`);
  }

  getAllContributors() {
    return this.http.get<ContributorsListDto[]>(`${environment.userServerUrl}user/loadAllContributors`);
  }

  register(user: UserAddDto) {
    return this.http.post(`${environment.userServerUrl}user/register`, user);
  }

  delete(id: number) {
    return this.http.delete(`${environment.userServerUrl}user/delete/` + id);
  }

}
