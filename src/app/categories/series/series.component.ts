import { Component, OnInit } from "@angular/core";
import { Serie } from "src/app/shared/models/serie";
import { ModalController } from "@ionic/angular";
import { ModelService } from "src/app/shared/services/model/model.service";
import { SerieService } from "src/app/shared/services/serie/serie.service";
import { Model } from "src/app/shared/models/model";
import { SerieDetailComponent } from "src/app/recommendations/categories/tv-series/serie-detail/serie-detail.component";

@Component({
  selector: "app-series",
  templateUrl: "./series.component.html",
  styleUrls: ["./series.component.scss"],
})
export class SeriesComponent implements OnInit {
  series: Serie[] = [];
  constructor(
    private modalController: ModalController,
    private modelService: ModelService,
    private serieService: SerieService
  ) {}

  ionViewWillEnter() {
    let seriesModel: Model[];
    this.modelService.getCollection("series").subscribe((data) => {
      seriesModel = data;
      if (seriesModel) {
        seriesModel.forEach((serie) => {
          this.serieService.searchSerie(serie.id).subscribe((serieData) => {
            this.series.push(serieData);
          });
        });
      }
    });
  }

  ionViewWillLeave() {
    this.series = [];
  }

  ngOnInit() {}

  async openSerieDetail(serie: Serie) {
    const modal = await this.modalController.create({
      component: SerieDetailComponent,
      componentProps: {
        serie: serie,
        showComments: true,
      },
    });
    return await modal.present();
  }
}
