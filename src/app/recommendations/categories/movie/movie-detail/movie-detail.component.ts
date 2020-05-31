import { Component, OnInit, Input } from "@angular/core";
import { Movie, MovieModel } from "src/app/shared/models/movie";
import { ModalController, ToastController } from "@ionic/angular";
import { GenreService } from "src/app/shared/services/genre/genre.service";
import { Genre } from "src/app/shared/models/genre";
import { MovieService } from "src/app/shared/services/movie/movie.service";
import { UserService } from "src/app/shared/services/user/user.service";
import { User } from "src/app/shared/models/user";

@Component({
  selector: "app-movie-detail",
  templateUrl: "./movie-detail.component.html",
  styleUrls: ["./movie-detail.component.scss"],
})
export class MovieDetailComponent implements OnInit {
  @Input() movie: Movie;
  genres: Genre[] = [];
  movieModel: MovieModel;
  user: User;

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private genreService: GenreService,
    private movieService: MovieService,
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
      if (data) {
        this.userService.getUser(data.user_uid).subscribe((dataUser) => {
          this.user = dataUser;
        });
      }
    });
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
