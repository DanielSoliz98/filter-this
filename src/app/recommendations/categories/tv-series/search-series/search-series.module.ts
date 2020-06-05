import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { SearchSeriesPageRoutingModule } from "./search-series-routing.module";

import { SearchSeriesPage } from "./search-series.page";
import { SerieDetailComponent } from "../serie-detail/serie-detail.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchSeriesPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SearchSeriesPage, SerieDetailComponent],
  entryComponents: [SerieDetailComponent],
})
export class SearchSeriesPageModule {}
