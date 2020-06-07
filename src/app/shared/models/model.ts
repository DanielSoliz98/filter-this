import { Rating } from "./rating";

export interface Model {
  user_uid: string;
  comments: Comment[];
  ratings: Rating[];
  id?: string;
}
