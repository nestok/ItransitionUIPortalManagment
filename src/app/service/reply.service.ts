import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Reply} from '../model/reply';
import {Mood, Location} from '../model';
import {ReplyAddDto} from '../dto/ReplyAddDto';
import {ContributorReplyDto} from '../dto/ContributorReplyDto';

@Injectable()
export class ReplyService {

  constructor(private http: HttpClient) {
  }

  getAllReplies() {
    return this.http.get<ContributorReplyDto[]>(`${environment.resourceServerUrl}reply/getAll`);
  }

  getMoods() {
    return this.http.get<Mood[]>(`${environment.resourceServerUrl}reply/getMoods`);
  }

  getTeamStatus() {
    return this.http.get<ContributorReplyDto[]>(`${environment.resourceServerUrl}reply/getTeamStatuses`);
  }

  getLocations() {
    return this.http.get<Location[]>(`${environment.resourceServerUrl}reply/getLocations`);
  }

  deleteMood(id: number) {
    return this.http.delete(`${environment.resourceServerUrl}reply/deleteMood/` + id);
  }

  addMood(mood: Mood) {
    return this.http.post(`${environment.resourceServerUrl}reply/addMood`, mood);
  }

  editMood(mood: Mood) {
    return this.http.put(`${environment.resourceServerUrl}reply/editMood`, mood);
  }

  addLocation(location: Location) {
    return this.http.post(`${environment.resourceServerUrl}reply/addLocation`, location);
  }

  addReply(reply: ReplyAddDto) {
    return this.http.post(`${environment.resourceServerUrl}reply/addReply`, reply);
  }

  editLocation(location: Location) {
    return this.http.put(`${environment.resourceServerUrl}reply/editLocation`, location);
  }

  deleteLocation(id: number) {
    return this.http.delete(`${environment.resourceServerUrl}reply/deleteLocation/` + id);
  }

  deleteReply(id: number) {
    return this.http.delete(`${environment.resourceServerUrl}reply/deleteReply/` + id);
  }

}
