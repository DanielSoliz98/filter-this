import { Component, OnInit, Input } from "@angular/core";
import { Movie } from "src/app/shared/models/movie";
import { ModalController, ToastController } from "@ionic/angular";
import { GenreService } from "src/app/shared/services/genre/genre.service";
import { Genre } from "src/app/shared/models/genre";

@Component({
  selector: "app-movie-detail",
  templateUrl: "./movie-detail.component.html",
  styleUrls: ["./movie-detail.component.scss"],
})
export class MovieDetailComponent implements OnInit {
  @Input() movie: Movie;
  genres: Genre[] = [];

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private genreService: GenreService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    console.log(this.movie.genre_ids);
    this.movie.genre_ids.forEach((value) => {
      this.genreService.getGenre(value).subscribe((data) => {
        this.genres.push(data as Genre);
      });
    });
    console.log(this.genres);
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
