import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CategoriesPageRoutingModule } from "./categories-routing.module";

import { CategoriesPage } from "./categories.page";
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
  declarations: [
    CategoriesPage,
    MusicsComponent,
    BooksComponent,
    MoviesComponent,
    GamesComponent,
    ProductsComponent,
    RestaurantsComponent,
    SeriesComponent,
  ],
  
})
export class CategoriesPageModule {}
