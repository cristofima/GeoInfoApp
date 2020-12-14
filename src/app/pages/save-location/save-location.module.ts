import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaveLocationPageRoutingModule } from './save-location-routing.module';

import { SaveLocationPage } from './save-location.page';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsApiKey
    }),
    SaveLocationPageRoutingModule
  ],
  declarations: [SaveLocationPage]
})
export class SaveLocationPageModule {}
