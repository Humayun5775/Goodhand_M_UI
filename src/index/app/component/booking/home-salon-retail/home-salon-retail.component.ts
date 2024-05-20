import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';
@Component({
  selector: 'app-home-salon-retail',
  templateUrl: './home-salon-retail.component.html',
  styleUrls: ['./home-salon-retail.component.css']
})
export class HomeSalonRetailComponent implements OnInit {

  constructor(private route: Router,private categoryService:CategoryService,private sharedService:SharedService,private locationService:LocationService,private ls:LocalStoreService) { }

  ngOnInit(): void {
    this.route.navigate(['/']);
    let model={PageName:'Choose Type',Title:'Choose Type',IsSearch:false}
    this.sharedService.setPageName(model);
    // this.ls.removeItem('LocationId');
    // this.ls.removeItem('LocationName');
  }
  GetType(type:any){
    
    if(type=='salon'){
      this.locationService.SetType(type);
      this.route.navigate(['/location']);
    }
    if(type=='home'){
      this.ls.setItem('LocationId',3);
      this.ls.setItem('LocationName','Home Service');
      this.ls.setItem('LocationAddress','Home Service');
      this.route.navigate(['/category']);
    }
    if(type=='retail'){
      this.route.navigate(['/retail']);
    }
  }
  
Back(){
window.location.href="https://mirrorsbeautylounge.com/";
}
}
