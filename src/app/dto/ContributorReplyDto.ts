import {Mood, User} from '../model';
import {ContributorDto} from './ContributorDto';
import {ReplyDto} from './ReplyDto';

export class ContributorReplyDto {
  id: number;
  comment: string;
  publish_date: Date;
  location_name: string;
  mood_icon: string;
  mood_text: string;
  contributor_firstname: string;
  contributor_lastname: string;
}
