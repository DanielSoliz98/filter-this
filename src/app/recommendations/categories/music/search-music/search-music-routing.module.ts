import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchMusicPage } from './search-music.page';

const routes: Routes = [
  {
    path: '',
    component: SearchMusicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchMusicPageRoutingModule {}
