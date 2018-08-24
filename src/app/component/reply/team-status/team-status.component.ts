import {Component, OnDestroy, OnInit} from '@angular/core';
import {Reply} from '../../../model';
import {Subscription} from 'rxjs';
import {ReplyService} from '../../../service/reply.service';
import {InfocodesService} from '../../../service/infocodes.service';
import {InfoService} from '../../../service/info.service';
import * as moment from 'moment';
import {ReplyDto} from '../../../dto/ReplyDto';
import {ContributorDto} from '../../../dto/ContributorDto';

@Component({
  selector: 'app-team-status',
  templateUrl: './team-status.component.html',
  styleUrls: ['./team-status.component.css']
})
export class TeamStatusComponent implements OnInit, OnDestroy {

  replies: ReplyDto[];
  contributorsUnreplied: ContributorDto[];
  getTeamStatusSubscription: Subscription;
  getContributorsWithoutReplySubscription: Subscription;

  constructor(
    private replyService: ReplyService,
    private infoCodesService: InfocodesService,
    private infoService: InfoService,
  ) { }

  ngOnInit() {
    this.loadLatestRepliesForTeam();
    this.loadContributorsWithoutReply();
  }

  loadLatestRepliesForTeam() {
    this.getTeamStatusSubscription = this.replyService.getTeamStatus()
      .subscribe((replyList: ReplyDto[]) => {
          this.replies = replyList;
          this.convertDateZeroIndex();
        },
        () => {
          this.infoService.alertInformation(this.infoCodesService.ERROR, 'Error loading reply-list');
        });
  }

  loadContributorsWithoutReply() {
    this.getContributorsWithoutReplySubscription = this.replyService.getContributorsWithoutReply()
      .subscribe((contributors: ContributorDto[]) => {
          this.contributorsUnreplied = contributors;
        },
        () => {
          this.infoService.alertInformation(this.infoCodesService.ERROR, 'Error loading contributors-list');
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

  ngOnDestroy() {
    this.getTeamStatusSubscription && this.getTeamStatusSubscription.unsubscribe();
    this.getContributorsWithoutReplySubscription && this.getContributorsWithoutReplySubscription.unsubscribe();
  }

}
