import { Rating } from './rating';
import { Comment } from './comment';

export interface Product {
  productName: string;
  category: string;
  price: number;
  description: string;
  link: string;
  user_uid: string;
  comments: Comment[];
  ratings: Rating[];
  imagesURL?: string[];
  id?: string;
}