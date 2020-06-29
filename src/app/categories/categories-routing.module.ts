import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesPage } from './categories.page';
import { BooksComponent } from './books/books.component';
import { GamesComponent } from './games/games.component';
import { MoviesComponent } from './movies/movies.component';
import { MusicsComponent } from './musics/musics.component';
import { ProductsComponent } from './products/products.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { SeriesComponent } from './series/series.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesPage
  },
  {
    path: 'books',
    component: BooksComponent
  },
  {
    path: 'games',
    component: GamesComponent
  },
  {
    path: 'movies',
    component: MoviesComponent
  },
  {
    path: 'musics',
    component: MusicsComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'restaurants',
    component: RestaurantsComponent
  },
  {
    path: 'series',
    component: SeriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesPageRoutingModule {}
