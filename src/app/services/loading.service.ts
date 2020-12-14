import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private loadingController: LoadingController) { }

  async presentLoading(message = "Loading ...") {
    const loading = await this.loadingController.create({
      message: message
    });

   return loading;
  }
}
