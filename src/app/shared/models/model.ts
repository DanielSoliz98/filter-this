import { Score } from "./score";
import { Comment } from "./comment";

export interface Model {
  user_uid: string;
  comments: Comment[];
  scores: Score[];
  score: number;
  id?: string;
}
