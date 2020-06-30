import { Comment } from './comment';
import { Score } from './score';

export interface Restaurant {
  restaurantName: string;
  foods: string[];
  description: string[];
  ubication: string[];
  comments: Comment[];
  scores: Score[];
  user_uid: string;
  score: Score;
  imagesURL?: string[];
  id?: string;
}
