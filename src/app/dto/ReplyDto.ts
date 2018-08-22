import {Mood} from '../model';

export class ReplyDto {
  id: number;
  comment: string;
  publish_date: Date;
  location_name: String;
  mood: Mood;
}
