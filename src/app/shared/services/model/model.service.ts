import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Model } from "../../models/model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ModelService {
  constructor(private afs: AngularFirestore) {}

  getCollection(collectionName: string): Observable<Model[]> {
    let collection = this.afs.collection<Model>(collectionName);
    return collection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
}
