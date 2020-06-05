import { HttpHeaders } from "@angular/common/http";

export const HEADERS = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOGI5M2RlYTIzMWRmYTViNDAwOGEwYWQwMzRlM2ZhMSIsInN1YiI6IjVlYzE0NjY5NmQ2NzVhMDAyMDdmNGE1MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3q3orvu4IxVfFknBTsOa-fCu1o014lqzcPDqNPHyjPc",
  }),
};

export const MOVIES_URL: string =
  "https://api.themoviedb.org/3/search/movie?language=es&page=1&include_adult=false&query=";

export const SERIES_URL: string =
  "https://api.themoviedb.org/3/search/tv?language=es&page=1&include_adult=false&query=";
