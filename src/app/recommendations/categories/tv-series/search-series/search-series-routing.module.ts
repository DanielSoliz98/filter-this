import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchSeriesPage } from './search-series.page';

const routes: Routes = [
  {
    path: '',
    component: SearchSeriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchSeriesPageRoutingModule {}
