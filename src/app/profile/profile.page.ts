import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../shared/services/authentication/authentication.service";
import { User } from "../shared/models/user";
import { PopoverController } from "@ionic/angular";
import { OptionsComponent } from "./options/options.component";
import { AngularFireAuth } from "@angular/fire/auth";
import { UserService } from "../shared/services/user/user.service";
import { BookService } from "../shared/services/book/book.service";
import { Book } from "../shared/models/book";
import { MovieService } from "../shared/services/movie/movie.service";
import { Movie } from "../shared/models/movie";
import { Serie } from "../shared/models/serie";
import { SerieService } from "../shared/services/serie/serie.service";
import { Game } from "../shared/models/game";
import { GameService } from "../shared/services/game/game.service";
import { Music } from "../shared/models/music";
import { MusicService } from "../shared/services/music/music.service";
import { Product } from "../shared/models/product";
import { Restaurant } from "../shared/models/restaurant";
import { ProductService } from "../shared/services/product/product.service";
import { RestaurantService } from "../shared/services/restaurant/restaurant.service";
import { MyRecommendations } from "../shared/models/my-recommendations";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  books: Book[] = [];
  movies: Movie[] = [];
  series: Serie[] = [];
  games: Game[] = [];
  musics: Music[] = [];
  products: Product[] = [];
  restaurants: Restaurant[] = [];
  recommendations: MyRecommendations;
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
    private popoverController: PopoverController
  ) {}

  ngOnInit() {}

  ionViewWillLeave() {
    this.books = [];
    this.movies = [];
    this.series = [];
    this.games = [];
    this.musics = [];
    this.products = [];
    this.restaurants = [];
  }

  ionViewWillEnter() {
    this.userService
      .getMyRecommendations(this.authService.userData.uid)
      .subscribe((data) => {
        this.recommendations = data;
        if (this.recommendations.books) {
          this.recommendations.books.forEach((bookId) => {
            this.bookService.getBooks(bookId).subscribe((res) => {
              this.books.push(res.items[0]);
            });
          });
        }

        if (this.recommendations.movies) {
          this.recommendations.movies.forEach((movieId) => {
            this.movieService.searchMovie(movieId).subscribe((movie) => {
              this.movies.push(movie);
            });
          });
        }

        if (this.recommendations.series) {
          this.recommendations.series.forEach((serieId) => {
            this.serieService.searchSerie(serieId).subscribe((serie) => {
              this.series.push(serie);
            });
          });
        }

        if (this.recommendations.games) {
          this.recommendations.games.forEach((gameId) => {
            this.gameService.searchGame(gameId).subscribe((game) => {
              this.games.push(game);
            });
          });
        }

        if (this.recommendations.musics) {
          this.recommendations.musics.forEach((musicId) => {
            this.musicService.searchMusic(musicId).subscribe((music) => {
              this.musics.push(music);
            });
          });
        }

        if (this.recommendations.restaurants) {
          this.restaurantService
            .getRestaurants(this.authService.userData.uid)
            .subscribe((data) => {
              this.restaurants = data;
            });
        }

        if (this.recommendations.products) {
          this.productService
            .getProducts(this.authService.userData.uid)
            .subscribe((data) => {
              this.products = data;
            });
        }
      });
  }

  async showOptions(ev) {
    const popover = await this.popoverController.create({
      component: OptionsComponent,
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }
}
