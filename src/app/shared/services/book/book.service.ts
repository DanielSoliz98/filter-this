import { Injectable } from "@angular/core";
import { BOOK_URL } from "../constants";
import {
  AngularFirestoreDocument,
  AngularFirestore,
} from "@angular/fire/firestore";
import { Model } from "../../models/model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BookService {
  bookDoc: AngularFirestoreDocument<Model>;

  constructor(private http: HttpClient, private afs: AngularFirestore) {}

  getBooks(name: string): Observable<any> {
    return this.http.get<any>(BOOK_URL + name);
  }

  getBook(id: string): Observable<Model> {
    this.bookDoc = this.afs.doc<Model>(`books/${id}`);
    return this.bookDoc.valueChanges();
  }

  addBook(data: Model): Promise<void> {
    const bookRef: AngularFirestoreDocument<any> = this.afs.doc(
      `books/${data.id}`
    );
    return bookRef.set(data);
  }
}
