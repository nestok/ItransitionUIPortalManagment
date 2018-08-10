import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../../service/index';
import {first} from 'rxjs/operators';
import {User} from '../../../model/index';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  users: User[] = [];
  getUsersSubscription: Subscription;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getUsersSubscription = this.userService.getAll().pipe(first()).subscribe((userList: User[]) => {
        this.users = userList;
      },
      () => {
        console.log('Хана рулю');
      });
  }

  ngOnDestroy() {
    this.getUsersSubscription && this.getUsersSubscription.unsubscribe();
  }

}
