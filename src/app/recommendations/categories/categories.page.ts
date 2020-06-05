import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from '@ionic/angular';
import { SearchMoviePage } from './movie/search-movie/search-movie.page';
import { SearchSeriesPage } from './tv-series/search-series/search-series.page';

@Component({
  selector: "app-categories",
  templateUrl: "./categories.page.html",
  styleUrls: ["./categories.page.scss"],
})
export class CategoriesPage implements OnInit {
  constructor(private router: Router, private modalController: ModalController) {}

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
}
