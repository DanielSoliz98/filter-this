import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { HomePage } from "./home.page";

import { HomePageRoutingModule } from "./home-routing.module";
import { RecommendationsPageModule } from "../recommendations/recommendations.module";
import { CategoriesPageModule } from "../categories/categories.module";
import { ProfilePageModule } from "../profile/profile.module";
import { MovieDetailComponent } from "../recommendations/categories/movie/movie-detail/movie-detail.component";
import { MusicDetailComponent } from "../recommendations/categories/music/music-detail/music-detail.component";
import { SerieDetailComponent } from "../recommendations/categories/tv-series/serie-detail/serie-detail.component";
import { BookDetailComponent } from "../recommendations/categories/book/book-detail/book-detail.component";
import { GameDetailComponent } from "../recommendations/categories/games/game-detail/game-detail.component";
import { CommentsComponent } from "../shared/components/comments/comments.component";
import { RestaurantDetailComponent } from '../shared/components/restaurant-detail/restaurant-detail.component';
import { ProductDetailComponent } from '../shared/components/product-detail/product-detail.component';
import { MapViewComponent } from '../shared/components/map-view/map-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    RecommendationsPageModule,
    CategoriesPageModule,
    ProfilePageModule,
  ],
  exports: [CommentsComponent, MapViewComponent],
  declarations: [
    HomePage,
    MovieDetailComponent,
    MusicDetailComponent,
    SerieDetailComponent,
    BookDetailComponent,
    GameDetailComponent,
    CommentsComponent,
    MapViewComponent,
    RestaurantDetailComponent,
    ProductDetailComponent,
  ],
  entryComponents: [
    MovieDetailComponent,
    MusicDetailComponent,
    SerieDetailComponent,
    BookDetailComponent,
    GameDetailComponent,
    RestaurantDetailComponent,
    ProductDetailComponent,
  ],
})
export class HomePageModule {}
