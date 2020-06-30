import { Component, OnInit, Input } from "@angular/core";
import { Serie, SerieModel } from "src/app/shared/models/serie";
import { Genre } from "src/app/shared/models/genre";
import { ModalController, ToastController } from "@ionic/angular";
import { GenreService } from "src/app/shared/services/genre/genre.service";
import { SerieService } from "src/app/shared/services/serie/serie.service";
import { AuthenticationService } from "src/app/shared/services/authentication/authentication.service";
import { User } from "src/app/shared/models/user";
import { UserService } from "src/app/shared/services/user/user.service";
import { MyRecommendations } from "src/app/shared/models/my-recommendations";

@Component({
  selector: "app-serie-detail",
  templateUrl: "./serie-detail.component.html",
  styleUrls: ["./serie-detail.component.scss"],
})
export class SerieDetailComponent implements OnInit {
  @Input() serie: Serie;
  @Input() showComments: boolean;
  genres: Genre[] = [];
  serieModel: SerieModel;
  user: User;
  saved: boolean;
  myRecommendation: boolean;
  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private genreService: GenreService,
    private serieService: SerieService,
    private authService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    if (this.serie.genre_ids) {
      this.serie.genre_ids.forEach((value) => {
        this.genreService.getGenre(value).subscribe((data) => {
          this.genres.push(data as Genre);
        });
      });
    }
    this.serieService.getSerie(this.serie.id).subscribe((data) => {
      this.serieModel = data;
      if (data && this.showComments) {
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
        let inCollection = data.series.find((serie) => serie === this.serie.id);
        if (!this.myRecommendation) {
          this.saved = inCollection ? true : false;
        } else {
          this.saved = false;
        }
      });
  }

  saveSerieRecommendation() {
    let serie: SerieModel = {
      user_uid: this.authService.userData.uid,
      id: this.serie.id,
      comments: [],
      scores: [],
      score: 0,
    };
    this.serieService.addSerie(serie).then(
      () => {
        this.userService
          .getMyRecommendations(serie.user_uid)
          .subscribe((data) => {
            let recommendations = data as MyRecommendations;
            recommendations.series.push(serie.id);
            this.userService
              .updateMyRecommendations(serie.user_uid, recommendations)
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
        collection.series.push(this.serie.id);
        this.userService
          .updateMyCollection(this.authService.userData.uid, collection)
          .then(() => {
            this.dismiss();
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
