import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {UserService} from '../../service';
import {ContributorsListDto} from '../../dto/ContributorsListDto';
import {InfocodesService} from '../../service/infocodes.service';
import {InfoService} from '../../service/info.service';
import {ReplyService} from '../../service/reply.service';
import {Reply} from '../../model/reply';


@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  getContributorsSubscription: Subscription;
  getReplySubscription: Subscription;
  contributors: ContributorsListDto[] = [];
  replies: Reply[] = [];

  constructor(
    private userService: UserService,
    private infoService: InfoService,
    private replyService: ReplyService,
    private infoCodesService: InfocodesService
  ) {
  }

  ngOnInit() {
    this.loadAllContributors();
    this.loadAllReplies();
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

  ngOnDestroy() {
    this.getContributorsSubscription && this.getContributorsSubscription.unsubscribe();
    this.getReplySubscription && this.getReplySubscription.unsubscribe();
  }
}
