import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecommendationsPageRoutingModule } from './recommendations-routing.module';

import { RecommendationsPage } from './recommendations.page';
import { CategoriesModalComponent } from './categories-modal/categories-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecommendationsPageRoutingModule
  ],
  declarations: [RecommendationsPage, CategoriesModalComponent],
  entryComponents: [CategoriesModalComponent]
})
export class RecommendationsPageModule {}
