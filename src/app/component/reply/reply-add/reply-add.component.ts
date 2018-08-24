import {Component, OnDestroy, OnInit} from '@angular/core';
import {Location, Mood, Reply} from '../../../model';
import {InfoService} from '../../../service/info.service';
import {ReplyService} from '../../../service/reply.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {InfocodesService} from '../../../service/infocodes.service';
import {Subscription} from 'rxjs';
import {ContributorDto} from '../../../dto/ContributorDto';
import {AuthenticationService, UserService} from '../../../service';
import {Router} from '@angular/router';
import {ReplyAddDto} from '../../../dto/ReplyAddDto';
import * as SockJS from 'sockjs-client';
import * as Stomp from '@stomp/stompjs';

@Component({
  selector: 'app-reply-add',
  templateUrl: './reply-add.component.html',
  styleUrls: ['./reply-add.component.css']
})
export class ReplyAddComponent implements OnInit, OnDestroy {

  private serverUrl = 'http://localhost:8081/socket';
  private stompClient;
  getMoodsSubscription: Subscription;
  getContributorsSubscription: Subscription;
  getLocationsSubscription: Subscription;
  addReplySubscription: Subscription;
  moods: Mood[];
  locations: Location[];
  replyForm: FormGroup;
  contributors: ContributorDto[];


  constructor(
    private infoService: InfoService,
    private replyService: ReplyService,
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder,
    private infoCodesService: InfocodesService) {
    this.replyForm = this.formBuilder.group({
      contributor: [''],
      location: [''],
      comment: [''],
      mood: ['']
    });
  }

  ngOnInit() {
    this.loadMoodList();
    this.loadAllContributors();
    this.loadLocationList();
    this.initializeWebSocket();
  }

  initializeWebSocket() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, null);
  }

  sendMessage() {
    this.stompClient.send('/app/send' , {});
  }

  loadMoodList() {
    this.getMoodsSubscription = this.replyService.getMoods()
      .subscribe(
        (moods: Mood[]) => {
          this.moods = moods;
        },
        () => {
          this.infoService.alertInformation(this.infoCodesService.ERROR, 'Error loading mood-list');
        });
  }

  loadLocationList() {
    this.getLocationsSubscription = this.replyService.getLocations()
      .subscribe(
        (locations: Location[]) => {
          this.locations = locations;
        },
        () => {
          this.infoService.alertInformation(this.infoCodesService.ERROR, 'Error loading location-list');
        }
      );
  }

  loadAllContributors() {
    this.getContributorsSubscription = this.userService.getAllContributors()
      .subscribe((contributorsList: ContributorDto[]) => {
          this.contributors = contributorsList;
        },
        () => {
          this.infoService.alertInformation(this.infoCodesService.ERROR, 'Error loading user-list');
        });
  }

  addReply() {
    const reply = this.formReplyModel();
    this.addReplySubscription = this.replyService.addReply(reply)
      .subscribe(() => {
          this.sendMessage();
          this.router.navigate([`/`]);
        },
        (errorResponse) => {
          this.infoService.alertInformation(this.infoCodesService.ERROR, errorResponse.error);
        });
  }

  formReplyModel(): ReplyAddDto {
    const reply: ReplyAddDto = new ReplyAddDto();
    const replyForm = this.replyForm.value;
    reply.mood_id = replyForm.mood.id;
    reply.contributor_id = replyForm.contributor.id;
    reply.location_id = replyForm.location.id;
    reply.comment = replyForm.comment;
    return reply;
  }

  ngOnDestroy() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    this.getContributorsSubscription && this.getContributorsSubscription.unsubscribe();
    this.getMoodsSubscription && this.getMoodsSubscription.unsubscribe();
  }

}
