import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProfilePageRoutingModule } from "./profile-routing.module";

import { ProfilePage } from "./profile.page";
import { OptionsComponent } from "./options/options.component";
import { MyCollectionComponent } from "./my-collection/my-collection.component";
import { MyRecommendationsComponent } from "./my-recommendations/my-recommendations.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ProfilePageRoutingModule],
  exports: [MyCollectionComponent, MyRecommendationsComponent],
  declarations: [
    ProfilePage,
    OptionsComponent,
    MyCollectionComponent,
    MyRecommendationsComponent,
  ],
  entryComponents: [OptionsComponent],
})
export class ProfilePageModule {}
