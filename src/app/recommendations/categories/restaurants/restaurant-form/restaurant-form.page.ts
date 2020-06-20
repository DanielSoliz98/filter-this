import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import {
  LoadingController,
  ModalController,
  ToastController,
} from "@ionic/angular";
import { AuthenticationService } from "src/app/shared/services/authentication/authentication.service";
import { Plugins, CameraResultType, CameraSource } from "@capacitor/core";
import { RestaurantService } from "src/app/shared/services/restaurant/restaurant.service";
import { Restaurant } from "src/app/shared/models/restaurant";
import { Coordinates } from "src/app/shared/models/coordinates";

const { Camera } = Plugins;

@Component({
  selector: "app-restaurant-form",
  templateUrl: "./restaurant-form.page.html",
  styleUrls: ["./restaurant-form.page.scss"],
})
export class RestaurantFormPage implements OnInit {
  foodsAvailables: string[] = [
    "Pollo",
    "Carnes",
    "Hamburguesas",
    "Ensaladas",
    "Licuados y Jugos",
    "Cafeteria",
    "Posters",
    "Helados",
    "Pizzas",
    "Comida Nacional",
    "Comida Mexicana",
    "Comida Internacional",
  ];
  restaurantForm = new FormGroup({
    restaurantName: new FormControl("", Validators.required),
    foods: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    ubication: new FormControl("", Validators.required),
  });
  sliderConfig = {
    slidesPerView: 3,
  };
  images: string[] = [];
  constructor(
    private loadingController: LoadingController,
    private modalCtrl: ModalController,
    private toast: ToastController,
    private restaurantService: RestaurantService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {}

  async onSubmit() {
    this.loading();
    let restaurant: Restaurant = {
      restaurantName: this.restaurantName.value,
      foods: this.foods.value,
      description: this.description.value,
      ubication: this.ubication.value,
      comments: [],
      ratings: [],
      user_uid: this.authService.userData.uid,
    };

    if (this.images.length > 0) {
      restaurant.imagesURL = await this.restaurantService.uploadImages(
        restaurant.restaurantName.replace(/\s/g, ""),
        this.images
      );
    }
    this.restaurantService
      .addRestaurant(restaurant)
      .then(() => {
        this.dismissLoading();
        this.presentToast("Restaurante recomendado");
        this.dismiss();
      })
      .catch((error) => {
        this.presentToast(error.message);
      });
  }

  saveUbication(coord: Coordinates) {
    this.ubication.setValue([coord.latitude, coord.longitude]);
  }

  uploadImage() {
    Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      saveToGallery: true,
      correctOrientation: true,
      source: CameraSource.Photos,
      resultType: CameraResultType.DataUrl,
    }).then(
      (cameraPhoto) => {
        this.images.push(cameraPhoto.dataUrl);
      },
      (error) => {
        this.presentToast(JSON.stringify(error));
        console.log("ERROR -> " + JSON.stringify(error));
      }
    );
  }

  loading() {
    this.loadingController
      .create({
        message: "Publicando restaurante...",
      })
      .then((loading) => {
        loading.present();
      });
  }

  dismissLoading() {
    this.loadingController.dismiss();
  }

  async presentToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 3000,
    });
    toast.present();
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  get restaurantName(): AbstractControl {
    return this.restaurantForm.get("restaurantName");
  }

  get foods(): AbstractControl {
    return this.restaurantForm.get("foods");
  }

  get description(): AbstractControl {
    return this.restaurantForm.get("description");
  }

  get ubication(): AbstractControl {
    return this.restaurantForm.get("ubication");
  }
}
