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
  constructor(
    private authService: AuthenticationService,
    private bookService: BookService,
    private gameService: GameService,
    private movieService: MovieService,
    private musicService: MusicService,
    private serieService: SerieService,
    private productService: ProductService,
    private restaurantService: RestaurantService,
    private userService: UserService
  ) {}

  ngOnInit() {}

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

  ionViewWillLeave() {
    this.books = [];
    this.movies = [];
    this.series = [];
    this.games = [];
    this.musics = [];
    this.products = [];
    this.restaurants = [];
  }
}
