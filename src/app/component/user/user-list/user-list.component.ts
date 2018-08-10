import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../service/index';
import {first} from 'rxjs/operators';
import {User} from '../../../model/index';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAll().pipe(first()).subscribe((data: User[]) => {
        this.users = data;
      },
      () => {
        console.log('Hana rylu');
      });
  }

}
