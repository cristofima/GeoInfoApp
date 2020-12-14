import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LocationModel } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getLocations(){
    return this.http.get<LocationModel[]>(`${environment.baseUrl}/api/Locations`);
  }

  getLocation(locationId: number){
    return this.http.get<LocationModel>(`${environment.baseUrl}/api/Locations/${locationId}`);
  }

  saveLocation(payload: LocationModel){
    return this.http.post<LocationModel>(`${environment.baseUrl}/api/Locations`, payload);
  }

  deleteLocation(locationId: number){
    return this.http.delete(`${environment.baseUrl}/api/Locations/${locationId}`);
  }
}
