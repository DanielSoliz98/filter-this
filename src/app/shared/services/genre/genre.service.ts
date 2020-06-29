import { Injectable } from "@angular/core";
import { Genre } from "../../models/genre";
import {
  AngularFirestoreDocument,
  AngularFirestore,
} from "@angular/fire/firestore";
import { map, take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class GenreService {
  genreDoc: AngularFirestoreDocument<Genre>;

  constructor(private afs: AngularFirestore) {}

  getGenre(id: number) {
    this.genreDoc = this.afs.doc<Genre>(`genres/${id}`);
    return this.genreDoc.valueChanges().pipe(
      take(1),
      map((book) => {
        return book;
      })
    );
  }
}
