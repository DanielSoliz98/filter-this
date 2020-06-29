import { Component, OnInit } from "@angular/core";
import { Product } from "src/app/shared/models/product";
import { ProductService } from "src/app/shared/services/product/product.service";
import { ModalController } from "@ionic/angular";
import { ProductDetailComponent } from 'src/app/shared/components/product-detail/product-detail.component';

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  constructor(
    private productService: ProductService,
    private modalController: ModalController
  ) {}

  ionViewWillEnter() {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  ionViewWillLeave() {
    this.products = [];
  }

  ngOnInit() {}

  async openMovieDetail(product: Product) {
    const modal = await this.modalController.create({
      component: ProductDetailComponent,
      componentProps: {
        product: product,
        showComments: true,
      },
    });
    return await modal.present();
  }
}
