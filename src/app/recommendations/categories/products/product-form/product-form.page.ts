import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import {
  ModalController,
  ToastController,
  LoadingController,
} from "@ionic/angular";
import { Plugins, CameraResultType, CameraSource } from "@capacitor/core";
import { ProductService } from "src/app/shared/services/product/product.service";
import { Product } from "src/app/shared/models/product";
import { AuthenticationService } from "src/app/shared/services/authentication/authentication.service";
import { UserService } from "src/app/shared/services/user/user.service";
import { MyRecommendations } from "src/app/shared/models/my-recommendations";

const { Camera } = Plugins;

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.page.html",
  styleUrls: ["./product-form.page.scss"],
})
export class ProductFormPage implements OnInit {
  categories: string[] = [
    "Casa y Jardin",
    "Ropa y Accesorios",
    "Electronicos",
    "Juguetes",
    "Salud y Belleza",
    "Entretenimiento",
    "Deportes",
    "Otros",
  ];
  productForm = new FormGroup({
    productName: new FormControl("", Validators.required),
    category: new FormControl("", Validators.required),
    price: new FormControl("", [
      Validators.required,
      Validators.pattern("^[0-9]+([,.][0-9]+)?$"),
      Validators.min(1),
    ]),
    description: new FormControl("", Validators.required),
    link: new FormControl("", Validators.required),
  });
  sliderConfig = {
    slidesPerView: 2,
  };
  images: string[] = [];
  constructor(
    private loadingController: LoadingController,
    private modalCtrl: ModalController,
    private toast: ToastController,
    private productService: ProductService,
    private authService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit() {}

  async onSubmit() {
    this.loading();
    let product: Product = {
      productName: this.productName.value,
      category: this.category.value,
      description: this.description.value,
      price: this.price.value,
      link: this.link.value,
      comments: [],
      ratings: [],
      user_uid: this.authService.userData.uid,
    };

    if (this.images.length > 0) {
      product.imagesURL = await this.productService.uploadImages(
        product.productName.replace(/\s/g, ""),
        this.images
      );
    }
    this.productService
      .addProduct(product)
      .then((dataProduct) => {
        product.id = dataProduct.id;
        this.productService.updateProduct(dataProduct.id, product);
        this.userService
          .getMyRecommendations(product.user_uid)
          .subscribe((data) => {
            let recommendations = data as MyRecommendations;
            recommendations.products.push(dataProduct.id);
            this.userService
              .updateMyRecommendations(product.user_uid, recommendations)
              .then(() => {
                this.dismissLoading();
                this.presentToast("Producto recomendado");
                this.dismiss();
              });
          });
      })
      .catch((error) => {
        this.presentToast(error.message);
      });
  }

  loading() {
    this.loadingController
      .create({
        message: "Publicando producto...",
      })
      .then((loading) => {
        loading.present();
      });
  }

  dismissLoading() {
    this.loadingController.dismiss();
  }

  uploadImage() {
    Camera.getPhoto({
      quality: 100,
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

  get productName(): AbstractControl {
    return this.productForm.get("productName");
  }

  get category(): AbstractControl {
    return this.productForm.get("category");
  }

  get price(): AbstractControl {
    return this.productForm.get("price");
  }

  get description(): AbstractControl {
    return this.productForm.get("description");
  }

  get link(): AbstractControl {
    return this.productForm.get("link");
  }
}
