import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MovieModel, Movie } from "../../models/movie";
import {
  AngularFirestoreDocument,
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { map, take } from "rxjs/operators";
import { HEADERS, MOVIES_URL, SEARCH_MOVIE } from "../constants";

@Injectable({
  providedIn: "root",
})
export class MovieService {
  movieCollection: AngularFirestoreCollection<MovieModel>;
  movieDoc: AngularFirestoreDocument<MovieModel>;

  constructor(private http: HttpClient, private afs: AngularFirestore) {
    this.movieCollection = this.afs.collection<MovieModel>("movies");
  }

  getMovies(name: string): Observable<any> {
    return this.http.get<any>(MOVIES_URL + name, HEADERS);
  }

  getMovie(id: string): Observable<MovieModel> {
    this.movieDoc = this.afs.doc<MovieModel>(`movies/${id}`);
    return this.movieDoc.valueChanges().pipe(
      take(1),
      map((book) => {
        return book;
      })
    );
  }

  getMoviesSaved(): Observable<MovieModel[]> {
    return this.movieCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as MovieModel;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  searchMovie(id: string): Observable<Movie> {
    return this.http.get<any>(`${SEARCH_MOVIE}${id}?language=es`, HEADERS);
  }

  addMovie(data: MovieModel): Promise<void> {
    const movieRef: AngularFirestoreDocument<any> = this.afs.doc(
      `movies/${data.id}`
    );
    return movieRef.set(data);
  }
}
