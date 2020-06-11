import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SearchBooksPageRoutingModule } from "./search-books-routing.module";

import { SearchBooksPage } from "./search-books.page";
import { BookDetailComponent } from "../book-detail/book-detail.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchBooksPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [SearchBooksPage, BookDetailComponent],
  entryComponents: [BookDetailComponent],
})
export class SearchBooksPageModule {}
