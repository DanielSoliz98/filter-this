import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { ModalController } from "@ionic/angular";

import { Plugins } from "@capacitor/core";
const { Geolocation } = Plugins;

declare var google;

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit {
  shared: boolean = false;
  showMap: boolean = false;
  @Output() ubication = new EventEmitter<string[]>();
  @ViewChild("map", { static: false }) mapElement: ElementRef;
  map: any;
  markerMap: any;
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async loadMap() {
    this.showMap = true;
    this.shared = true;
    let position = await Geolocation.getCurrentPosition();
    //let latLng = new google.maps.LatLng("-17.402812", "-66.107563");
    let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.SATELLITE,
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    const htmlElement = this.mapElement.nativeElement as HTMLElement;
    htmlElement.setAttribute("style", "height: 30vh");

    google.maps.event.addListener(this.map, "click", (event) => {
      this.addMarker(event.latLng);
    });
    this.addMarker(latLng);
  }

  addMarker(location) {
    if (this.markerMap) {
      this.markerMap.setMap(null);
    }

    var marker = new google.maps.Marker({
      position: location,
      map: this.map,
      animation: google.maps.Animation.DROP,
    });
    this.markerMap = marker;
    let coord: string = location.toString();
    coord = coord.replace("(", "");
    coord = coord.replace(")", "");
    coord = coord.replace(" ", "");
    this.ubication.emit(coord.split(","));
  }

  saveUbication() {
    console.log(this.markerMap);
  }
}
