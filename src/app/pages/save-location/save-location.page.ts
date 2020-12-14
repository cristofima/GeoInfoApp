import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { LocationModel } from 'src/app/models/location.model';
import { ApiService } from 'src/app/services/api.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { LoadingService } from 'src/app/services/loading.service';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

@Component({
  selector: 'app-save-location',
  templateUrl: './save-location.page.html',
  styleUrls: ['./save-location.page.scss'],
})
export class SaveLocationPage implements OnInit {

  location: LocationModel;

  formGroup: FormGroup;

  constructor(
    private locationAccuracy: LocationAccuracy,
    private platform: Platform,
    private loadingService: LoadingService,
    private nativeGeocoder: NativeGeocoder,
    private geolocation: Geolocation,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private actRoute: ActivatedRoute,
    private navController: NavController
    ) { }

  ngOnInit() {
    this.initForm();

    const id = Number(this.actRoute.snapshot.paramMap.get("id"));
    if(id){
      this.apiService.getLocation(id).subscribe(res => {
        this.location = res;
        this.setForm();
      });
    }else{
      this.location = new LocationModel();

      if(this.platform.is("mobileweb")){
        this.getCurrentPosition();
      }else{
        this.askToTurnOnGPS();
      }
    }
  }

  private initForm(){
    this.formGroup = this.formBuilder.group({
      address: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(60)])),
      reference: new FormControl('')
    });
  }

  private setForm(){
    this.formGroup.controls["address"].setValue(this.location.address);
    this.formGroup.controls["reference"].setValue(this.location.reference);
  }

  private getCurrentPosition(){
    this.geolocation.getCurrentPosition().then((res: any)=>{
      if(res){
        this.location.latitude = res.coords.latitude;
        this.location.longitude = res.coords.longitude;

        this.getAddress();
      }
    });
  }

  private askToTurnOnGPS(){
    this.locationAccuracy.canRequest().then(()=>{
      this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
        () => {
          this.getCurrentPosition();
        });
    });
  }

  markerDragEnd($event){
    this.location.latitude = $event.coords.lat;
    this.location.longitude = $event.coords.lng;

    this.getAddress();
  }

  getAddress() {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
  };

    this.nativeGeocoder.reverseGeocode(this.location.latitude, this.location.longitude, options).then((res: NativeGeocoderResult[])=>{
      if(res && res[0]){
        console.log(res[0]);
        let address = res[0].locality+". "+ res[0].thoroughfare+" "+res[0].subThoroughfare;
        this.formGroup.controls['address'].setValue(address);
      }
    });
  }

  async onSubmit(){
    const loading = await this.loadingService.presentLoading("Saving ...");
    await loading.present();

    this.location.address = this.formGroup.controls["address"].value;
    this.location.reference = this.formGroup.controls["reference"].value;
    
    this.apiService.saveLocation(this.location).subscribe(()=>{
      loading.dismiss();
      this.navController.back();
    }, ()=>{
      loading.dismiss();
    });
  }

}
