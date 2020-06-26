import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProfilePageRoutingModule } from "./profile-routing.module";

import { ProfilePage } from "./profile.page";
import { OptionsComponent } from "./options/options.component";
import { MyCollectionComponent } from "./my-collection/my-collection.component";
import { MyRecommendationsComponent } from "./my-recommendations/my-recommendations.component";
import { MovieDetailComponent } from "../recommendations/categories/movie/movie-detail/movie-detail.component";
import { CommentsComponent } from "../shared/components/comments/comments.component";
import { MusicDetailComponent } from "../recommendations/categories/music/music-detail/music-detail.component";
import { SerieDetailComponent } from "../recommendations/categories/tv-series/serie-detail/serie-detail.component";
import { BookDetailComponent } from "../recommendations/categories/book/book-detail/book-detail.component";
import { GameDetailComponent } from "../recommendations/categories/games/game-detail/game-detail.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ProfilePageRoutingModule],
  exports: [
    MyCollectionComponent,
    MyRecommendationsComponent,
    CommentsComponent,
  ],
  declarations: [
    ProfilePage,
    OptionsComponent,
    MyCollectionComponent,
    MyRecommendationsComponent,
    MovieDetailComponent,
    MusicDetailComponent,
    SerieDetailComponent,
    BookDetailComponent,
    GameDetailComponent,
    CommentsComponent,
  ],
  entryComponents: [
    OptionsComponent,
    MovieDetailComponent,
    MusicDetailComponent,
    SerieDetailComponent,
    BookDetailComponent,
    GameDetailComponent,
  ],
})
export class ProfilePageModule {}
