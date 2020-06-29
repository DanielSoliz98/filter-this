import { Component, OnInit, Input } from "@angular/core";
import { Model } from "src/app/shared/models/model";
import { User } from "src/app/shared/models/user";
import { Music } from "src/app/shared/models/music";
import { ModalController, ToastController } from "@ionic/angular";
import { MusicService } from "src/app/shared/services/music/music.service";
import { AuthenticationService } from "src/app/shared/services/authentication/authentication.service";
import { UserService } from "src/app/shared/services/user/user.service";
import { MyRecommendations } from "src/app/shared/models/my-recommendations";

@Component({
  selector: "app-music-detail",
  templateUrl: "./music-detail.component.html",
  styleUrls: ["./music-detail.component.scss"],
})
export class MusicDetailComponent implements OnInit {
  @Input() music: Music;
  @Input() showComments: boolean;
  musicModel: Model;
  user: User;
  saved: boolean;
  myRecommendation: boolean;

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private musicService: MusicService,
    private authService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.musicService.getMusic(this.music.id).subscribe((data) => {
      this.musicModel = data;
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
        let inCollection = data.musics.find((music) => music === this.music.id);
        if (!this.myRecommendation) {
          this.saved = inCollection ? true : false;
        } else {
          this.saved = false;
        }
      });
  }

  saveMusicRecommendation() {
    let music: Model = {
      user_uid: this.authService.userData.uid,
      id: this.music.id,
      comments: [],
      ratings: [],
    };
    this.musicService.addMusic(music).then(
      () => {
        this.userService
          .getMyRecommendations(music.user_uid)
          .subscribe((data) => {
            let recommendations = data as MyRecommendations;
            recommendations.musics.push(music.id);
            this.userService
              .updateMyRecommendations(music.user_uid, recommendations)
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
        collection.musics.push(this.music.id);
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
