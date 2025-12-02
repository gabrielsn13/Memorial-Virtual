import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BiographyPage } from './biography.page';

import { BiographyPageRoutingModule } from './biography-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    BiographyPageRoutingModule
  ],
  declarations: [BiographyPage]
})
export class BiographyPageModule {}

