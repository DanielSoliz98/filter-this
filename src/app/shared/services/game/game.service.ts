import { Injectable } from "@angular/core";
import { GAMES_URL, HEADERS_GAMES, SEARCH_GAME } from "../constants";
import {
  AngularFirestoreDocument,
  AngularFirestore,
} from "@angular/fire/firestore";
import { Model } from "../../models/model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Game } from '../../models/game';

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

  searchGame(id: string): Observable<Game> {
    return this.http.get<any>(`${SEARCH_GAME}${id}`, HEADERS_GAMES);
  }

  addGame(data: Model): Promise<void> {
    const gameRef: AngularFirestoreDocument<any> = this.afs.doc(
      `games/${data.id}`
    );
    return gameRef.set(data);
  }
}
