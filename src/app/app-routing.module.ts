import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'locations',
    pathMatch: 'full'
  },
  {
    path: 'locations',
    loadChildren: () => import('./pages/locations/locations.module').then( m => m.LocationsPageModule)
  },
  {
    path: 'save-location',
    loadChildren: () => import('./pages/save-location/save-location.module').then( m => m.SaveLocationPageModule)
  },
  {
    path: 'save-location/:id',
    loadChildren: () => import('./pages/save-location/save-location.module').then( m => m.SaveLocationPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
