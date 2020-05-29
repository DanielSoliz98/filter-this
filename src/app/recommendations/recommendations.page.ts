import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { CategoriesModalComponent } from "./categories-modal/categories-modal.component";

@Component({
  selector: "app-recommendations",
  templateUrl: "./recommendations.page.html",
  styleUrls: ["./recommendations.page.scss"],
})
export class RecommendationsPage implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async openCategories() {
    const modal = await this.modalController.create({
      component: CategoriesModalComponent,
    });
    return await modal.present();
  }
}
