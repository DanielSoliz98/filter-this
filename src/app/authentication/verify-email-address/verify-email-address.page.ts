import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/shared/services/authentication/authentication.service";
import { ModalController } from "@ionic/angular";
import { SignInPage } from "../sign-in/sign-in.page";
import { Router } from "@angular/router";

@Component({
  selector: "app-verify-email-address",
  templateUrl: "./verify-email-address.page.html",
  styleUrls: ["./verify-email-address.page.scss"],
})
export class VerifyEmailAddressPage implements OnInit {
  constructor(
    public authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {}

  goToSignIn() {
    this.authService.signOut(false);
    this.router.navigate(["sign-in"]);
  }
}
