import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from "@angular/forms";
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
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.authenticationService
      .signIn(this.email.value, this.password.value)
      .then((res: any) => {
        this.signinForm.reset();
        this.presentToast("Se inicio sesion correctamente");
      })
      .catch((error: any) => {
        this.presentToast("Error al iniciar sesion");
      });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  presentModal() {
    this.router.navigate(["sign-up"]);
  }

  get email(): AbstractControl {
    return this.signinForm.get("email");
  }

  get password(): AbstractControl {
    return this.signinForm.get("password");
  }
}
