import { Component, OnInit } from "@angular/core";
import { Book } from "src/app/shared/models/book";
import { Movie } from "src/app/shared/models/movie";
import { Serie } from "src/app/shared/models/serie";
import { Game } from "src/app/shared/models/game";
import { Music } from "src/app/shared/models/music";
import { Product } from "src/app/shared/models/product";
import { Restaurant } from "src/app/shared/models/restaurant";
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
import { MyRecommendations } from "src/app/shared/models/my-recommendations";
import { MovieDetailComponent } from "src/app/recommendations/categories/movie/movie-detail/movie-detail.component";
import { MusicDetailComponent } from "src/app/recommendations/categories/music/music-detail/music-detail.component";
import { SerieDetailComponent } from "src/app/recommendations/categories/tv-series/serie-detail/serie-detail.component";
import { BookDetailComponent } from "src/app/recommendations/categories/book/book-detail/book-detail.component";
import { GameDetailComponent } from "src/app/recommendations/categories/games/game-detail/game-detail.component";

@Component({
  selector: "app-my-collection",
  templateUrl: "./my-collection.component.html",
  styleUrls: ["./my-collection.component.scss"],
})
export class MyCollectionComponent implements OnInit {
  books: Book[] = [];
  movies: Movie[] = [];
  series: Serie[] = [];
  games: Game[] = [];
  musics: Music[] = [];
  products: Product[] = [];
  restaurants: Restaurant[] = [];
  collection: MyRecommendations;
  hasCollections: boolean = false;
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
      .getMyCollection(this.authService.userData.uid)
      .subscribe((data) => {
        this.collection = data;
        if (this.collection) {
          if (this.collection.books) {
            this.collection.books.forEach((bookId) => {
              this.bookService.getBooks(bookId).subscribe((res) => {
                this.hasCollections = true;
                this.books.push(res.items[0]);
              });
            });
          }

          if (this.collection.movies) {
            this.collection.movies.forEach((movieId) => {
              this.movieService.searchMovie(movieId).subscribe((movie) => {
                this.hasCollections = true;
                this.movies.push(movie);
              });
            });
          }

          if (this.collection.series) {
            this.collection.series.forEach((serieId) => {
              this.serieService.searchSerie(serieId).subscribe((serie) => {
                this.hasCollections = true;
                this.series.push(serie);
              });
            });
          }

          if (this.collection.games) {
            this.collection.games.forEach((gameId) => {
              this.gameService.searchGame(gameId).subscribe((game) => {
                this.hasCollections = true;
                this.games.push(game);
              });
            });
          }

          if (this.collection.musics) {
            this.collection.musics.forEach((musicId) => {
              this.musicService.searchMusic(musicId).subscribe((music) => {
                this.hasCollections = true;
                this.musics.push(music);
              });
            });
          }

          if (this.collection.restaurants) {
            this.collection.restaurants.forEach((restaurantId) => {
              this.restaurantService
                .searchRestaurant(restaurantId)
                .subscribe((restaurant) => {
                  this.hasCollections = true;
                  this.restaurants.push(restaurant);
                });
            });
          }

          if (this.collection.products) {
            this.collection.products.forEach((productId) => {
              this.productService
                .searchProduct(productId)
                .subscribe((product) => {
                  this.hasCollections = true;
                  this.products.push(product);
                });
            });
          }
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
}
