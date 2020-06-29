import { Component, OnInit } from "@angular/core";
import { Book } from "src/app/shared/models/book";
import { ModalController } from "@ionic/angular";
import { ModelService } from "src/app/shared/services/model/model.service";
import { Model } from "src/app/shared/models/model";
import { BookDetailComponent } from "src/app/recommendations/categories/book/book-detail/book-detail.component";
import { BookService } from "src/app/shared/services/book/book.service";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.scss"],
})
export class BooksComponent implements OnInit {
  books: Book[] = [];
  constructor(
    private modalController: ModalController,
    private modelService: ModelService,
    private bookService: BookService
  ) {}

  ionViewWillEnter() {
    let booksModel: Model[];
    this.modelService.getCollection("books").subscribe((data) => {
      booksModel = data;
      if (booksModel) {
        booksModel.forEach((book) => {
          this.bookService.getBooks(book.id).subscribe((bookData) => {
            this.books.push(bookData.items[0]);
          });
        });
      }
    });
  }

  ionViewWillLeave() {
    this.books = [];
  }

  ngOnInit() {}

  async openBookDetail(book: Book) {
    const modal = await this.modalController.create({
      component: BookDetailComponent,
      componentProps: {
        book: book,
        showComments: true,
      },
    });
    return await modal.present();
  }
}
