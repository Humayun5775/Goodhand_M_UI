import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';


@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.css']
})
export class SearchLocationComponent implements OnInit {

  constructor(private route: Router,private categoryService:CategoryService,private sharedService:SharedService,private locationService:LocationService,private ls:LocalStoreService) { }
data:any={};
options={
	componentRestrictions:{
	country:["AE"]
	}
}
  ngOnInit(): void {
    this.sharedService.setPageName('Search Location');
  }
  handleAddressChange(address: any) {
debugger
    this.categoryService.SetAddressDetail(address);
    this.data.userAddress = address.formatted_address
    this.data.userLatitude = address.geometry.location.lat()
    this.data.userLongitude = address.geometry.location.lng();
    this.route.navigate([new-address']);
  }
}
