import { Component, OnInit } from "@angular/core";
import { Book } from "src/app/shared/models/book";
import { Movie } from "src/app/shared/models/movie";
import { Serie } from "src/app/shared/models/serie";
import { Game } from "src/app/shared/models/game";
import { Music } from "src/app/shared/models/music";
import { Product } from "src/app/shared/models/product";
import { Restaurant } from "src/app/shared/models/restaurant";
import { MyRecommendations } from "src/app/shared/models/my-recommendations";
import { AuthenticationService } from "src/app/shared/services/authentication/authentication.service";
import { BookService } from "src/app/shared/services/book/book.service";
import { GameService } from "src/app/shared/services/game/game.service";
import { MovieService } from "src/app/shared/services/movie/movie.service";
import { MusicService } from "src/app/shared/services/music/music.service";
import { SerieService } from "src/app/shared/services/serie/serie.service";
import { ProductService } from "src/app/shared/services/product/product.service";
import { RestaurantService } from "src/app/shared/services/restaurant/restaurant.service";
import { UserService } from "src/app/shared/services/user/user.service";
import { ModalController } from "@ionic/angular";
import { MovieDetailComponent } from "src/app/recommendations/categories/movie/movie-detail/movie-detail.component";
import { MusicDetailComponent } from "src/app/recommendations/categories/music/music-detail/music-detail.component";
import { SerieDetailComponent } from "src/app/recommendations/categories/tv-series/serie-detail/serie-detail.component";
import { BookDetailComponent } from "src/app/recommendations/categories/book/book-detail/book-detail.component";
import { GameDetailComponent } from "src/app/recommendations/categories/games/game-detail/game-detail.component";
import { ProductDetailComponent } from "src/app/shared/components/product-detail/product-detail.component";
import { RestaurantDetailComponent } from "src/app/shared/components/restaurant-detail/restaurant-detail.component";

@Component({
  selector: "app-my-recommendations",
  templateUrl: "./my-recommendations.component.html",
  styleUrls: ["./my-recommendations.component.scss"],
})
export class MyRecommendationsComponent implements OnInit {
  books: Book[] = [];
  movies: Movie[] = [];
  series: Serie[] = [];
  games: Game[] = [];
  musics: Music[] = [];
  products: Product[] = [];
  restaurants: Restaurant[] = [];
  recommendations: MyRecommendations;
  hasRecommendations: boolean = false;
  constructor(
    private authService: AuthenticationService,
    private bookService: BookService,
    private gameService: GameService,
    private movieService: MovieService,
    private musicService: MusicService,
    private serieService: SerieService,
    private productService: ProductService,
    private restaurantService: RestaurantService,
    private userService: UserService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.userService
      .getMyRecommendations(this.authService.userData.uid)
      .subscribe((data) => {
        this.recommendations = data;
        if (this.recommendations.books.length > 0) {
          this.recommendations.books.forEach((bookId) => {
            this.bookService.getBooks(bookId).subscribe((res) => {
              this.books.push(res.items[0]);
              this.hasRecommendations = true;
            });
          });
        }

        if (this.recommendations.movies.length > 0) {
          this.recommendations.movies.forEach((movieId) => {
            this.movieService.searchMovie(movieId).subscribe((movie) => {
              this.movies.push(movie);
              this.hasRecommendations = true;
            });
          });
        }

        if (this.recommendations.series.length > 0) {
          this.recommendations.series.forEach((serieId) => {
            this.serieService.searchSerie(serieId).subscribe((serie) => {
              this.series.push(serie);
              this.hasRecommendations = true;
            });
          });
        }

        if (this.recommendations.games.length > 0) {
          this.recommendations.games.forEach((gameId) => {
            this.gameService.searchGame(gameId).subscribe((game) => {
              this.games.push(game);
              this.hasRecommendations = true;
            });
          });
        }

        if (this.recommendations.musics.length > 0) {
          this.recommendations.musics.forEach((musicId) => {
            this.musicService.searchMusic(musicId).subscribe((music) => {
              this.musics.push(music);
              this.hasRecommendations = true;
            });
          });
        }

        if (this.recommendations.restaurants.length > 0) {
          this.restaurantService
            .getRestaurants(this.authService.userData.uid)
            .subscribe((data) => {
              this.restaurants = data;
              this.hasRecommendations = true;
            });
        }

        if (this.recommendations.products.length > 0) {
          this.productService
            .getProducts(this.authService.userData.uid)
            .subscribe((data) => {
              this.products = data;
              this.hasRecommendations = true;
            });
        }
      });
  }

  ionViewWillLeave() {
    this.books = [];
    this.movies = [];
    this.series = [];
    this.games = [];
    this.musics = [];
    this.products = [];
    this.restaurants = [];
  }

  async openMovie(movie: Movie) {
    const modal = await this.modalCtrl.create({
      component: MovieDetailComponent,
      componentProps: {
        movie: movie,
        showComments: true,
      },
    });
    return await modal.present();
  }

  async openMusic(music: Music) {
    const modal = await this.modalCtrl.create({
      component: MusicDetailComponent,
      componentProps: {
        music: music,
        showComments: true,
      },
    });
    return await modal.present();
  }

  async openSerie(serie: Serie) {
    const modal = await this.modalCtrl.create({
      component: SerieDetailComponent,
      componentProps: {
        serie: serie,
        showComments: true,
      },
    });
    return await modal.present();
  }

  async openBook(book: Book) {
    const modal = await this.modalCtrl.create({
      component: BookDetailComponent,
      componentProps: {
        book: book,
        showComments: true,
      },
    });
    return await modal.present();
  }

  async openGame(game: Game) {
    const modal = await this.modalCtrl.create({
      component: GameDetailComponent,
      componentProps: {
        game: game,
        showComments: true,
      },
    });
    return await modal.present();
  }

  async openProduct(product: Product) {
    const modal = await this.modalCtrl.create({
      component: ProductDetailComponent,
      componentProps: {
        product: product,
        showComments: true,
      },
    });
    return await modal.present();
  }

  async openRestaurant(restaurant: Restaurant) {
    const modal = await this.modalCtrl.create({
      component: RestaurantDetailComponent,
      componentProps: {
        restaurant: restaurant,
        showComments: true,
      },
    });
    return await modal.present();
  }
}
