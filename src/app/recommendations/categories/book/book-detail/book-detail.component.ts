import { Component, OnInit, Input } from "@angular/core";
import { Book } from "src/app/shared/models/book";
import { Model } from "src/app/shared/models/model";
import { ModalController, ToastController } from "@ionic/angular";
import { BookService } from "src/app/shared/services/book/book.service";
import { AuthenticationService } from "src/app/shared/services/authentication/authentication.service";
import { User } from "src/app/shared/models/user";
import { UserService } from "src/app/shared/services/user/user.service";
import { MyRecommendations } from "src/app/shared/models/my-recommendations";

@Component({
  selector: "app-book-detail",
  templateUrl: "./book-detail.component.html",
  styleUrls: ["./book-detail.component.scss"],
})
export class BookDetailComponent implements OnInit {
  @Input() book: Book;
  @Input() showComments: boolean;
  bookModel: Model;
  user: User;
  saved: boolean;
  myRecommendation: boolean;

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private bookService: BookService,
    private authService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.bookService.getBook(this.book.id).subscribe((data) => {
      this.bookModel = data;
      if (data && this.showComments) {
        this.myRecommendation =
          data.user_uid === this.authService.userData.uid ? true : false;
        this.userService.getUser(data.user_uid).subscribe((dataUser) => {
          this.user = dataUser;
        });
      }
    });

    this.userService
      .getMyCollection(this.authService.userData.uid)
      .subscribe((data) => {
        let inCollection = data.books.find((book) => book === this.book.id);
        if (!this.myRecommendation) {
          this.saved = inCollection ? true : false;
        } else {
          this.saved = false;
        }
      });
  }

  saveBookRecommendation() {
    let book: Model = {
      user_uid: this.authService.userData.uid,
      id: this.book.id,
      comments: [],
      scores: [],
      score: { like: 0, dislike: 0 },
    };
    this.bookService.addBook(book).then(
      () => {
        this.userService
          .getMyRecommendations(book.user_uid)
          .subscribe((data) => {
            let recommendations = data as MyRecommendations;
            recommendations.books.push(book.id);
            this.userService
              .updateMyRecommendations(book.user_uid, recommendations)
              .then(() => {
                this.dismiss();
                this.presentToast("Recomendacion publicada");
              });
          });
      },
      (err) => {
        this.presentToast("No se pudo publicar la recomendacion");
      }
    );
  }

  saveToMyCollection() {
    this.userService
      .getMyCollection(this.authService.userData.uid)
      .subscribe((data) => {
        let collection = data;
        collection.books.push(this.book.id);
        this.userService
          .updateMyCollection(this.authService.userData.uid, collection)
          .then(() => {
            this.dismiss();
            this.presentToast("Recomendacion guardada");
          });
      });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
