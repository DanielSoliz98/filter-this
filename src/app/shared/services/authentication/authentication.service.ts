import { auth } from "firebase";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Injectable, NgZone } from "@angular/core";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { Router } from "@angular/router";
import { User } from "../../models/user";
import { MyRecommendations } from "../../models/my-recommendations";
import { take, map } from "rxjs/operators";
import { UserService } from "../user/user.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  userData: any;
  constructor(
    private angularFirestore: AngularFirestore,
    private angularAuth: AngularFireAuth,
    private nativeStorage: NativeStorage,
    private router: Router,
    private ngZone: NgZone,
    private userService: UserService
  ) {
    this.angularAuth.authState.subscribe((user) => {
      if (user) {
        this.getUser(user.uid).subscribe((data) => {
          data.emailVerified = user.emailVerified;
          this.updateUser(data).then(() => {
            this.userData = data;
            this.nativeStorage.setItem("user", this.userData);
            if(data.emailVerified){
              this.router.navigateByUrl("/app/tabs/recommendations");
            }
          });
        });
      } else {
        this.nativeStorage.setItem("user", null);
      }
    });
  }

  signIn(email: string, password: string) {
    return this.angularAuth.signInWithEmailAndPassword(email, password);
  }

  signUp(email: string, password: string, firstName: string, lastName: string) {
    return this.angularAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        let user: User = {
          uid: result.user.uid,
          email: result.user.email,
          displayName: `${firstName} ${lastName}`,
          photoURL: result.user.photoURL,
          emailVerified: result.user.emailVerified,
        };
        this.setUserData(user);
        this.sendVerificationMail();
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  sendVerificationMail() {
    return this.angularAuth.user.subscribe((user) => {
      user.sendEmailVerification();
      this.router.navigate(["verify-email-address"]);
    });
  }

  forgotPassword(passwordResetEmail: string) {
    return this.angularAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  facebookAuth() {
    return this.authLogin(new auth.FacebookAuthProvider());
  }

  authLogin(provider: firebase.auth.AuthProvider) {
    return this.angularAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigateByUrl("/app/tabs/recommendations");
        });
        this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  setUserData(user: User) {
    this.userService.getMyCollection(user.uid).subscribe((data) => {
      if (data == undefined) {
        let recommendations: MyRecommendations = {
          books: [],
          games: [],
          movies: [],
          musics: [],
          products: [],
          restaurants: [],
          series: [],
        };
        const collectionRef: AngularFirestoreDocument<any> = this.angularFirestore.doc(
          `my-collection/${user.uid}`
        );
        collectionRef.set(recommendations);
      }
    });

    this.userService.getMyRecommendations(user.uid).subscribe((data) => {
      if (data == undefined) {
        let recommendations: MyRecommendations = {
          books: [],
          games: [],
          movies: [],
          musics: [],
          products: [],
          restaurants: [],
          series: [],
        };
        const recommendationsRef: AngularFirestoreDocument<any> = this.angularFirestore.doc(
          `my-recommendations/${user.uid}`
        );
        recommendationsRef.set(recommendations);
      }
    });

    const userRef: AngularFirestoreDocument<any> = this.angularFirestore.doc(
      `users/${user.uid}`
    );

    let userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  getUser(uid: string): Observable<User> {
    let restaurantDoc = this.angularFirestore.doc<User>(`users/${uid}`);
    return restaurantDoc.valueChanges().pipe(
      take(1),
      map((user) => {
        user.uid = uid;
        return user;
      })
    );
  }

  updateUser(data: User): Promise<void> {
    const userRef: AngularFirestoreDocument<User> = this.angularFirestore.doc(
      `users/${data.uid}`
    );
    return userRef.set(data, {
      merge: true,
    });
  }

  signOut(redirect: boolean) {
    return this.angularAuth.signOut().then(() => {
      this.userData = undefined;
      this.nativeStorage.remove("user");
      if (redirect) {
        this.router.navigate(["slides"]);
      }
    });
  }
}
