import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthenticationService, UserService} from '../../service';
import {ContributorsListDto} from '../../dto/ContributorsListDto';
import {InfocodesService} from '../../service/infocodes.service';
import {InfoService} from '../../service/info.service';
import {ReplyService} from '../../service/reply.service';
import {Reply} from '../../model/reply';
import * as SockJS from 'sockjs-client';
import * as Stomp from '@stomp/stompjs';
import {ConfirmationDialogService} from '../shared/delete-confirmation-dialog/confirmation-dialog.service';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private serverUrl = 'http://localhost:8081/socket';
  private stompClient;
  getContributorsSubscription: Subscription;
  getReplySubscription: Subscription;
  deleteReplySubscription: Subscription;
  contributors: ContributorsListDto[] = [];
  replies: Reply[] = [];
  deleteReplyId: number;

  constructor(
    private userService: UserService,
    private infoService: InfoService,
    private replyService: ReplyService,
    private infoCodesService: InfocodesService,
    private authenticationService: AuthenticationService,
    private confirmationDialogService: ConfirmationDialogService
  ) {
  }

  ngOnInit() {
    this.loadAllContributors();
    this.loadAllReplies();
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function() {
      that.stompClient.subscribe('/reply', (message) => {
        if (message.body) {
          that.loadAllReplies();
        }
      });
    });
  }

  loadAllContributors() {
    this.getContributorsSubscription = this.userService.getAllContributors()
      .subscribe((contributorsList: ContributorsListDto[]) => {
          this.contributors = contributorsList;
        },
        () => {
          this.infoService.alertInformation(this.infoCodesService.ERROR, 'Error loading user-list');
        });
  }

  loadAllReplies() {
    this.getReplySubscription = this.replyService.getAllReplies()
      .subscribe((replyList: Reply[]) => {
        this.replies = replyList;
      },
      () => {
        this.infoService.alertInformation(this.infoCodesService.ERROR, 'Error loading reply-list');
      });
  }

  isAdmin(): boolean {
    return this.authenticationService.isAdmin();
  }

  openDeleteConfirmationDialog() {
    this.confirmationDialogService.confirm('Do you really want to delete this reply?')
      .then(
        () => this.deleteReply(this.deleteReplyId))
      .catch(() => null);
  }

  deleteReply(replyId: number) {
    this.deleteReplySubscription = this.replyService.deleteReply(replyId)
      .subscribe(() => {
        this.loadAllReplies();
      }, (errorResponse) => {
        this.infoService.alertInformation(this.infoCodesService.ERROR, errorResponse.error);
      });
  }

  ngOnDestroy() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    this.getContributorsSubscription && this.getContributorsSubscription.unsubscribe();
    this.getReplySubscription && this.getReplySubscription.unsubscribe();
  }
}
