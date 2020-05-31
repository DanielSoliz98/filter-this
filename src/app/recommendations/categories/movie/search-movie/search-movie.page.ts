import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { MovieService } from "src/app/shared/services/movie/movie.service";
import { Movie } from "src/app/shared/models/movie";
import { ModalController, ToastController } from "@ionic/angular";
import { MovieDetailComponent } from "../movie-detail/movie-detail.component";

@Component({
  selector: "app-search-movie",
  templateUrl: "./search-movie.page.html",
  styleUrls: ["./search-movie.page.scss"],
})
export class SearchMoviePage implements OnInit {
  movieSearch = new FormGroup({
    movie: new FormControl("", Validators.required),
  });
  movies: Movie[] = [];
  constructor(
    private movieService: MovieService,
    private modalCtrl: ModalController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  onSubmit() {
    console.log(this.movie.value);
    this.movieService.getMovies(this.movie.value).subscribe((data) => {
      this.movies = data.results;
      this.movie.setValue("");
      if (data.results.length <= 0) {
        this.presentToast("No hay peliculas");
      }
    });
  }

  async openMovieDetail(movie: Movie) {
    const modal = await this.modalCtrl.create({
      component: MovieDetailComponent,
      componentProps: {
        movie: movie,
      },
    });
    return await modal.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  get movie(): AbstractControl {
    return this.movieSearch.get("movie");
  }
}
