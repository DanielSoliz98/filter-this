import { auth } from "firebase";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Injectable, NgZone } from "@angular/core";
import { NativeStorage } from "@ionic-native/native-storage/ngx";
import { Router } from "@angular/router";
import { User } from "../../models/user";

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
    private ngZone: NgZone
  ) {
    this.angularAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        this.nativeStorage.setItem("user", JSON.stringify(this.userData));
        if (user.emailVerified) {
          this.router.navigateByUrl("/app/tabs/recommendations");
        } else {
          this.router.navigate(["verify-email-address"]);
        }
      } else {
        this.nativeStorage.setItem("user", null);
      }
    });
  }

  signIn(email: string, password: string) {
    return this.angularAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigateByUrl("/app/tabs/recommendations");
        });
        this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
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
        this.sendVerificationMail();
        this.setUserData(user);
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

  get isLoggedIn(): boolean {
    let user: any;
    this.nativeStorage.getItem("user").then((userStored) => {
      user = JSON.parse(userStored);
    });
    return user !== null && user.emailVerified !== false ? true : false;
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

  signOut() {
    return this.angularAuth.signOut().then(() => {
      this.nativeStorage.remove("user");
      this.router.navigate(["slides"]);
    });
  }
}
