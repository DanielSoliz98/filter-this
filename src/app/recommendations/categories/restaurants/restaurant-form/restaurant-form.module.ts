import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { RestaurantFormPageRoutingModule } from "./restaurant-form-routing.module";

import { RestaurantFormPage } from "./restaurant-form.page";
import { MapComponent } from '../map/map.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantFormPageRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [MapComponent],
  declarations: [RestaurantFormPage, MapComponent]
})
export class RestaurantFormPageModule {}
