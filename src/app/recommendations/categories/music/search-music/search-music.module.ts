import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchMusicPageRoutingModule } from './search-music-routing.module';

import { SearchMusicPage } from './search-music.page';
import { MusicDetailComponent } from '../music-detail/music-detail.component';
import { CommentsComponent } from 'src/app/shared/components/comments/comments.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchMusicPageRoutingModule,
    ReactiveFormsModule
  ],
  exports: [CommentsComponent],
  declarations: [SearchMusicPage, MusicDetailComponent, CommentsComponent],
  entryComponents: [MusicDetailComponent]
})
export class SearchMusicPageModule {}
