import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../shared/services/authentication/authentication.service";
import { PopoverController } from "@ionic/angular";
import { OptionsComponent } from "./options/options.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {}

  goMyRecommendations() {
    this.router.navigateByUrl("/app/tabs/profile/my-recommendations");
  }

  goMyCollection() {
    this.router.navigateByUrl("/app/tabs/profile/my-collection");
  }

  async showOptions(ev) {
    const popover = await this.popoverController.create({
      component: OptionsComponent,
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }
}
