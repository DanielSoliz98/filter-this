import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.page.html",
  styleUrls: ["./categories.page.scss"],
})
export class CategoriesPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  openMoviePage() {
    this.router.navigateByUrl("/app/tabs/recommendations/categories/movies");
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
}
