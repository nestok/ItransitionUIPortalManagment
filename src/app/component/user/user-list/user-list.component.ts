import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../../service/index';
import {Subscription} from 'rxjs';
import {InfocodesService} from '../../../service/infocodes.service';
import {InfoService} from '../../../service/info.service';
import {UserListDto} from '../../../dto/UserListDto';
import {ConfirmationDialogService} from '../../shared/delete-confirmation-dialog/confirmation-dialog.service';
import {forEach} from '@angular/router/src/utils/collection';

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
    private infoService: InfoService,
    private confirmationDialogService: ConfirmationDialogService) {
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  loadAllUsers() {
    this.getUsersSubscription = this.userService.getAll().subscribe((userList: UserListDto[]) => {
        this.users = userList;
        for (let user of this.users) {
          user.role = this.userService.transformRoleToView(user.role);
        }
      },
      () => {
        this.infoService.alertInformation(this.infoCodesService.ERROR, 'Error loading user-list');
      });
  }

  openDeleteConfirmationDialog() {
    this.confirmationDialogService.confirm('Do you really want to delete this user?')
      .then(
        () => this.deleteUser(this.idDelete))
      .catch(() => null);
  }

  deleteUser(userId: number) {
    this.deleteUserSubscription = this.userService.delete(userId)
      .subscribe(() => {
        this.loadAllUsers();
      }, (errorResponse) => {
        this.infoService.alertInformation(this.infoCodesService.ERROR, errorResponse.error);
      });
  }

  ngOnDestroy() {
    this.getUsersSubscription && this.getUsersSubscription.unsubscribe();
    this.deleteUserSubscription && this.deleteUserSubscription.unsubscribe();
  }

}
