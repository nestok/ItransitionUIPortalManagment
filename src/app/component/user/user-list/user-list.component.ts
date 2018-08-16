import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../../service/index';
import {first} from 'rxjs/operators';
import {User} from '../../../model/index';
import {Subscription} from 'rxjs';
import {InfocodesService} from '../../../service/infocodes.service';
import {InfoService} from '../../../service/info.service';
import {UserListDto} from '../../../dto/UserListDto';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  users: UserListDto[] = [];
  idDelete: number;
  getUsersSubscription: Subscription;
  deleteUserSubscription: Subscription;

  constructor(
    private userService: UserService,
    private infoCodesService: InfocodesService,
    private infoService: InfoService) {
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  loadAllUsers() {
    this.getUsersSubscription = this.userService.getAll().subscribe((userList: UserListDto[]) => {
        this.users = userList;
      },
      () => {
        this.infoService.alertInformation(this.infoCodesService.ERROR, 'Error loading user-list');
      });
  }

  deleteUser(userId: number) {
    this.deleteUserSubscription = this.userService.delete(userId)
    .subscribe(() => {
      this.loadAllUsers();
    }, (error) => {
        console.log(error);
      });
  }

  ngOnDestroy() {
    this.getUsersSubscription && this.getUsersSubscription.unsubscribe();
    this.deleteUserSubscription && this.deleteUserSubscription.unsubscribe();
  }

}
