import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RestaurantFormPage } from './restaurant-form.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantFormPageRoutingModule {}
