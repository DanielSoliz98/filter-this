import { Component, OnInit, Input } from "@angular/core";
import { Product } from "../../models/product";
import { User } from "../../models/user";
import { ModalController, ToastController } from "@ionic/angular";
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { UserService } from "../../services/user/user.service";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
  @Input() product: Product;
  @Input() showComments: boolean;
  user: User;
  saved: boolean;
  myRecommendation: boolean;
  sliderConfig = {
    slidesPerView: 1,
  };
  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private authService: AuthenticationService,
    private userService: UserService,
    private iab: InAppBrowser
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    if (this.product && this.showComments) {
      this.myRecommendation =
        this.product.user_uid === this.authService.userData.uid ? true : false;
      this.userService.getUser(this.product.user_uid).subscribe((dataUser) => {
        this.user = dataUser;
      });
    }

    this.userService
      .getMyCollection(this.authService.userData.uid)
      .subscribe((data) => {
        let inCollection = data.products.find(
          (product) => product === this.product.id
        );
        if (!this.myRecommendation) {
          this.saved = inCollection ? true : false;
        } else {
          this.saved = false;
        }
      });
  }

  saveToMyCollection() {
    this.userService
      .getMyCollection(this.authService.userData.uid)
      .subscribe((data) => {
        let collection = data;
        collection.products.push(this.product.id);
        this.userService
          .updateMyCollection(this.authService.userData.uid, collection)
          .then(() => {
            this.dismiss();
            this.presentToast("Recomendacion guardada");
          });
      });
  }
  openLink(link: string) {
    this.iab.create(link, "_blank");
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
