import { Component, OnInit, Input } from "@angular/core";
import { Game } from "src/app/shared/models/game";
import { Model } from "src/app/shared/models/model";
import { ModalController, ToastController } from "@ionic/angular";
import { GameService } from "src/app/shared/services/game/game.service";
import { AuthenticationService } from "src/app/shared/services/authentication/authentication.service";
import { User } from "src/app/shared/models/user";
import { UserService } from "src/app/shared/services/user/user.service";
import { MyRecommendations } from "src/app/shared/models/my-recommendations";

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
  saved: boolean;
  myRecommendation: boolean;

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
        let inCollection = data.games.find((game) => game === this.game.id);
        if (!this.myRecommendation) {
          this.saved = inCollection ? true : false;
        } else {
          this.saved = false;
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
        this.userService
          .getMyRecommendations(game.user_uid)
          .subscribe((data) => {
            let recommendations = data as MyRecommendations;
            recommendations.games.push(game.id);
            this.userService
              .updateMyRecommendations(game.user_uid, recommendations)
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
        collection.games.push(this.game.id);
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
