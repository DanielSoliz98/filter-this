import { Component, OnInit } from "@angular/core";
import { GameDetailComponent } from "../game-detail/game-detail.component";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { Game } from "src/app/shared/models/game";
import { GameService } from "src/app/shared/services/game/game.service";
import { ModalController, ToastController } from "@ionic/angular";

@Component({
  selector: "app-search-game",
  templateUrl: "./search-game.page.html",
  styleUrls: ["./search-game.page.scss"],
})
export class SearchGamePage implements OnInit {
  gameSearch = new FormGroup({
    game: new FormControl("", Validators.required),
  });
  games: Game[] = [];
  constructor(
    private gameService: GameService,
    private modalCtrl: ModalController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.gameService.getGames(this.game.value).subscribe((data) => {
      this.games = data.results as Game[];
      this.game.setValue("");
      if (data.results.length <= 0) {
        this.presentToast("No hay juegos");
      }
    });
  }

  async openGameDetail(game: Game) {
    const modal = await this.modalCtrl.create({
      component: GameDetailComponent,
      componentProps: {
        game: game as Game,
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

  get game(): AbstractControl {
    return this.gameSearch.get("game");
  }
}
