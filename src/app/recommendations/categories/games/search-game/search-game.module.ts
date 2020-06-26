import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchGamePageRoutingModule } from './search-game-routing.module';

import { SearchGamePage } from './search-game.page';
import { GameDetailComponent } from '../game-detail/game-detail.component';
import { CommentsComponent } from 'src/app/shared/components/comments/comments.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchGamePageRoutingModule,
    ReactiveFormsModule
  ],
  exports: [CommentsComponent],
  declarations: [SearchGamePage, GameDetailComponent, CommentsComponent],
  entryComponents: [GameDetailComponent]
})
export class SearchGamePageModule {}
