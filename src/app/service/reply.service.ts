import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Reply} from '../model/reply';
import {Mood, Location} from '../model';
import {ReplyAddDto} from '../dto/ReplyAddDto';
import {ReplyDto} from '../dto/ReplyDto';
import {ContributorDto} from '../dto/ContributorDto';

@Injectable()
export class ReplyService {

  constructor(private http: HttpClient) {
  }

  getAllReplies() {
    return this.http.get<ReplyDto[]>(`${environment.resourceServerUrl}reply/`);
  }

  getMoods() {
    return this.http.get<Mood[]>(`${environment.resourceServerUrl}mood/`);
  }

  getTeamStatus() {
    return this.http.get<ReplyDto[]>(`${environment.resourceServerUrl}reply/lastStatuses`);
  }

  getContributorsWithoutReply() {
    return this.http.get<ContributorDto[]>(`${environment.resourceServerUrl}contributors/withoutReply`);
  }

  getLocations() {
    return this.http.get<Location[]>(`${environment.resourceServerUrl}location/`);
  }

  deleteMood(id: number) {
    return this.http.delete(`${environment.resourceServerUrl}mood/` + id);
  }

  addMood(mood: Mood) {
    return this.http.post(`${environment.resourceServerUrl}mood/add`, mood);
  }

  editMood(mood: Mood) {
    return this.http.put(`${environment.resourceServerUrl}mood/edit`, mood);
  }

  addLocation(location: Location) {
    return this.http.post(`${environment.resourceServerUrl}location/add`, location);
  }

  addReply(reply: ReplyAddDto) {
    return this.http.post(`${environment.resourceServerUrl}reply/add`, reply);
  }

  editLocation(location: Location) {
    return this.http.put(`${environment.resourceServerUrl}location/edit`, location);
  }

  deleteLocation(id: number) {
    return this.http.delete(`${environment.resourceServerUrl}location/` + id);
  }

  deleteReply(id: number) {
    return this.http.delete(`${environment.resourceServerUrl}reply/` + id);
  }

}
