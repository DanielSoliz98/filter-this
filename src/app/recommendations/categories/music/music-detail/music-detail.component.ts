import { Component, OnInit, Input } from "@angular/core";
import { Model } from "src/app/shared/models/model";
import { User } from "src/app/shared/models/user";
import { Music } from "src/app/shared/models/music";
import { ModalController, ToastController } from "@ionic/angular";
import { MusicService } from "src/app/shared/services/music/music.service";
import { AuthenticationService } from "src/app/shared/services/authentication/authentication.service";
import { UserService } from "src/app/shared/services/user/user.service";

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
        this.userService.getUser(data.user_uid).subscribe((dataUser) => {
          this.user = dataUser;
        });
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
        let user: User = { uid: music.user_uid, musics: [music.id] };
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
