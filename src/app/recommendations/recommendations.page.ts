import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-recommendations",
  templateUrl: "./recommendations.page.html",
  styleUrls: ["./recommendations.page.scss"],
})
export class RecommendationsPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  goToCategories() {
    this.router.navigateByUrl("/app/tabs/recommendations/categories");
  }
}
