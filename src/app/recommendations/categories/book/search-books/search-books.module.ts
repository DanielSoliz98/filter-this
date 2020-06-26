import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SearchBooksPageRoutingModule } from "./search-books-routing.module";

import { SearchBooksPage } from "./search-books.page";
import { BookDetailComponent } from "../book-detail/book-detail.component";
import { CommentsComponent } from 'src/app/shared/components/comments/comments.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchBooksPageRoutingModule,
    ReactiveFormsModule
  ],
  exports: [CommentsComponent],
  declarations: [SearchBooksPage, BookDetailComponent, CommentsComponent],
  entryComponents: [BookDetailComponent],
})
export class SearchBooksPageModule {}
