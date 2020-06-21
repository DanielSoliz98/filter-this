import { Injectable } from "@angular/core";
import { User } from "../../models/user";
import {
  AngularFirestoreDocument,
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore/";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private userDoc: AngularFirestoreDocument<User>;
  private userCollection: AngularFirestoreCollection<User>;
  constructor(private afs: AngularFirestore) {
    this.userCollection = this.afs.collection<User>("users");
  }

  getUser(id: string) {
    this.userDoc = this.afs.doc<User>(`users/${id}`);
    return this.userDoc.valueChanges();
  }

  updateDataUser(user: User) {
    return this.userCollection.doc(user.uid).update(user);
  }
}
