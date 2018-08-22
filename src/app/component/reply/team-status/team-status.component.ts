import {Component, OnDestroy, OnInit} from '@angular/core';
import {Reply} from '../../../model';
import {Subscription} from 'rxjs';
import {ReplyService} from '../../../service/reply.service';
import {InfocodesService} from '../../../service/infocodes.service';
import {InfoService} from '../../../service/info.service';
import * as moment from 'moment';
import {ContributorReplyDto} from '../../../dto/ContributorReplyDto';

@Component({
  selector: 'app-team-status',
  templateUrl: './team-status.component.html',
  styleUrls: ['./team-status.component.css']
})
export class TeamStatusComponent implements OnInit, OnDestroy {

  contributorReplies: ContributorReplyDto[];
  getTeamStatusSubscription: Subscription;

  constructor(
    private replyService: ReplyService,
    private infoCodesService: InfocodesService,
    private infoService: InfoService,
  ) { }

  ngOnInit() {
    this.loadLatestRepliesForTeam();
  }

  loadLatestRepliesForTeam() {
    this.getTeamStatusSubscription = this.replyService.getTeamStatus()
      .subscribe((replyList: ContributorReplyDto[]) => {
          this.contributorReplies = replyList;
          this.convertDateZeroIndex();
        },
        () => {
          this.infoService.alertInformation(this.infoCodesService.ERROR, 'Error loading reply-list');
        });
  }

  convertDateZeroIndex() {
    for (let contributorReply of this.contributorReplies) {
      contributorReply.reply.publish_date[1] -= 1;
      contributorReply.reply.publish_date[6] = 0;
    }
  }

  reformatDate(publish_date: Date) {
    return moment(publish_date).format('LLL');
  }

  ngOnDestroy() {
    this.getTeamStatusSubscription && this.getTeamStatusSubscription.unsubscribe();
  }

}
