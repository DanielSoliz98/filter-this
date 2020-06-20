import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Coordinates } from 'src/app/shared/models/coordinates';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  shares: boolean = false;
  @Output() ubication = new EventEmitter<Coordinates>();
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  shareUbication(latitude: string, longitude: string) {
    this.ubication.emit({ latitude, longitude });
  }

}
