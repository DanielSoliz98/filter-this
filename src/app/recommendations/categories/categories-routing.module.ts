import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesPage } from './categories.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriesPage
  },
  {
    path: 'movies',
    loadChildren: () => import('./movie/search-movie/search-movie.module').then( m => m.SearchMoviePageModule)
  },
  {
    path: 'search-series',
    loadChildren: () => import('./tv-series/search-series/search-series.module').then( m => m.SearchSeriesPageModule)
  },
  {
    path: 'search-music',
    loadChildren: () => import('./music/search-music/search-music.module').then( m => m.SearchMusicPageModule)
  },
  {
    path: 'search-game',
    loadChildren: () => import('./games/search-game/search-game.module').then( m => m.SearchGamePageModule)
  },
  {
    path: 'search-books',
    loadChildren: () => import('./book/search-books/search-books.module').then( m => m.SearchBooksPageModule)
  },
  {
    path: 'product-form',
    loadChildren: () => import('./products/product-form/product-form.module').then( m => m.ProductFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesPageRoutingModule {}
