import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/services/authentication/authentication.service";

@Component({
  selector: "app-slides",
  templateUrl: "./slides.page.html",
  styleUrls: ["./slides.page.scss"],
})
export class SlidesPage implements OnInit {
  slideOpts = {
    initialSlide: 1,
    speed: 400,
  };
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    if (this.authService.userData) {
      if (this.authService.userData.emailVerified) {
        this.router.navigate(["/app/tabs/recommendations"]);
      } else {
        this.router.navigate(["verify-email-address"]);
      }
    }
  }
  goToHome() {
    this.router.navigate(["sign-in"]);
  }
}
