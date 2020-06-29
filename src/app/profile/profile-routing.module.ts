import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProfilePage } from "./profile.page";
import { MyRecommendationsComponent } from "./my-recommendations/my-recommendations.component";
import { MyCollectionComponent } from "./my-collection/my-collection.component";

const routes: Routes = [
  {
    path: "",
    component: ProfilePage,
  },
  {
    path: "my-recommendations",
    component: MyRecommendationsComponent,
  },
  {
    path: "my-collection",
    component: MyCollectionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
