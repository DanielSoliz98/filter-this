import { Component, OnInit } from "@angular/core";
import { Game } from "src/app/shared/models/game";
import { Model } from "src/app/shared/models/model";
import { ModalController } from "@ionic/angular";
import { ModelService } from "src/app/shared/services/model/model.service";
import { GameService } from "src/app/shared/services/game/game.service";
import { GameDetailComponent } from "src/app/recommendations/categories/games/game-detail/game-detail.component";

@Component({
  selector: "app-games",
  templateUrl: "./games.component.html",
  styleUrls: ["./games.component.scss"],
})
export class GamesComponent implements OnInit {
  games: Game[] = [];
  constructor(
    private modalController: ModalController,
    private modelService: ModelService,
    private gameService: GameService
  ) {}

  ionViewWillEnter() {
    let gamesModel: Model[];
    this.modelService.getCollection("games").subscribe((data) => {
      gamesModel = data;
      if (gamesModel) {
        gamesModel.forEach((game) => {
          this.gameService.searchGame(game.id).subscribe((gameData) => {
            this.games.push(gameData);
          });
        });
      }
    });
  }

  ionViewWillLeave() {
    this.games = [];
  }

  ngOnInit() {}

  async openGameDetail(game: Game) {
    const modal = await this.modalController.create({
      component: GameDetailComponent,
      componentProps: {
        game: game,
        showComments: true,
      },
    });
    return await modal.present();
  }
}
