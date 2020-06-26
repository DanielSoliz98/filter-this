import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CategoriesPageRoutingModule } from "./categories-routing.module";

import { CategoriesPage } from "./categories.page";
import { MovieDetailComponent } from "../recommendations/categories/movie/movie-detail/movie-detail.component";
import { MusicDetailComponent } from "../recommendations/categories/music/music-detail/music-detail.component";
import { SerieDetailComponent } from "../recommendations/categories/tv-series/serie-detail/serie-detail.component";
import { BookDetailComponent } from "../recommendations/categories/book/book-detail/book-detail.component";
import { GameDetailComponent } from "../recommendations/categories/games/game-detail/game-detail.component";
import { CommentsComponent } from "../shared/components/comments/comments.component";
import { MusicsComponent } from "./musics/musics.component";
import { BooksComponent } from "./books/books.component";
import { MoviesComponent } from "./movies/movies.component";
import { GamesComponent } from "./games/games.component";
import { ProductsComponent } from "./products/products.component";
import { RestaurantsComponent } from "./restaurants/restaurants.component";
import { SeriesComponent } from "./series/series.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriesPageRoutingModule,
  ],
  exports: [CommentsComponent],
  declarations: [
    CategoriesPage,
    MusicsComponent,
    BooksComponent,
    MoviesComponent,
    GamesComponent,
    ProductsComponent,
    RestaurantsComponent,
    SeriesComponent,
    MovieDetailComponent,
    MusicDetailComponent,
    SerieDetailComponent,
    BookDetailComponent,
    GameDetailComponent,
    CommentsComponent,
  ],
  entryComponents: [
    MovieDetailComponent,
    MusicDetailComponent,
    SerieDetailComponent,
    BookDetailComponent,
    GameDetailComponent,
  ],
})
export class CategoriesPageModule {}
