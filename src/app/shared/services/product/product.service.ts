import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../../models/product";
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
export class ProductService {
  private products: Observable<Product[]>;
  private productCollection: AngularFirestoreCollection<Product>;
  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {
    this.productCollection = this.db.collection<Product>("products");
    this.products = this.productCollection.snapshotChanges().pipe(
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

  uploadImages(productName: string, images: string[]): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const urls: string[] = [];
      for (let image of images) {
        const path = `products/${productName}_${new Date().getTime()}.jpeg`;
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

  addProduct(product: Product): Promise<DocumentReference> {
    return this.productCollection.add(product);
  }

  getProducts(user_uid: string): Observable<Product[]> {
    return this.db
      .collection<Product>("products", (ref) =>
        ref.where("user_uid", "==", user_uid)
      )
      .valueChanges();
  }

  searchProduct(uid: string): Observable<Product> {
    let productDoc = this.db.doc<Product>(`products/${uid}`);
    return productDoc.valueChanges().pipe(
      take(1),
      map((collection) => {
        return collection;
      })
    );
  }

  getAllProducts(): Observable<Product[]> {
    return this.products;
  }

  updateProduct(id: string, data: Product) {
    const productRef: AngularFirestoreDocument<Product> = this.db.doc(
      `products/${id}`
    );
    return productRef.set(data, {
      merge: true,
    });
  }
}
