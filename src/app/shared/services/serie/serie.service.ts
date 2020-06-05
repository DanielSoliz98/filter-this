import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SERIES_URL, HEADERS } from "../constants";
import { Observable } from "rxjs";
import { SerieModel } from "../../models/serie";
import {
  AngularFirestoreDocument,
  AngularFirestore,
} from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class SerieService {
  serieDoc: AngularFirestoreDocument<SerieModel>;

  constructor(private http: HttpClient, private afs: AngularFirestore) {}

  getSeries(name: string): Observable<any> {
    return this.http.get<any>(SERIES_URL + name, HEADERS);
  }

  getSerie(id: string): Observable<SerieModel> {
    this.serieDoc = this.afs.doc<SerieModel>(`series/${id}`);
    return this.serieDoc.valueChanges();
  }

  addSerie(data: SerieModel): Promise<void> {
    const serieRef: AngularFirestoreDocument<any> = this.afs.doc(
      `series/${data.id}`
    );
    return serieRef.set(data);
  }
}
