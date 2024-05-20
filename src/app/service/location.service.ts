import { Injectable } from '@angular/core';
import { baseApiUrl } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private httpclient:HttpClient) { }
 
  type:any;
  GetType(){
    return this.type;
    }
    SetType(val:any){
      this.type=val;
    }
  GetLocation(){
    return this.httpclient.get(`${baseApiUrl}/api/location/GetLocation`);
  }
 
  GetLocationImage(location_id:string){
    return this.httpclient.get(`${baseApiUrl}/api/location/GetLocationImage/`+location_id);
  }
 
}
