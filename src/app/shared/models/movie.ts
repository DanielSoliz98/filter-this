import { Score } from "./score";
import { Comment } from './comment';
import { Genre } from './genre';

export interface Movie {
  id: string;
  title: string;
  original_title: string;
  overview: string;
  release_date: Date;
  poster_path: string;
  backdrop_path: string;
  genre_ids?: number[];
  genres?: Genre[];
}

export interface MovieModel {
  user_uid: string;
  comments: Comment[];
  scores: Score[];
  score: Score;
  id?: string;
}
