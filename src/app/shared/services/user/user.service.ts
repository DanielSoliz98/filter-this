import { Injectable } from "@angular/core";
import { User } from "../../models/user";
import {
  AngularFirestoreDocument,
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore/";
import { Observable } from "rxjs";
import { take, map } from "rxjs/operators";
import { MyRecommendations } from "../../models/my-recommendations";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private userCollection: AngularFirestoreCollection<User>;
  constructor(private afs: AngularFirestore) {
    this.userCollection = this.afs.collection<User>("users");
  }

  getUser(id: string): Observable<User> {
    return this.userCollection
      .doc<User>(id)
      .valueChanges()
      .pipe(
        take(1),
        map((user) => {
          user.uid = id;
          return user;
        })
      );
  }

  getMyRecommendations(uid: string): Observable<MyRecommendations> {
    let recommendationDoc = this.afs.doc<MyRecommendations>(
      `my-recommendations/${uid}`
    );
    return recommendationDoc.valueChanges().pipe(
      take(1),
      map((recommendations) => {
        return recommendations;
      })
    );
  }

  getMyCollection(uid: string): Observable<MyRecommendations> {
    let recommendationDoc = this.afs.doc<MyRecommendations>(
      `my-collection/${uid}`
    );
    return recommendationDoc.valueChanges().pipe(
      take(1),
      map((collection) => {
        return collection;
      })
    );
  }

  updateMyRecommendations(uid: string, data: MyRecommendations) {
    let recommendationsCollections = this.afs.collection<MyRecommendations>(
      "my-recommendations"
    );
    return recommendationsCollections.doc(uid).update(data);
  }

  updateMyCollection(uid: string, data: MyRecommendations) {
    let collection = this.afs.collection<MyRecommendations>("my-collection");
    return collection.doc(uid).update(data);
  }
}
