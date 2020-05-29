import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-categories-modal",
  templateUrl: "./categories-modal.component.html",
  styleUrls: ["./categories-modal.component.scss"],
})
export class CategoriesModalComponent implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  openMoviePage() {
    console.log("movies");
  }

  openSeriePage() {
    console.log("series");
  }

  openGamePage() {
    console.log("games");
  }

  openBookPage() {
    console.log("books");
  }

  openMusicPage() {
    console.log("music");
  }

  openFoodPage() {
    console.log("food");
  }

  openRestaurantPage() {
    console.log("restaurantes");
  }

  openProductPage() {
    console.log("products");
  }

  close() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
