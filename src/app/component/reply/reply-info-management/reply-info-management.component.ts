import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {InfoService} from '../../../service/info.service';
import {ReplyService} from '../../../service/reply.service';
import {InfocodesService} from '../../../service/infocodes.service';
import {Mood, Location} from '../../../model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalDirective} from 'angular-bootstrap-md';
import {ConfirmationDialogService} from '../../shared/delete-confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-reply-info-management',
  templateUrl: './reply-info-management.component.html',
  styleUrls: ['./reply-info-management.component.css']
})
export class ReplyInfoManagementComponent implements OnInit, OnDestroy, AfterViewInit {

  getMoodsSubscription: Subscription;
  deleteSubscription: Subscription;
  addSubscription: Subscription;
  getLocationsSubscription: Subscription;
  moods: Mood[];
  locations: Location[];
  deleteMoodId: number;
  editMoodId: number;
  editLocationId: number;
  moodForm: FormGroup;
  locationNameControl: FormControl;
  deleteLocationId: number;
  @ViewChild('editMood') public modalMood: ModalDirective;
  @ViewChild('editLocation') public modalLocation: ModalDirective;

  constructor(
    private infoService: InfoService,
    private replyService: ReplyService,
    private formBuilder: FormBuilder,
    private infoCodesService: InfocodesService,
    private confirmationDialogService: ConfirmationDialogService) {
    this.moodForm = this.formBuilder.group({
      moodText: ['calm'],
      moodIcon: ['accessibility']
    });
    this.locationNameControl = new FormControl('');
  }

  ngOnInit() {
    this.loadMoodList();
    this.loadLocationList();
  }

  loadMoodList() {
    this.getMoodsSubscription = this.replyService.getMoods()
      .subscribe(
        (moods: Mood[]) => {
          this.moods = moods;
        },
        () => {
          this.infoService.alertInformation(this.infoCodesService.ERROR, 'Error loading mood-list');
        }
      );
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

  ngAfterViewInit() {
    const that = this;
    document.getElementById('icons').addEventListener('click', function (e) {
      const target = e.target;
      if (target['classList'].contains('iconbutton')) {
        that.moodForm.controls.moodIcon.setValue(target['textContent']);
      }
    });
  }

  saveMood() {
    let moodText = this.moodForm.controls.moodText.value;
    const moodIcon = this.moodForm.controls.moodIcon.value;
    moodText = moodText.trim();
    if ((moodText.length !== 0) && (moodText.length < 16)) {
      if (this.editMoodId !== null) {
        this.editMood(new Mood(this.editMoodId, moodIcon, moodText));
      } else {
        this.addMood(new Mood(-1, moodIcon, moodText));
      }
    } else {
      this.infoService.alertInformation(this.infoCodesService.ERROR, 'Invalid input data');
    }
  }

  saveLocation() {
    let locationName = this.locationNameControl.value;
    locationName = locationName.trim();
    const existedLocation = this.locations.filter(obj => {
      return obj['name'] === locationName;
    });
    if ((locationName.length !== 0) && (locationName.length < 24) && (existedLocation.length === 0)) {
      if (this.editLocationId !== null) {
        this.editLocation(new Location(this.editLocationId, locationName));
      } else {
        this.addLocation(new Location(-1, locationName));
      }
    } else {
      this.infoService.alertInformation(this.infoCodesService.ERROR, 'Invalid input data');
    }

  }

  editLocation(location: Location) {
    this.addSubscription = this.replyService.editLocation(location)
      .subscribe(() => {
        this.modalLocation.hide();
        this.loadLocationList();
      }, (error) => {
        console.log(error);
      });
  }

  addLocation(location: Location) {
    this.addSubscription = this.replyService.addLocation(location)
      .subscribe(() => {
        this.modalLocation.hide();
        this.loadLocationList();
      }, (error) => {
        console.log(error);
      });
  }

  editMood(mood: Mood) {
    this.addSubscription = this.replyService.editMood(mood)
      .subscribe(() => {
        this.modalMood.hide();
        this.loadMoodList();
      }, (error) => {
        console.log(error);
      });
  }

  addMood(mood: Mood) {
    this.addSubscription = this.replyService.addMood(mood)
      .subscribe(() => {
        this.modalMood.hide();
        this.loadMoodList();
      }, (error) => {
        console.log(error);
      });
  }

  setDefaultMoodFormValues() {
    this.moodForm.controls.moodIcon.setValue('accessibility');
    this.moodForm.controls.moodText.setValue('calm');
    this.editMoodId = null;
  }

  setEditMoodFormValues(mood: Mood) {
    this.moodForm.controls.moodIcon.setValue(mood.icon);
    this.moodForm.controls.moodText.setValue(mood.text);
    this.editMoodId = mood.id;
  }

  setDefaultLocationFormValues() {
    this.locationNameControl.setValue('');
    this.editLocationId = null;
  }

  setEditLocationFormValues(location: Location) {
    this.locationNameControl.setValue(location.name);
    this.editLocationId = location.id;
  }

  openDeleteMoodConfirmationDialog() {
    this.confirmationDialogService.confirm('Do you really want to delete this mood?')
      .then(
        () => this.deleteMood(this.deleteMoodId))
      .catch(() => null);
  }

  openDeleteLocationConfirmationDialog() {
    this.confirmationDialogService.confirm('Do you really want to delete this location?')
      .then(
        () => this.deleteLocation(this.deleteLocationId))
      .catch(() => null);
  }

  deleteMood(moodId: number) {
    this.deleteSubscription = this.replyService.deleteMood(moodId)
      .subscribe(() => {
        this.loadMoodList();
      }, (errorResponse) => {
        this.infoService.alertInformation(this.infoCodesService.ERROR, errorResponse.error);
      });
  }

  deleteLocation(locationId: number) {
    this.deleteSubscription = this.replyService.deleteLocation(locationId)
      .subscribe(() => {
        this.loadLocationList();
      }, (errorResponse) => {
        this.infoService.alertInformation(this.infoCodesService.ERROR, errorResponse.error);
      });
  }

  ngOnDestroy() {
    this.getMoodsSubscription && this.getMoodsSubscription.unsubscribe();
    this.deleteSubscription && this.deleteSubscription.unsubscribe();
    this.addSubscription && this.addSubscription.unsubscribe();
    this.getLocationsSubscription && this.getLocationsSubscription.unsubscribe();
  }

}
