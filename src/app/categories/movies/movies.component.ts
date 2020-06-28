import { Component, OnInit } from "@angular/core";
import { Movie } from "src/app/shared/models/movie";
import { ModelService } from "src/app/shared/services/model/model.service";
import { MovieService } from "src/app/shared/services/movie/movie.service";
import { Model } from "src/app/shared/models/model";
import { ModalController } from "@ionic/angular";
import { MovieDetailComponent } from "src/app/recommendations/categories/movie/movie-detail/movie-detail.component";

@Component({
  selector: "app-movies",
  templateUrl: "./movies.component.html",
  styleUrls: ["./movies.component.scss"],
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  constructor(
    private modalController: ModalController,
    private modelService: ModelService,
    private movieService: MovieService
  ) {}

  ionViewWillEnter() {
    let moviesModel: Model[];
    this.modelService.getCollection("movies").subscribe((data) => {
      moviesModel = data;
      if (moviesModel) {
        moviesModel.forEach((movie) => {
          this.movieService.searchMovie(movie.id).subscribe((movieData) => {
            this.movies.push(movieData);
          });
        });
      }
    });
  }

  ionViewWillLeave() {
    this.movies = [];
  }

  ngOnInit() {}

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
}
