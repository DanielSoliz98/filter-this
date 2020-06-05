import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { SerieDetailComponent } from '../serie-detail/serie-detail.component';
import { SerieService } from 'src/app/shared/services/serie/serie.service';
import { Serie } from 'src/app/shared/models/serie';

@Component({
  selector: "app-search-series",
  templateUrl: "./search-series.page.html",
  styleUrls: ["./search-series.page.scss"],
})
export class SearchSeriesPage implements OnInit {
  serieSearch = new FormGroup({
    serie: new FormControl("", Validators.required),
  });
  series: Serie[] = [];

  constructor(
    private serieService: SerieService,
    private modalCtrl: ModalController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.serieService.getSeries(this.serie.value).subscribe((data) => {
      this.series = data.results;
      this.serie.setValue("");
      if (data.results.length <= 0) {
        this.presentToast("No hay series");
      }
    });
  }

  async openSerieDetail(serie: Serie) {
    const modal = await this.modalCtrl.create({
      component: SerieDetailComponent,
      componentProps: {
        serie: serie,
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

  get serie(): AbstractControl {
    return this.serieSearch.get("serie");
  }
}
