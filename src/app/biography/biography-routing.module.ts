import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BiographyPage } from './biography.page';

const routes: Routes = [
  {
    path: ':id',
    component: BiographyPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BiographyPageRoutingModule {}

