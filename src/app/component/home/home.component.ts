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
import * as moment from 'moment';
import * as $ from 'jquery';


@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private serverUrl = 'http://localhost:8081/socket';
  private stompClient = null;
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
    if (this.isAuthorized()) {
      this.loadAllContributors();
      this.loadAllReplies();
      this.initializeWebSocketConnection();
    }
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
        this.convertDateZeroIndex();
      },
      () => {
        this.infoService.alertInformation(this.infoCodesService.ERROR, 'Error loading reply-list');
      });
  }

  convertDateZeroIndex() {
    for (let reply of this.replies) {
      reply.publish_date[1] -= 1;
      reply.publish_date[6] = 0;
    }
  }

  reformatDate(publish_date: Date) {
    return moment(publish_date).format('LLL');
  }

  isAdmin(): boolean {
    return this.authenticationService.isAdmin();
  }

  isAuthorized(): boolean {
    return this.authenticationService.isAuthorized();
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

  showContent(replyId: number) {
    if ($('#' + replyId + '.truncate').hasClass('truncated')) {
      $('#' + replyId + '.truncate').removeClass('truncated');
    } else {
      $('#' + replyId + '.truncate').addClass('truncated');
    }
  }

  ngOnDestroy() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    this.getContributorsSubscription && this.getContributorsSubscription.unsubscribe();
    this.getReplySubscription && this.getReplySubscription.unsubscribe();
  }
}
