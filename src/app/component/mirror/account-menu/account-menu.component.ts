import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.css']
})
export class AccountMenuComponent implements OnInit {
customer:any=[];
customerId=0;
@ViewChild('btnprofile') btnprofile:any;
constructor(private title: Title,private route: Router,private sharedService:SharedService,private categoryService:CategoryService,private locationService:LocationService,private ls:LocalStoreService,private router: Router ) { }


  ngOnInit(): void {
    this.title.setTitle(" Mirrors Beauty Lounge | Account"); // <-- Update the title 
this.getCustomer();
  }
  getCustomer(){
    if(this.ls.getItem('customer')){
      this.customer=this.ls.getItem('customer');
      this.customerId=this.customer[0].id;
    }
    else{
      this.customer=[];
    }
  }
logout(){
  let LAdd=this.ls.getItem('LocationAddress');
  let LId=this.ls.getItem('LocationId');
  let LName=this.ls.getItem('LocationName');
  this.ls.clear();
  
  this.ls.setItem('LocationAddress',LAdd);
  this.ls.setItem('LocationId',LId);
  this.ls.setItem('LocationName',LName);
  
  this.sharedService.Message('Logout successfully','success')
 this.route.navigate(['/']);
}
OpenPopUp(){
  if(this.ls.getItem('customer')){
    this.customerId=this.customer[0].id;
    this.btnprofile.nativeElement.click();
  }
}
}
