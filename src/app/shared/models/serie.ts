import { Rating } from "./rating";
import { Comment } from "./comment";
import { Genre } from "./genre";

export interface Serie {
  id: string;
  name: string;
  original_name: string;
  overview: string;
  origin_country: string;
  first_air_date: Date;
  poster_path: string;
  backdrop_path: string;
  genre_ids?: number[];
  genres?: Genre[];
}

export interface SerieModel {
  user_uid: string;
  comments: Comment[];
  ratings: Rating[];
  id?: string;
}
