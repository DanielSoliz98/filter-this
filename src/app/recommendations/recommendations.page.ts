import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MovieService } from "../shared/services/movie/movie.service";
import { ModelService } from "../shared/services/model/model.service";
import { Movie } from "../shared/models/movie";
import { Serie } from "../shared/models/serie";
import { SerieService } from "../shared/services/serie/serie.service";
import { ProductService } from "../shared/services/product/product.service";
import { RestaurantService } from "../shared/services/restaurant/restaurant.service";
import { Product } from "../shared/models/product";
import { Restaurant } from "../shared/models/restaurant";
import { ModalController } from "@ionic/angular";
import { MovieDetailComponent } from "./categories/movie/movie-detail/movie-detail.component";
import { SerieDetailComponent } from "./categories/tv-series/serie-detail/serie-detail.component";
import { ProductDetailComponent } from "../shared/components/product-detail/product-detail.component";
import { RestaurantDetailComponent } from "../shared/components/restaurant-detail/restaurant-detail.component";

@Component({
  selector: "app-recommendations",
  templateUrl: "./recommendations.page.html",
  styleUrls: ["./recommendations.page.scss"],
})
export class RecommendationsPage implements OnInit {
  constructor(
    private router: Router,
    private movieService: MovieService,
    private serieService: SerieService,
    private modelService: ModelService,
    private productService: ProductService,
    private restaurantServie: RestaurantService,
    private modalController: ModalController
  ) {}
  movies: Movie[] = [];
  series: Serie[] = [];
  products: Product[] = [];
  restaurants: Restaurant[] = [];
  sliderConfig = {
    slidesPerView: 2,
  };
  ngOnInit() {}

  ionViewWillEnter() {
    this.movieService.getMoviesSaved().subscribe((data) => {
      console.log(data);
      data.forEach((movie) => {
        if (movie.score.like > movie.score.dislike) {
          this.movieService.searchMovie(movie.id).subscribe((movieData) => {
            this.movies.push(movieData);
          });
        }
      });
    });
    console.log(this.movies);
    this.modelService.getCollection("series").subscribe((data) => {
      data.forEach((serie) => {
        if (serie.score.like > serie.score.dislike) {
          this.serieService.searchSerie(serie.id).subscribe((serieData) => {
            this.series.push(serieData);
          });
        }
      });
    });

    this.productService.getAllProducts().subscribe((data) => {
      data.forEach((product) => {
        if (product.score.like > product.score.dislike) {
          this.products.push(product);
        }
      });
    });

    this.restaurantServie.getAllRestaurant().subscribe((data) => {
      data.forEach((restaurant) => {
        if (restaurant.score.like > restaurant.score.dislike) {
          this.restaurants.push(restaurant);
        }
      });
    });
  }

  async openMovieDetail(movie: Movie) {
    const modal = await this.modalController.create({
      component: MovieDetailComponent,
      componentProps: {
        movie: movie,
        showComments: true,
      },
    });
    return await modal.present();
  }

  async openSerieDetail(serie: Serie) {
    const modal = await this.modalController.create({
      component: SerieDetailComponent,
      componentProps: {
        serie: serie,
        showComments: true,
      },
    });
    return await modal.present();
  }

  async openProductDetail(product: Product) {
    const modal = await this.modalController.create({
      component: ProductDetailComponent,
      componentProps: {
        product: product,
        showComments: true,
      },
    });
    return await modal.present();
  }

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

  ionViewWillLeave() {
    this.movies = [];
    this.series = [];
    this.products = [];
    this.restaurants = [];
  }

  goToCategories() {
    this.router.navigateByUrl("/app/tabs/recommendations/categories");
  }
}
