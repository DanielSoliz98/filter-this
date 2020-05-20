import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "src/app/shared/services/authentication/authentication.service";
import { ToastController, ModalController } from "@ionic/angular";
import { Router } from '@angular/router';

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.page.html",
  styleUrls: ["./sign-up.page.scss"],
})
export class SignUpPage implements OnInit {
  signupForm = new FormGroup({
    firstName: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern("[^' ']+"),
    ]),
    lastName: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern("[^' ']+"),
    ]),
    email: new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  constructor(
    private authService: AuthenticationService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.authService
      .signUp(
        this.email.value,
        this.password.value,
        this.firstName.value,
        this.lastName.value
      )
      .then((res: any) => {
        this.presentToast(
          "Registro correcto. Verifique su direccion de correo."
        );
        this.signupForm.reset();
      })
      .catch((error: any) =>
        this.presentToast("Error al registrarse, intente de nuevo")
      );
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  goToSignIn() {
    this.router.navigate(["sign-in"])
  }

  get firstName() {
    return this.signupForm.get("firstName");
  }

  get lastName() {
    return this.signupForm.get("lastName");
  }

  get email() {
    return this.signupForm.get("email");
  }

  get password() {
    return this.signupForm.get("password");
  }
}
