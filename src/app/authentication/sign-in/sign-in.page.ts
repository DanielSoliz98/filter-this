import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { NgZone } from "@angular/core";
import { AuthenticationService } from "src/app/shared/services/authentication/authentication.service";
import { ToastController, ModalController } from "@ionic/angular";
import { SignUpPage } from "../sign-up/sign-up.page";
import { Router } from "@angular/router";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.page.html",
  styleUrls: ["./sign-in.page.scss"],
})
export class SignInPage implements OnInit {
  signinForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
  });
  constructor(
    public authenticationService: AuthenticationService,
    private toastController: ToastController,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.authenticationService
      .signIn(this.email.value, this.password.value)
      .then((result: any) => {
        this.ngZone.run(() => {
          if (result.user.emailVerified) {
            this.signinForm.reset();
            this.presentToast("Se inicio sesion correctamente");
            this.router.navigateByUrl("/app/tabs/recommendations");
          } else {
            this.router.navigate(["verify-email-address"]);
          }
        });
      })
      .catch((error: any) => {
        this.password.setValue("");
        if (error.code == "auth/wrong-password") {
          this.presentToast("Error: Credenciales no validos");
        } else {
          this.presentToast("Error: Usuario no registrado");
        }
        console.log(error);
      });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  goToSignUp() {
    this.signinForm.reset();
    this.router.navigate(["sign-up"]);
  }

  get email(): AbstractControl {
    return this.signinForm.get("email");
  }

  get password(): AbstractControl {
    return this.signinForm.get("password");
  }
}
