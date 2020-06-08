import { Genre } from "./genre";

export interface Platform {
  name: string;
  id?: number;
}

export interface Store {
  name: string;
  id?: string;
}

export interface Game {
  name: string;
  platforms: Platform[];
  stores: Store[];
  released: Date;
  background_image: string;
  genres: Genre[];
  id?: string;
}
