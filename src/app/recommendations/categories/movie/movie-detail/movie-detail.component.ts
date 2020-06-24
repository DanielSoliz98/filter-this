import { Component, OnInit, Input } from "@angular/core";
import { Movie, MovieModel } from "src/app/shared/models/movie";
import { ModalController, ToastController } from "@ionic/angular";
import { GenreService } from "src/app/shared/services/genre/genre.service";
import { Genre } from "src/app/shared/models/genre";
import { MovieService } from "src/app/shared/services/movie/movie.service";
import { User } from "src/app/shared/models/user";
import { AuthenticationService } from "src/app/shared/services/authentication/authentication.service";
import { UserService } from "src/app/shared/services/user/user.service";

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
    this.movie.genre_ids.forEach((value) => {
      this.genreService.getGenre(value).subscribe((data) => {
        this.genres.push(data as Genre);
      });
    });
    this.movieService.getMovie(this.movie.id).subscribe((data) => {
      this.movieModel = data;
      if (data && this.showComments) {
        this.userService.getUser(data.user_uid).subscribe((dataUser) => {
          this.user = dataUser;
        });
      }
    });
  }

  saveMovieRecommendation() {
    let movie: MovieModel = {
      user_uid: this.authService.userData.uid,
      id: this.movie.id,
      comments: [],
      ratings: [],
    };
    this.movieService.addMovie(movie).then(
      () => {
        let user: User = { uid: movie.user_uid, movies: [movie.id] };
        this.userService.updateDataUser(user).then(() => {
          this.dismiss();
          this.presentToast("Recomendacion publicada");
        });
      },
      (err) => {
        this.presentToast("No se pudo publicar la recomendacion");
      }
    );
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
