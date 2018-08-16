import {Mood} from './mood';
import {User} from './user';
import {Location} from './location';

export class Reply {
  id: number;
  location: Location;
  publish_date: Date;
  mood: Mood;
  comment: string;
  user: User;
}
