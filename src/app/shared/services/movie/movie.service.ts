import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Movie, MovieModel } from "../../models/movie";
import {
  AngularFirestoreDocument,
  AngularFirestore,
} from "@angular/fire/firestore";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json;charset=utf-8",
    Authorization:
      "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOGI5M2RlYTIzMWRmYTViNDAwOGEwYWQwMzRlM2ZhMSIsInN1YiI6IjVlYzE0NjY5NmQ2NzVhMDAyMDdmNGE1MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3q3orvu4IxVfFknBTsOa-fCu1o014lqzcPDqNPHyjPc",
  }),
};

const url: string =
  "https://api.themoviedb.org/3/search/movie?language=es&page=1&include_adult=false&query=";

@Injectable({
  providedIn: "root",
})
export class MovieService {
  movieDoc: AngularFirestoreDocument<MovieModel>;

  constructor(private http: HttpClient, private afs: AngularFirestore) {}

  getMovies(name: string): Observable<any> {
    return this.http.get<any>(url + name, httpOptions);
  }

  getMovie(id: string) {
    this.movieDoc = this.afs.doc<MovieModel>(`movies/${id}`);
    return this.movieDoc.valueChanges();
  }
}
