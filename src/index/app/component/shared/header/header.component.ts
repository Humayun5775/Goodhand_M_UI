import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  locationName='';
  PageName='';
  Title="";
  IsBackButton=true;
  IsSearch=false;
  IsLogin=false;
  locationList:any;
  serviceType='Salon service';
  @ViewChild('btnPrice') btnPrice:any;
  @ViewChild('btnLocation') btnLocation:any;
  @ViewChild('btnGotit') btnGotit:any;
  IsServiceAvb=false;
  DiffPrice=0;
  newLocationId=0;

  constructor(private route: Router,private ls:LocalStoreService,private sharedService:SharedService,private locationService:LocationService,private categoryService:CategoryService) { }
 
  ngOnInit(): void {
    this.IsLoggedIn();
    if(this.ls.getItem('LocationName')){
    this.locationName=this.ls.getItem('LocationName');
    }
    else{
      this.locationName="Choose location";
    }
    this.serviceType=this.ls.getItem('LocationId')=='3'?'Home service':'Salon service';
    this.sharedService.getPageName().subscribe((p:any)=>{
      
      this.PageName=p.PageName;
      this.Title=p.Title;
      this.IsSearch=p.IsSearch;
      if(p.IsBackButton==undefined) this.IsBackButton=true;
      else  this.IsBackButton=p.IsBackButton;
     
    });
  }
  GoToLocation(){
    this.route.navigate(['location']);
  }
  IsLoggedIn(){
    if(this.ls.getItem('customer')){
      this.IsLogin=true;
    }else{
      this.IsLogin=false;
    }
  }
  Login(){
    if(this.IsLogin){
      this.ls.clear();
      this.route.navigate(['location']);
    }
else{
  
  this.route.navigate(['enter-mobile']);
}
  }
  GetLocation(){
   this.addRemoveClass();
    if(!this.locationList){
    this.locationService.GetLocation().subscribe((data:any)=>{
      this.locationList=data; //.map(y => ({ name:y.patientVisitID,value:y.patientVisitID}));
      // let el: HTMLElement = this.btnLocation.nativeElement;
      // el.click();
});
    }
}

SelectedLocation(Id:any){
  this.newLocationId=Id;
  debugger
let cart=this.ls.getItem('cart');
if(cart){
  if(cart.length>0){
let cartAmt=cart.reduce((total:any,line:any) => total + line.amount ,0);
  let model={
    p_location_id:Id,
    p_master_service_ids:''
  }

  for (let index = 0; index < cart.length; index++) {
    const element = cart[index];
    model.p_master_service_ids+=element.master_service_id+',';
  }
  model.p_master_service_ids = model.p_master_service_ids.replace(/,\s*$/, "");
  this.categoryService.GetServiceAmountByLocation(model).subscribe((data:any)=>{
    debugger
let newAmt=data.reduce((total:any,line:any) =>parseFloat(total) +parseFloat(line.amount)  ,0); 
let isOpen=0;
if(newAmt==0){
  this.IsServiceAvb=true;
 isOpen=1;
}
if(cartAmt!=newAmt && newAmt!=0){
  this.DiffPrice=newAmt;
  isOpen=1;
}
if(isOpen==1){
  let el: HTMLElement = this.btnPrice.nativeElement;
  el.click();
}
else{
  this.ChangeLocation(Id);
}
  });

}
}
  else{
    this.ChangeLocation(Id);
    this.route.navigate(['location']);
  }
 
  
  }
  ChangeLocation(Id:any){
    let LocationName=this.locationList.filter((x:any)=>x.id==Id).map((y:any)=>y.location_name)
    this.ls.setItem('LocationId',Id);
    this.ls.setItem('LocationName',LocationName);
    this.ls.setItem('LocationAddress',this.locationList.filter((x:any)=>x.id==Id).map((y:any)=>y.address));
   this.ngOnInit();
  }
  home(){
    
    window.location.href="https://mirrorsbeautylounge.com"
  }
  loggedIn(){
    if(this.sharedService.IsloggedIn()) this.route.navigate(['my-booking']);
    else this.route.navigate(['category']);
  }
  search(){
    this.route.navigate(['search-service']);
  }
  GotIt(){
  this.ChangeLocation(this.newLocationId);
  this.route.navigate(['category']);
  }
  loggedOut(){
    this.ls.clear();
    this.route.navigate(['location']);
  }
  addRemoveClass(){
    var sections = document.querySelectorAll('div');
    for (let i = 0; i < sections.length; i++){
      if (sections[i].classList.contains('dv_footer')) {
        sections[i].classList.remove('view_continue_above_modal')
    }
    }
  }
  Close(){
    var sections = document.querySelectorAll('div');
    for (let i = 0; i < sections.length; i++){
      if (sections[i].classList.contains('dv_footer')) {
        sections[i].classList.add('view_continue_above_modal')
    }
    }
  }
}
