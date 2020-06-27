import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { UserService } from '../../services/user/user.service';
import { Restaurant } from '../../models/restaurant';
import { User } from '../../models/user';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.scss'],
})
export class RestaurantDetailComponent implements OnInit {
  @Input() restaurant: Restaurant;
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
    private userService: UserService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    if (this.restaurant && this.showComments) {
      this.myRecommendation =
        this.restaurant.user_uid === this.authService.userData.uid ? true : false;
      this.userService.getUser(this.restaurant.user_uid).subscribe((dataUser) => {
        this.user = dataUser;
      });
    }

    this.userService
      .getMyCollection(this.authService.userData.uid)
      .subscribe((data) => {
        let inCollection = data.restaurants.find((restaurant) => restaurant === this.restaurant.id);
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
        collection.restaurants.push(this.restaurant.id);
        this.userService
          .updateMyCollection(this.authService.userData.uid, collection)
          .then(() => {
            this.dismiss();
            this.presentToast("Recomendacion guardada");
          });
      });
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
