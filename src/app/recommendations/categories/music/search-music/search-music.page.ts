import { Component, OnInit } from '@angular/core';
import { MusicDetailComponent } from '../music-detail/music-detail.component';
import { Music } from 'src/app/shared/models/music';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { MusicService } from 'src/app/shared/services/music/music.service';

@Component({
  selector: 'app-search-music',
  templateUrl: './search-music.page.html',
  styleUrls: ['./search-music.page.scss'],
})
export class SearchMusicPage implements OnInit {

  musicSearch = new FormGroup({
    music: new FormControl("", Validators.required),
  });
  musics: Music[] = [];
  constructor(
    private musicService: MusicService,
    private modalCtrl: ModalController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.musicService.getMusics(this.music.value).subscribe((data) => {
      this.musics = data.data;
      this.music.setValue("");
      if (data.data.length <= 0) {
        this.presentToast("No hay musicas");
      }
    });
  }

  async openMusicDetail(music: Music) {
    const modal = await this.modalCtrl.create({
      component: MusicDetailComponent,
      componentProps: {
        music: music,
        showComments: false,
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

  get music(): AbstractControl {
    return this.musicSearch.get("music");
  }

}
