import { Component, OnInit, Input } from "@angular/core";
import { Book } from 'src/app/shared/models/book';
import { Model } from 'src/app/shared/models/model';
import { ModalController, ToastController } from '@ionic/angular';
import { BookService } from 'src/app/shared/services/book/book.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: "app-book-detail",
  templateUrl: "./book-detail.component.html",
  styleUrls: ["./book-detail.component.scss"],
})
export class BookDetailComponent implements OnInit {
  @Input() book: Book;
  bookModel: Model;
  user: User;

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private bookService: BookService,
    private userService: UserService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.bookService.getBook(this.book.id).subscribe((data) => {
      this.bookModel = data;
      if (data) {
        this.userService.getUser(data.user_uid).subscribe((dataUser) => {
          this.user = dataUser;
        });
      }
    });
  }

  saveBookRecommendation() {
    let book: Model = {
      user_uid: this.authService.userData.uid,
      id: this.book.id,
      comments: [],
      ratings: [],
    };
    this.bookService.addBook(book).then(
      () => {
        this.dismiss();
        this.presentToast("Recomendacion publicada");
      },
      (err) => {
        this.presentToast("No se pudo publicar la recomendacion");
      }
    );
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