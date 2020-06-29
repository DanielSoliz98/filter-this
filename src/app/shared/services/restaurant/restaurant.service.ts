import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Restaurant } from "../../models/restaurant";
import {
  AngularFirestoreCollection,
  AngularFirestore,
  DocumentReference,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import { map, finalize, take } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class RestaurantService {
  private restaurants: Observable<Restaurant[]>;
  private restaurantCollection: AngularFirestoreCollection<Restaurant>;
  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {
    this.restaurantCollection = this.db.collection<Restaurant>("restaurants");
    this.restaurants = this.restaurantCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getAllRestaurant(): Observable<Restaurant[]> {
    return this.restaurants;
  }

  uploadImages(restaurantName: string, images: string[]): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const urls: string[] = [];
      for (let image of images) {
        const path = `restaurants/${restaurantName}_${new Date().getTime()}.jpeg`;
        const ref = this.storage.ref(path);
        const task = this.storage.upload(path, this.dataURItoBlob(image));

        task
          .snapshotChanges()
          .pipe(
            finalize(() => {
              ref.getDownloadURL().subscribe((url) => {
                urls.push(url);
                if (images.length === urls.length) {
                  resolve(urls);
                }
              });
            })
          )
          .subscribe();
      }
    });
  }
  private dataURItoBlob(dataURI) {
    let binary = atob(dataURI.split(",")[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: "image/jpeg" });
  }

  addRestaurant(restaurant: Restaurant): Promise<DocumentReference> {
    return this.restaurantCollection.add(restaurant);
  }

  getRestaurants(user_uid: string): Observable<Restaurant[]> {
    return this.db
      .collection<Restaurant>("restaurants", (ref) =>
        ref.where("user_uid", "==", user_uid)
      )
      .valueChanges();
  }

  searchRestaurant(uid: string): Observable<Restaurant> {
    let restaurantDoc = this.db.doc<Restaurant>(`restaurants/${uid}`);
    return restaurantDoc.valueChanges().pipe(
      take(1),
      map((collection) => {
        return collection;
      })
    );
  }

  updateRestaurant(id: string, data: Restaurant) {
    const restaurantRef: AngularFirestoreDocument<Restaurant> = this.db.doc(
      `restaurants/${id}`
    );
    return restaurantRef.set(data, {
      merge: true,
    });
  }
}
