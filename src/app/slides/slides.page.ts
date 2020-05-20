import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { SignInPage } from "../authentication/sign-in/sign-in.page";

@Component({
  selector: "app-slides",
  templateUrl: "./slides.page.html",
  styleUrls: ["./slides.page.scss"],
})
export class SlidesPage implements OnInit {
  constructor(
    private router: Router,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  goToHome() {
    //this.router.navigateByUrl("/app/tabs/recommendations");
    this.router.navigate(["sign-in"])
  }

}
