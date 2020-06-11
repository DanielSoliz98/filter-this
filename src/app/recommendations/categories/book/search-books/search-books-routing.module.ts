import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchBooksPage } from './search-books.page';

const routes: Routes = [
  {
    path: '',
    component: SearchBooksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchBooksPageRoutingModule {}
