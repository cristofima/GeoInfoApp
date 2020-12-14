import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaveLocationPage } from './save-location.page';

const routes: Routes = [
  {
    path: '',
    component: SaveLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaveLocationPageRoutingModule {}
