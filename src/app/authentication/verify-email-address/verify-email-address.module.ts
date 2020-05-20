import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyEmailAddressPageRoutingModule } from './verify-email-address-routing.module';

import { VerifyEmailAddressPage } from './verify-email-address.page';
import { SignInPage } from '../sign-in/sign-in.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifyEmailAddressPageRoutingModule
  ],
  declarations: [VerifyEmailAddressPage, SignInPage],
  entryComponents: [SignInPage]
})
export class VerifyEmailAddressPageModule {}
