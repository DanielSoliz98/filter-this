export interface Movie {
  id: string;
  title: string;
  original_title: string;
  overview: string;
  release_date: Date;
  poster_path: string;
  backdrop_path: string;
  genre_ids: number[];
}
