import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";
import { Coordinates } from "../../models/coordinates";

declare var google;

@Component({
  selector: "app-map-view",
  templateUrl: "./map-view.component.html",
  styleUrls: ["./map-view.component.scss"],
})
export class MapViewComponent implements OnInit {
  @Input() coords: Coordinates;
  @ViewChild("map", { static: true }) mapElement: ElementRef;
  map: any;
  mapVisible: boolean = false;
  constructor() {}

  ngOnInit() {}

  ionViewWillEnter() {}

  loadMap() {
    this.mapVisible = true;
    let latLng = new google.maps.LatLng(
      this.coords.latitude,
      this.coords.longitude
    );

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.SATELLITE,
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    const htmlElement = this.mapElement.nativeElement as HTMLElement;
    htmlElement.setAttribute("style", "height: 40vh");
    this.addMarker(latLng);
  }

  addMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: this.map,
      animation: google.maps.Animation.DROP,
    });
  }
}
