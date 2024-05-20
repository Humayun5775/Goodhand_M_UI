import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';


@Component({
  selector: 'app-save-address',
  templateUrl: './save-address.component.html',
  styleUrls: ['./save-address.component.css']
})
export class SaveAddressComponent implements OnInit {

  locationName='';
  constructor(private categoryService:CategoryService,private locationService:LocationService,private ls:LocalStoreService) { }

  ngOnInit(): void {
    this.GetLocation();
  }
  GetLocation(){
    this.locationName=this.ls.getItem('LocationName')
//     this.locationService.GetLocation().subscribe((data:any)=>{
      
//       let location=data;
      
//       location=data; //.map(y => ({ name:y.patientVisitID,value:y.patientVisitID}));
// this.locationName=location.filter((x:any)=>x.id==this.ls.getItem('LocationId')).map((y:any)=>y.location_name)
        
// });
}
}
