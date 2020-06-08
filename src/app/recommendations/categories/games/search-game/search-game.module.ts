import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchGamePageRoutingModule } from './search-game-routing.module';

import { SearchGamePage } from './search-game.page';
import { GameDetailComponent } from '../game-detail/game-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchGamePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SearchGamePage, GameDetailComponent],
  entryComponents: [GameDetailComponent]
})
export class SearchGamePageModule {}
