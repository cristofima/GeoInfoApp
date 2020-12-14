import { Component, OnInit } from '@angular/core';
import { LocationModel } from 'src/app/models/location.model';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
})
export class LocationsPage implements OnInit {

  locations: LocationModel[];

  constructor(
    private loadingService: LoadingService,
    private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getLocations().subscribe(res =>{
      this.locations = res;
    });
  }

  doRefresh($event: any){
    this.apiService.getLocations().subscribe(res =>{
      this.locations = res;
      $event.target.complete();
    }, ()=>{
      $event.target.complete();
    });
  }

  async deleteLocation(locationId: number){
    const loading = await this.loadingService.presentLoading("Deleting ...");
    await loading.present();

    this.apiService.deleteLocation(locationId).subscribe(()=>{
      loading.dismiss();
    }, ()=>{
      loading.dismiss();
    });
  }

}
