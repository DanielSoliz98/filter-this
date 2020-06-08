import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchGamePage } from './search-game.page';

const routes: Routes = [
  {
    path: '',
    component: SearchGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchGamePageRoutingModule {}
