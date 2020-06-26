import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-categories",
  templateUrl: "./categories.page.html",
  styleUrls: ["./categories.page.scss"],
})
export class CategoriesPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  openMovies() {
    this.router.navigateByUrl("/app/tabs/categories/movies");
  }

  openSeries() {
    this.router.navigateByUrl("/app/tabs/categories/series");
  }

  openMusics() {
    this.router.navigateByUrl("/app/tabs/categories/musics");
  }

  openGames() {
    this.router.navigateByUrl("/app/tabs/categories/games");
  }

  openBooks() {
    this.router.navigateByUrl("/app/tabs/categories/books");
  }

  openRestaurants() {
    this.router.navigateByUrl("/app/tabs/categories/restaurants");
  }

  openProducts() {
    this.router.navigateByUrl("/app/tabs/categories/products");
  }
}
