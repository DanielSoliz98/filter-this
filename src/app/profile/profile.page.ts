import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../shared/services/authentication/authentication.service";
import { User } from "../shared/models/user";
import { PopoverController } from "@ionic/angular";
import { OptionsComponent } from "./options/options.component";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  user: User;
  constructor(
    public authService: AuthenticationService,
    public popoverController: PopoverController
  ) {}

  ngOnInit() {}

  async showOptions(ev) {
    const popover = await this.popoverController.create({
      component: OptionsComponent,
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }
}
