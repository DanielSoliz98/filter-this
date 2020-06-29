import { Component, OnInit } from '@angular/core';
import { Restaurant } from 'src/app/shared/models/restaurant';
import { RestaurantService } from 'src/app/shared/services/restaurant/restaurant.service';
import { ModalController } from '@ionic/angular';
import { RestaurantDetailComponent } from 'src/app/shared/components/restaurant-detail/restaurant-detail.component';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss'],
})
export class RestaurantsComponent implements OnInit {

  restaurants: Restaurant[] = [];
  constructor(
    private restaurantService: RestaurantService,
    private modalController: ModalController
  ) {}

  ionViewWillEnter() {
    this.restaurantService.getAllRestaurant().subscribe((data) => {
      this.restaurants = data;
    });
  }

  ionViewWillLeave() {
    this.restaurants = [];
  }

  ngOnInit() {}

  async openRestaurantDetail(restaurant: Restaurant) {
    const modal = await this.modalController.create({
      component: RestaurantDetailComponent,
      componentProps: {
        restaurant: restaurant,
        showComments: true,
      },
    });
    return await modal.present();
  }
}
