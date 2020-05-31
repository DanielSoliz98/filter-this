import { Component, OnInit, Input } from "@angular/core";
import { Movie } from "src/app/shared/models/movie";
import { ModalController, ToastController } from "@ionic/angular";

@Component({
  selector: "app-movie-detail",
  templateUrl: "./movie-detail.component.html",
  styleUrls: ["./movie-detail.component.scss"],
})
export class MovieDetailComponent implements OnInit {
  @Input() movie: Movie;

  constructor(
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    console.log(this.movie.genre_ids);
  }

  dismiss() {
    this.modalController.dismiss({
      dismissed: true,
    });
  }
}
