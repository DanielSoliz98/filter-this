import { Component, OnInit } from "@angular/core";
import { Music } from "src/app/shared/models/music";
import { MusicService } from "src/app/shared/services/music/music.service";
import { ModalController } from "@ionic/angular";
import { ModelService } from "src/app/shared/services/model/model.service";
import { Model } from "src/app/shared/models/model";
import { MusicDetailComponent } from "src/app/recommendations/categories/music/music-detail/music-detail.component";

@Component({
  selector: "app-musics",
  templateUrl: "./musics.component.html",
  styleUrls: ["./musics.component.scss"],
})
export class MusicsComponent implements OnInit {
  musics: Music[] = [];
  constructor(
    private modalController: ModalController,
    private modelService: ModelService,
    private musicService: MusicService
  ) {}
  ionViewWillEnter() {
    let musicsModel: Model[];
    this.modelService.getCollection("musics").subscribe((data) => {
      musicsModel = data;
      if (musicsModel) {
        musicsModel.forEach((music) => {
          this.musicService.searchMusic(music.id).subscribe((musicData) => {
            this.musics.push(musicData);
          });
        });
      }
    });
  }

  ionViewWillLeave() {
    this.musics = [];
  }
  ngOnInit() {}

  async openMusicDetail(music: Music) {
    const modal = await this.modalController.create({
      component: MusicDetailComponent,
      componentProps: {
        music: music,
        showComments: true,
      },
    });
    return await modal.present();
  }
}
