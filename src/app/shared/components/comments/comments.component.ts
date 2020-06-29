import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { User } from "../../models/user";
import { Comment } from "../../models/comment";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { Model } from "../../models/model";
import { ModelService } from "../../services/model/model.service";
import { ToastController } from "@ionic/angular";
import { ProductService } from "../../services/product/product.service";
import { RestaurantService } from "../../services/restaurant/restaurant.service";
import { Product } from "../../models/product";
import { Restaurant } from "../../models/restaurant";

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.scss"],
})
export class CommentsComponent implements OnInit {
  @Input() comments: Comment[];
  @Input() user: User;
  @Input() category: string;
  @Input() idCategory: string;
  commentForm = new FormGroup({
    comment: new FormControl("", Validators.required),
  });
  constructor(
    private authService: AuthenticationService,
    private modelService: ModelService,
    private toast: ToastController,
    private productService: ProductService,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit() {}

  onSubmit() {
    let comment: Comment = {
      user_uid: this.authService.userData.uid,
      comment: this.comment.value,
      displayName: this.authService.userData.displayName,
    };
    this.commentForm.reset();
    if (this.category === "products") {
      this.productService.searchProduct(this.idCategory).subscribe((data) => {
        let product: Product = data;
        product.comments.push(comment);
        this.productService.updateProduct(this.idCategory, product).then(() => {
          this.comments = product.comments;
          this.presentToast("Comentario publicado");
        });
      });
    } else {
      if (this.category === "restaurants") {
        this.restaurantService
          .searchRestaurant(this.idCategory)
          .subscribe((data) => {
            let restaurant: Restaurant = data;
            restaurant.comments.push(comment);
            this.restaurantService
              .updateRestaurant(this.idCategory, restaurant)
              .then(() => {
                this.comments = restaurant.comments;
                this.presentToast("Comentario publicado");
              });
          });
      } else {
        let model: Model;
        this.modelService
          .getModel(this.category, this.idCategory)
          .subscribe((data) => {
            model = data;
            model.comments.push(comment);
            this.modelService
              .updateModel(this.idCategory, model, this.category)
              .then(() => {
                this.comments = model.comments;
                this.presentToast("Comentario publicado");
              });
          });
      }
    }
  }

  async presentToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 3000,
    });
    toast.present();
  }

  get comment() {
    return this.commentForm.get("comment");
  }
}
