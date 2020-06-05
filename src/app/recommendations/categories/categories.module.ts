import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { CategoriesPageRoutingModule } from "./categories-routing.module";

import { CategoriesPage } from "./categories.page";
import { SearchMoviePage } from './movie/search-movie/search-movie.page';
import { SearchSeriesPage } from './tv-series/search-series/search-series.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriesPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [CategoriesPage, SearchMoviePage, SearchSeriesPage],
  entryComponents: [SearchMoviePage, SearchSeriesPage]
})
export class CategoriesPageModule {}
