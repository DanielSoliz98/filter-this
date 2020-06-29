import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../shared/services/authentication/authentication.service";
import { User } from "../shared/models/user";
import { PopoverController } from "@ionic/angular";
import { OptionsComponent } from "./options/options.component";
import { AngularFireAuth } from "@angular/fire/auth";
import { UserService } from "../shared/services/user/user.service";
import { BookService } from "../shared/services/book/book.service";
import { Book } from "../shared/models/book";
import { MovieService } from "../shared/services/movie/movie.service";
import { Movie } from "../shared/models/movie";
import { Serie } from "../shared/models/serie";
import { SerieService } from "../shared/services/serie/serie.service";
import { Game } from "../shared/models/game";
import { GameService } from "../shared/services/game/game.service";
import { Music } from "../shared/models/music";
import { MusicService } from "../shared/services/music/music.service";
import { Product } from "../shared/models/product";
import { Restaurant } from "../shared/models/restaurant";
import { ProductService } from "../shared/services/product/product.service";
import { RestaurantService } from "../shared/services/restaurant/restaurant.service";
import { MyRecommendations } from "../shared/models/my-recommendations";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {}

  goMyRecommendations() {
    this.router.navigateByUrl("/app/tabs/profile/my-recommendations");
  }

  goMyCollection() {
    this.router.navigateByUrl("/app/tabs/profile/my-collection");
  }

  async showOptions(ev) {
    const popover = await this.popoverController.create({
      component: OptionsComponent,
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }
}
