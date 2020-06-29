import { Comment } from './comment';
import { Rating } from './rating';

export interface Restaurant {
  restaurantName: string;
  foods: string[];
  description: string[];
  ubication: string[];
  comments: Comment[];
  ratings: Rating[];
  user_uid: string;
  imagesURL?: string[];
  id?: string;
}
