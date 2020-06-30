import { Component, OnInit, Input } from "@angular/core";
import { Score } from "../../models/score";
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { ProductService } from "../../services/product/product.service";
import { RestaurantService } from "../../services/restaurant/restaurant.service";
import { ModelService } from "../../services/model/model.service";
import { Product } from "../../models/product";
import { Restaurant } from "../../models/restaurant";
import { Model } from "../../models/model";

@Component({
  selector: "app-score",
  templateUrl: "./score.component.html",
  styleUrls: ["./score.component.scss"],
})
export class ScoreComponent implements OnInit {
  @Input() score: Score;
  @Input() scores: Score[];
  @Input() category: string;
  @Input() idCategory: string;
  like: string = "thumbs-up-outline";
  dislike: string = "thumbs-down-outline";
  scoredLike: boolean = false;
  scoredDislike: boolean = false;
  hasScored: Score;
  constructor(
    private authService: AuthenticationService,
    private productService: ProductService,
    private restaurantService: RestaurantService,
    private modelService: ModelService
  ) {}

  ngOnInit() {
    this.hasScored = this.scores.find(
      (score) => score.user_uid == this.authService.userData.uid
    );
    if (this.hasScored) {
      if (this.hasScored.like === 1) {
        this.like = "thumbs-up";
        this.scoredDislike = true;
      } else {
        this.dislike = "thumbs-down";
        this.scoredLike = true;
      }
    }
  }

  likeRecommendation() {
    if (!this.scoredLike && !this.scoredDislike) {
      this.like = "thumbs-up";
      this.scoredDislike = true;
      let newScore: Score = {
        user_uid: this.authService.userData.uid,
        like: 1,
        dislike: 0,
        displayName: this.authService.userData.displayName,
      };
      this.addScore(newScore);
    }
  }

  dislikeRecommendation() {
    if (!this.scoredLike && !this.scoredDislike) {
      this.dislike = "thumbs-down";
      this.scoredLike = true;
      let newScore: Score = {
        user_uid: this.authService.userData.uid,
        like: 0,
        dislike: 1,
        displayName: this.authService.userData.displayName,
      };
      this.addScore(newScore);
    }
  }
  addScore(newScore: Score) {
    if (this.category === "products") {
      this.productService.searchProduct(this.idCategory).subscribe((data) => {
        let product: Product = data;
        product.score = this.calculateScore(newScore);
        product.scores.push(newScore);
        this.productService.updateProduct(this.idCategory, product);
      });
    } else {
      if (this.category === "restaurants") {
        this.restaurantService
          .searchRestaurant(this.idCategory)
          .subscribe((data) => {
            let restaurant: Restaurant = data;
            restaurant.score = this.calculateScore(newScore);
            restaurant.scores.push(newScore);
            this.restaurantService.updateRestaurant(
              this.idCategory,
              restaurant
            );
          });
      } else {
        let model: Model;
        this.modelService
          .getModel(this.category, this.idCategory)
          .subscribe((data) => {
            model = data;
            model.score = this.calculateScore(newScore);
            model.scores.push(newScore);
            this.modelService.updateModel(
              this.idCategory,
              model,
              this.category
            );
          });
      }
    }
  }

  calculateScore(score: Score) {
    if (score.like === 1) {
      this.score.like += 1;
    } else {
      this.score.dislike += 1;
    }
    return this.score;
  }
}
