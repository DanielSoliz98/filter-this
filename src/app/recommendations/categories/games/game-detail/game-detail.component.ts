import { Component, OnInit, Input } from "@angular/core";
import { Game } from "src/app/shared/models/game";
import { Model } from "src/app/shared/models/model";
import { ModalController, ToastController } from "@ionic/angular";
import { GameService } from "src/app/shared/services/game/game.service";
import { AuthenticationService } from "src/app/shared/services/authentication/authentication.service";
import { User } from "src/app/shared/models/user";
import { UserService } from "src/app/shared/services/user/user.service";

@Component({
  selector: "app-game-detail",
  templateUrl: "./game-detail.component.html",
  styleUrls: ["./game-detail.component.scss"],
})
export class GameDetailComponent implements OnInit {
  @Input() game: Game;
  @Input() showComments: boolean;
  gameModel: Model;
  user: User;

  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private gameService: GameService,
    private authService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.gameService.getGame(this.game.id).subscribe((data) => {
      this.gameModel = data;
      if (data && this.showComments) {
        this.userService.getUser(data.user_uid).subscribe((dataUser) => {
          this.user = dataUser;
        });
      }
    });
  }

  saveGameRecommendation() {
    let game: Model = {
      user_uid: this.authService.userData.uid,
      id: this.game.id,
      comments: [],
      ratings: [],
    };
    this.gameService.addGame(game).then(
      () => {
        let user: User = { uid: game.user_uid, games: [game.id] };
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
