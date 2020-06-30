import { Score } from './score';
import { Comment } from './comment';

export interface Product {
  productName: string;
  category: string;
  price: number;
  description: string;
  link: string;
  user_uid: string;
  comments: Comment[];
  scores: Score[];
  score: Score;
  imagesURL?: string[];
  id?: string;
}
