import { Component, OnInit, Input } from "@angular/core";
import { Movie, MovieModel } from "src/app/shared/models/movie";
import { ModalController, ToastController } from "@ionic/angular";
import { GenreService } from "src/app/shared/services/genre/genre.service";
import { Genre } from "src/app/shared/models/genre";
import { MovieService } from "src/app/shared/services/movie/movie.service";
import { User } from "src/app/shared/models/user";
import { AuthenticationService } from "src/app/shared/services/authentication/authentication.service";
import { UserService } from "src/app/shared/services/user/user.service";
import { MyRecommendations } from "src/app/shared/models/my-recommendations";

@Component({
  selector: "app-movie-detail",
  templateUrl: "./movie-detail.component.html",
  styleUrls: ["./movie-detail.component.scss"],
})
export class MovieDetailComponent implements OnInit {
  @Input() movie: Movie;
  @Input() showComments: boolean;
  genres: Genre[] = [];
  movieModel: MovieModel;
  user: User;
  saved: boolean;
  myRecommendation: boolean;

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private genreService: GenreService,
    private movieService: MovieService,
    private authService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    if (this.movie.genre_ids) {
      this.movie.genre_ids.forEach((value) => {
        this.genreService.getGenre(value).subscribe((data) => {
          this.genres.push(data as Genre);
        });
      });
    }
    this.movieService.getMovie(this.movie.id).subscribe((data) => {
      this.movieModel = data;
      if (data) {
        this.myRecommendation =
          data.user_uid === this.authService.userData.uid ? true : false;
        this.userService.getUser(data.user_uid).subscribe((dataUser) => {
          this.user = dataUser;
        });
      }
    });
    this.userService
      .getMyCollection(this.authService.userData.uid)
      .subscribe((data) => {
        if (data) {
          let inCollection = data.movies.find(
            (movie) => movie === this.movie.id
          );
          if (!this.myRecommendation) {
            this.saved = inCollection ? true : false;
          } else {
            this.saved = false;
          }
        } else {
          this.saved = false;
        }
      });
  }

  saveMovieRecommendation() {
    let movie: MovieModel = {
      user_uid: this.authService.userData.uid,
      id: this.movie.id,
      comments: [],
      scores: [],
      score: { like: 0, dislike: 0 },
    };
    this.movieService.addMovie(movie).then(
      () => {
        this.userService
          .getMyRecommendations(movie.user_uid)
          .subscribe((data) => {
            let recommendations = data as MyRecommendations;
            recommendations.movies.push(movie.id);
            this.userService
              .updateMyRecommendations(movie.user_uid, recommendations)
              .then(() => {
                this.dismiss();
                this.presentToast("Recomendacion publicada");
              });
          });
      },
      (err) => {
        this.presentToast("No se pudo publicar la recomendacion");
      }
    );
  }

  saveToMyCollection() {
    this.userService
      .getMyCollection(this.authService.userData.uid)
      .subscribe((data) => {
        let collection = data;
        collection.movies.push(this.movie.id);
        this.userService
          .updateMyCollection(this.authService.userData.uid, collection)
          .then(() => {
            this.presentToast("Recomendacion guardada");
          });
      });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
