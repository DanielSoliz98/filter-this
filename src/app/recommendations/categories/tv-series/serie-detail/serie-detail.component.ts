import { Component, OnInit, Input } from "@angular/core";
import { Serie, SerieModel } from 'src/app/shared/models/serie';
import { Genre } from 'src/app/shared/models/genre';
import { ModalController, ToastController } from '@ionic/angular';
import { GenreService } from 'src/app/shared/services/genre/genre.service';
import { SerieService } from 'src/app/shared/services/serie/serie.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { AuthenticationService } from 'src/app/shared/services/authentication/authentication.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: "app-serie-detail",
  templateUrl: "./serie-detail.component.html",
  styleUrls: ["./serie-detail.component.scss"],
})
export class SerieDetailComponent implements OnInit {
  @Input() serie: Serie;
  genres: Genre[] = [];
  serieModel: SerieModel;
  user: User;
  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private genreService: GenreService,
    private serieService: SerieService,
    private userService: UserService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.serie.genre_ids.forEach((value) => {
      this.genreService.getGenre(value).subscribe((data) => {
        this.genres.push(data as Genre);
      });
    });
    this.serieService.getSerie(this.serie.id).subscribe((data) => {
      this.serieModel = data;
      if (data) {
        this.userService.getUser(data.user_uid).subscribe((dataUser) => {
          this.user = dataUser;
        });
      }
    });
  }

  saveSerieRecommendation() {
    let serie: SerieModel = {
      user_uid: this.authService.userData.uid,
      id: this.serie.id,
      comments: [],
      ratings: [],
    };
    this.serieService.addSerie(serie).then(
      () => {
        this.dismiss();
        this.presentToast("Recomendacion publicada");
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
