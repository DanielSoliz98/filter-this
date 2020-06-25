import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchMoviePageRoutingModule } from './search-movie-routing.module';

import { SearchMoviePage } from './search-movie.page';

import { MovieDetailComponent } from "../movie-detail/movie-detail.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchMoviePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SearchMoviePage, MovieDetailComponent],
  entryComponents: [MovieDetailComponent]
})
export class SearchMoviePageModule {}
