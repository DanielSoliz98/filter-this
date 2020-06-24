import { Component, OnInit } from '@angular/core';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Book } from 'src/app/shared/models/book';
import { BookService } from 'src/app/shared/services/book/book.service';

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.page.html',
  styleUrls: ['./search-books.page.scss'],
})
export class SearchBooksPage implements OnInit {
  bookSearch = new FormGroup({
    book: new FormControl("", Validators.required),
  });
  books: Book[] = [];
  constructor(
    private bookService: BookService,
    private modalCtrl: ModalController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.bookService.getBooks(this.book.value).subscribe((data) => {
      this.books = data.items;
      this.book.setValue("");
      if (data.items.length <= 0) {
        this.presentToast("No hay libros");
      }
    });
  }

  async openBookDetail(book: Book) {
    const modal = await this.modalCtrl.create({
      component: BookDetailComponent,
      componentProps: {
        book: book,
        showComments: false,
      },
    });
    return await modal.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  get book(): AbstractControl {
    return this.bookSearch.get("book");
  }

}
