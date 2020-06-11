import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { SearchMoviePage } from "./movie/search-movie/search-movie.page";
import { SearchSeriesPage } from "./tv-series/search-series/search-series.page";
import { SearchMusicPage } from "./music/search-music/search-music.page";
import { SearchGamePage } from "./games/search-game/search-game.page";
import { SearchBooksPage } from "./book/search-books/search-books.page";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.page.html",
  styleUrls: ["./categories.page.scss"],
})
export class CategoriesPage implements OnInit {
  constructor(
    private router: Router,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  async openMoviePage() {
    //this.router.navigateByUrl("/app/tabs/recommendations/categories/movies");
    const modal = await this.modalController.create({
      component: SearchMoviePage,
    });
    return await modal.present();
  }

  async openSeriePage() {
    const modal = await this.modalController.create({
      component: SearchSeriesPage,
    });
    return await modal.present();
  }

  async openGamePage() {
    const modal = await this.modalController.create({
      component: SearchGamePage,
    });
    return await modal.present();
  }

  async openBookPage() {
    const modal = await this.modalController.create({
      component: SearchBooksPage,
    });
    return await modal.present();
  }

  async openMusicPage() {
    const modal = await this.modalController.create({
      component: SearchMusicPage,
    });
    return await modal.present();
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
}
