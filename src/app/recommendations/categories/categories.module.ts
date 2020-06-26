import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CategoriesPageRoutingModule } from "./categories-routing.module";

import { CategoriesPage } from "./categories.page";
import { SearchMoviePage } from "./movie/search-movie/search-movie.page";
import { SearchSeriesPage } from "./tv-series/search-series/search-series.page";
import { SearchMusicPage } from "./music/search-music/search-music.page";
import { SearchGamePage } from "./games/search-game/search-game.page";
import { SearchBooksPage } from './book/search-books/search-books.page';
import { ProductFormPage } from './products/product-form/product-form.page';
import { RestaurantFormPageModule } from './restaurants/restaurant-form/restaurant-form.module';
import { SearchBooksPageModule } from './book/search-books/search-books.module';
import { SearchGamePageModule } from './games/search-game/search-game.module';
import { SearchMoviePageModule } from './movie/search-movie/search-movie.module';
import { SearchMusicPageModule } from './music/search-music/search-music.module';
import { SearchSeriesPageModule } from './tv-series/search-series/search-series.module';
import { CommentsComponent } from 'src/app/shared/components/comments/comments.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriesPageRoutingModule,
    ReactiveFormsModule,
    RestaurantFormPageModule,
    SearchBooksPageModule,
    SearchGamePageModule,
    SearchMoviePageModule,
    SearchSeriesPageModule,
    SearchMusicPageModule
  ],
  entryComponents: [
    SearchMoviePage,
    SearchSeriesPage,
    SearchMusicPage,
    SearchGamePage,
    SearchBooksPage,
    ProductFormPage
  ]
})
export class CategoriesPageModule {}
