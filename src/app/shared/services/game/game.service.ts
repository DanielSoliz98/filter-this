import { Injectable } from "@angular/core";
import { GAMES_URL, HEADERS_GAMES } from "../constants";
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
export class GameService {
  gameDoc: AngularFirestoreDocument<Model>;

  constructor(private http: HttpClient, private afs: AngularFirestore) {}

  getGames(name: string): Observable<any> {
    return this.http.get<any>(GAMES_URL + name, HEADERS_GAMES);
  }

  getGame(id: string): Observable<Model> {
    this.gameDoc = this.afs.doc<Model>(`games/${id}`);
    return this.gameDoc.valueChanges();
  }

  addGame(data: Model): Promise<void> {
    const musicRef: AngularFirestoreDocument<any> = this.afs.doc(
      `games/${data.id}`
    );
    return musicRef.set(data);
  }
}
