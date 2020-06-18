import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { Plugins, CameraResultType, CameraSource } from "@capacitor/core";

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
  });
  sliderConfig = {
    slidesPerView: 3,
  };
  images: string[] = [];
  constructor(
    private modalCtrl: ModalController,
    private toast: ToastController
  ) {}

  ngOnInit() {}

  onSubmit() {
    console.log(this.productName.value);
    console.log(this.category.value);
    console.log(this.price.value);
    console.log(this.description.value);
    console.log(this.images);
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
        console.log(cameraPhoto.dataUrl);
        this.images.push(cameraPhoto.dataUrl);
      },
      (error) => {
        this.presentToast(JSON.stringify(error));
        console.log("ERROR -> " + JSON.stringify(error));
      }
    );
  }

  dataURItoBlob(dataURI) {
    let binary = atob(dataURI.split(",")[1]);
    let array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: "image/jpeg" });
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
}
