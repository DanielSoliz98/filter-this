import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SearchSeriesPageRoutingModule } from "./search-series-routing.module";

import { SearchSeriesPage } from "./search-series.page";
import { SerieDetailComponent } from "../serie-detail/serie-detail.component";
import { CommentsComponent } from "src/app/shared/components/comments/comments.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchSeriesPageRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [CommentsComponent],
  declarations: [SearchSeriesPage, SerieDetailComponent, CommentsComponent],
  entryComponents: [SerieDetailComponent],
})
export class SearchSeriesPageModule {}
