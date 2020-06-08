import { HttpHeaders } from "@angular/common/http";

export const HEADERS = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOGI5M2RlYTIzMWRmYTViNDAwOGEwYWQwMzRlM2ZhMSIsInN1YiI6IjVlYzE0NjY5NmQ2NzVhMDAyMDdmNGE1MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3q3orvu4IxVfFknBTsOa-fCu1o014lqzcPDqNPHyjPc",
  }),
};

export const HEADERS_GAMES = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "Bearer 5ea0e5d918cb3fb2cb58ec2972cc4df3fc00098a",
  }),
};

export const HEADERS_MUSIC = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:8100",
    "Access-Control-Allow-Methods": "GET",
  }),
};

export const MOVIES_URL: string =
  "https://api.themoviedb.org/3/search/movie?language=es&page=1&include_adult=false&query=";

export const SERIES_URL: string =
  "https://api.themoviedb.org/3/search/tv?language=es&page=1&include_adult=false&query=";

export const MUSIC_URL: string =
  "https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/track?q=";

export const GAMES_URL: string =
  "https://api.rawg.io/api/games?page_size=3&search=";
