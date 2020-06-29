import { Rating } from "./rating";
import { Comment } from './comment';

export interface Model {
  user_uid: string;
  comments: Comment[];
  ratings: Rating[];
  id?: string;
}
