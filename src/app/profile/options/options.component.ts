import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/shared/services/authentication/authentication.service";
import { PopoverController } from "@ionic/angular";

@Component({
  selector: "app-options",
  templateUrl: "./options.component.html",
  styleUrls: ["./options.component.scss"],
})
export class OptionsComponent implements OnInit {
  constructor(
    public authService: AuthenticationService,
    private popover: PopoverController
  ) {}

  ngOnInit() {}

  signOut() {
    this.closePopover();
    this.authService.signOut(true);
  }
  closePopover() {
    this.popover.dismiss();
  }
}
