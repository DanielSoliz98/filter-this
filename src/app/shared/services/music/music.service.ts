import { Injectable } from "@angular/core";
import { Model } from "../../models/model";
import { HttpClient } from "@angular/common/http";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { MUSIC_URL, HEADERS_MUSIC } from "../constants";

@Injectable({
  providedIn: "root",
})
export class MusicService {
  musicDoc: AngularFirestoreDocument<Model>;

  constructor(private http: HttpClient, private afs: AngularFirestore) {}

  getMusics(name: string): Observable<any> {
    return this.http.get<any>(MUSIC_URL + name + "&limit=5", HEADERS_MUSIC);
  }

  getMusic(id: string): Observable<Model> {
    this.musicDoc = this.afs.doc<Model>(`musics/${id}`);
    return this.musicDoc.valueChanges();
  }

  addMusic(data: Model): Promise<void> {
    const musicRef: AngularFirestoreDocument<any> = this.afs.doc(
      `musics/${data.id}`
    );
    return musicRef.set(data);
  }
}
