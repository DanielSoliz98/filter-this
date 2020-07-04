import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Model } from "../../models/model";
import { map, take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ModelService {
  modelDoc: AngularFirestoreDocument<Model>;
  constructor(private afs: AngularFirestore) {}

  getCollection(collectionName: string): Observable<Model[]> {
    let collection = this.afs.collection<Model>(collectionName);
    return collection.snapshotChanges().pipe(
      take(1),
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getModel(category: string, id: string): Observable<Model> {
    this.modelDoc = this.afs.doc<Model>(`${category}/${id}`);
    return this.modelDoc.valueChanges().pipe(
      take(1),
      map((modelData) => {
        return modelData;
      })
    );
  }

  updateModel(id: string, data: Model, category: string) {
    const modelRef: AngularFirestoreDocument<Model> = this.afs.doc(
      `${category}/${id}`
    );
    return modelRef.set(data, {
      merge: true,
    });
  }
}
