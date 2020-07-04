import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/services/authentication/authentication.service";
import { IonSlides } from "@ionic/angular";

@Component({
  selector: "app-slides",
  templateUrl: "./slides.page.html",
  styleUrls: ["./slides.page.scss"],
})
export class SlidesPage implements OnInit {
  @ViewChild("slides", { static: true }) slides: IonSlides;
  slideOpts: any;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    if (this.authService.userData) {
      this.router.navigate(["/app/tabs/recommendations"]);
    }
  }

  ionViewWillEnter() {
    this.slideOpts = {
      initialSlide: 0,
      speed: 400,
    };
    this.slides.slideTo(0);
  }

  goToHome() {
    this.router.navigate(["sign-in"]);
  }
}
