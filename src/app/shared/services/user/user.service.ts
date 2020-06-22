import { Injectable } from "@angular/core";
import { User } from "../../models/user";
import {
  AngularFirestoreDocument,
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore/";
import { Observable } from "rxjs";
import { take, map } from "rxjs/operators";

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

  updateDataUser(user: User) {
    return this.userCollection.doc(user.uid).update(user);
  }
}
