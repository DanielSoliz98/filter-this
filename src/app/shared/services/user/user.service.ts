import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userDoc: AngularFirestoreDocument<User>;

  constructor(private afs: AngularFirestore) { }

  getUser(id: string) {
    this.userDoc = this.afs.doc<User>(`users/${id}`);
    return this.userDoc.valueChanges();
  }
}
