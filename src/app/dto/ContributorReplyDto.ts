import {Mood, User} from '../model';
import {ContributorDto} from './ContributorDto';
import {ReplyDto} from './ReplyDto';

export class ContributorReplyDto {
  reply: ReplyDto
  contributor: ContributorDto;
}
