import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { LocalStoreService } from 'src/app/service/local-store.service';
import { LocationService } from 'src/app/service/location.service';
import { SharedService } from 'src/app/service/shared.service';
import { SwiperOptions } from 'swiper';
import SwiperCore, {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
} from "swiper";
import { style } from '@angular/animations';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
}) 
export class HomeComponent implements OnInit {
  firstList:any;
  secondList:any;
  thirdList:any;
  fourthList:any;
  fifthList:any;
  sixthList:any;
  seventhList:any;
  locationList:any; 
  catList:any=[];
  searchList:any=[];
  locationName='';
  locationAdd='';
  loading=true;
  IsNoResult=false;
  txtSearch='';
  IsSearch=false;
  IsReset=false;
  currentLocation:any;
  IsLocationExist=true;
  timeout :any;
  mobileNo:any;
  searchLoader=false;
  comingSoonImg=''
  txtMobileNo=''
  offerList=[1,2,3,4,5,6,7,8,9,10,11]
  @ViewChild('btnLocation') btnLocation:any;
  @ViewChild('btnCategory') btnCategory:any;
  @ViewChild('btnClosemobileapp') btnClosemobileapp:any;
  config: SwiperOptions = {
    slidesPerView: 4,
    spaceBetween: 20,
    grabCursor: true,
    freeMode: true, 
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    }
    
  };
  constructor(private activatedRoute: ActivatedRoute,private eRef: ElementRef,private route: Router,private categoryService:CategoryService,private sharedService:SharedService,private locationService:LocationService,private ls:LocalStoreService) { }

  ngOnInit(): void {
    if(this.ls.getItem('LocationId'))
    {
      this.IsLocationExist=true;
    }
    this.sharedService.AddLog('home','load');
    this.firstSubCategory(10,0);
    this.thirdSubCategory(30,0);
    this.fifthSubCategory(2,0);
    this.seventhSubCategory(6,0);

  let id=this.activatedRoute.snapshot.queryParams['ref'];
if(id){
  this.ls.setItem('ReferId',id);
}

    
this.closeSearch();
  }

  closeSearch(){
    this.txtSearch='';
    this.IsNoResult=false;
    this.IsSearch=false;
    this.searchList=[];
    
    this.searchLoader=false;
  }
  firstSubCategory(p_category_id:any,p_sub_category_id:any){
 let location=1;
 if(this.ls.getItem('LocationId')){
  location=this.ls.getItem('LocationId');
 }
    let model={
     p_category_id:p_category_id,
     p_sub_category_id:p_sub_category_id,
     p_location:location

    }
     this.categoryService.SubCategory(model).subscribe((data:any)=>{

       this.firstList=data;
       this.firstList=this.firstList.sort((a:any,b:any)=> a['position'] - b['position']).slice(0, 5);;
       
         
 });
}

@HostListener('document:click', ['$event'])
clickOut(event:any) {
  
  if (event.target.id != 'dropdownList' && event.target.name != 'pub') 
  {
    this.closeSearch();
  }
}
secondSubCategory(p_category_id:any,p_sub_category_id:any){
  let location=1;
  if(this.ls.getItem('LocationId')){
   location=this.ls.getItem('LocationId');
  }
     let model={
      p_category_id:p_category_id,
      p_sub_category_id:p_sub_category_id,
      p_location:location
 
     }
      this.categoryService.SubCategory(model).subscribe((data:any)=>{
 
        this.secondList=data;
        this.secondList=this.secondList.sort((a:any,b:any)=> a['position'] - b['position']).slice(0, 5);;
        
          
  });
 }
 thirdSubCategory(p_category_id:any,p_sub_category_id:any){
   let location=1;
   if(this.ls.getItem('LocationId')){
    location=this.ls.getItem('LocationId');
   }
      let model={
       p_category_id:p_category_id,
       p_sub_category_id:p_sub_category_id,
       p_location:location
  
      }
       this.categoryService.SubCategory(model).subscribe((data:any)=>{
  
         this.thirdList=data;
         this.thirdList=this.thirdList.sort((a:any,b:any)=> a['position'] - b['position']).slice(0, 5);
         
           
   });
  }
  fourthSubCategory(p_category_id:any,p_sub_category_id:any){
    let location=1;
    if(this.ls.getItem('LocationId')){
     location=this.ls.getItem('LocationId');
    }
       let model={
        p_category_id:p_category_id,
        p_sub_category_id:p_sub_category_id,
        p_location:location
   
       }
        this.categoryService.SubCategory(model).subscribe((data:any)=>{
   
          this.fourthList=data;
          this.fourthList=this.fourthList.sort((a:any,b:any)=> a['position'] - b['position']).slice(0, 5);
          
            
    });
   }
   fifthSubCategory(p_category_id:any,p_sub_category_id:any){
     let location=1;
     if(this.ls.getItem('LocationId')){
      location=this.ls.getItem('LocationId');
     }
        let model={
         p_category_id:p_category_id,
         p_sub_category_id:p_sub_category_id,
         p_location:location
    
        }
         this.categoryService.SubCategory(model).subscribe((data:any)=>{
    
           this.fifthList=data;
           this.fifthList=this.fifthList.sort((a:any,b:any)=> a['position'] - b['position']).slice(0, 5);
           
             
     });
    }
    
  
  sixthSubCategory(p_category_id:any,p_sub_category_id:any){
    let location=1;
    if(this.ls.getItem('LocationId')){
     location=this.ls.getItem('LocationId');
    }
       let model={
        p_category_id:p_category_id,
        p_sub_category_id:p_sub_category_id,
        p_location:location
   
       }
        this.categoryService.SubCategory(model).subscribe((data:any)=>{
   
          this.sixthList=data;
          this.sixthList=this.sixthList.sort((a:any,b:any)=> a['position'] - b['position']).slice(0, 5);
          
            
    });
   }
   
  seventhSubCategory(p_category_id:any,p_sub_category_id:any){
    let location=1;
    if(this.ls.getItem('LocationId')){
     location=this.ls.getItem('LocationId');
    }
       let model={
        p_category_id:p_category_id,
        p_sub_category_id:p_sub_category_id,
        p_location:location
   
       }
        this.categoryService.SubCategory(model).subscribe((data:any)=>{
   
          this.seventhList=data;
          this.seventhList=this.seventhList.sort((a:any,b:any)=> a['position'] - b['position']).slice(0, 5);
          
            
    });
   }
GetServiceId(serviceId:any){
  
  this.categoryService.SetServiceId(serviceId);
  this.route.navigate([service-detail'], { fragment: serviceId });
  }
  
SelectService(catId:any,serviceId:any){
  this.ls.setItem('CatId',catId)
  this.categoryService.SetServiceId(serviceId);
  this.route.navigate([service-detail'], { fragment: serviceId });
  }
  GetType(type:any){
    this.sharedService.AddLog('home',"type-"+type);
    if(type=='salon'){
      this.locationService.SetType(type);
      this.route.navigate([location']);
    }
    if(type=='home'){
      this.ls.setItem('LocationId',3);
      this.ls.setItem('LocationName','Home Service');
      this.ls.setItem('LocationAddress','Home Service');
      this.route.navigate([category']);
    }
    if(type=='retail'){
      this.route.navigate([retail']);
    }
    
    if(type=='package'){

      this.ls.setItem('CatName','Packages');
      this.ls.setItem('CatId',11);
      this.route.navigate([service-detail']);
      
    }
    if(type=='33'){

      this.ls.setItem('CatName','Hair');
      this.ls.setItem('CatId',33);
      this.route.navigate([service-detail']);
      
    }
  }
  HomeSubCategory(catId:any,subCatId:any,name:any){
    this.ls.setItem('LocationId',3);
  this.ls.setItem('LocationName','Home');  
this.getSubCategory(catId,subCatId,name);
  }
getSubCategory(catId:any,subCatId:any,name:any)
{
  this.categoryService.SetSubCategoryValue(subCatId);
  let location='1';
  if(this.ls.getItem('LocationId')){
   location=this.ls.getItem('LocationId');
  }
     if(location=='3'){
       if(catId==35 || catId==46){
         this.route.navigate([expert-consultation']);
       }
       else{
       this.route.navigate([service-detail']);
       }
 }
 else{
  
   if(catId==30 || catId==3){
     this.route.navigate([expert-consultation']);
   }
   else{
   
  this.route.navigate([service-detail']);
   }
 }
 this.ls.setItem('CatName',name);
 this.ls.setItem('CatId',catId);
 
 }
 GetLocation(){

  if(this.ls.getItem('LocationId'))
  {
this.locationName=this.ls.getItem('LocationName');
this.locationAdd=this.ls.getItem('LocationAddress');
  }  
      this.locationService.GetLocation().subscribe((data:any)=>{
        this.locationList=data; 
        // if(this.ls.getItem('LocationId'))
        // {
        //   let LocationName=this.locationList.filter((x:any)=>x.id==this.ls.getItem('LocationId')).map((y:any)=>y.location_name)
        //   this.locationName=LocationName;
        //   this.locationAdd=this.locationList.filter((x:any)=>x.id==this.ls.getItem('LocationId')).map((y:any)=>y.address);
        // }  
//else
if(!this.ls.getItem('LocationId'))
{
  if(localStorage.getItem('currentLatitude')){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      localStorage.setItem('currentLatitude',position.coords.latitude.toString());
      localStorage.setItem('currentLongitude',position.coords.longitude.toString());
 this.NearestCity(position.coords.latitude,position.coords.longitude);
    });
  }else{
    //console.log("User not allowed")
  }
}

  this.IsLocationExist=false;

  this.btnLocation.nativeElement.click();
  
}

});


  }
  
onImgError(event:any) { 
  event.target.src = './assets/img/image-not-available.jpg';
}

SelectedLocation(Id:any){
  this.sharedService.AddLog('home','SelectedLocation');
  let LocationName=this.locationList.filter((x:any)=>x.id==Id).map((y:any)=>y.location_name)
  this.ls.setItem('LocationId',Id);
  this.ls.setItem('LocationName',LocationName);
  this.locationName=LocationName;
  this.locationAdd=this.locationList.filter((x:any)=>x.id==Id).map((y:any)=>y.address);
  
  this.ls.setItem('LocationAddress',this.locationAdd);
  this.firstSubCategory(10,0);
  this.thirdSubCategory(30,0);
  this.fifthSubCategory(2,0);
  }
  SearchService(){
   
    clearTimeout(parseInt(this.timeout));
    this.timeout = setTimeout(() => {
      debugger
      this.searchLoader=true;
    this.searchList=[];
    this.IsNoResult=false;
    this.IsSearch=false;
 if(this.txtSearch!=''){
     if(this.txtSearch.length>1){
      this.IsSearch=true;
      this.IsReset=true;
      this.categoryService.SearchService('0',this.txtSearch,this.ls.getItem('LocationId')).subscribe((data:any)=>{
        this.searchLoader=false;
        this.searchList=data;
   
        if(this.searchList.length==0)this.Clear();
        else  this.IsNoResult=false;
      //  this.IsSearch=false; 

  });
     }
     else{
      this.searchList=[];
      
      this.searchLoader=false;
      this.IsNoResult=false;
      this.IsSearch=false; 
      this.IsReset=false; 
     }
    }
    else{
      this.searchList=[];
      this.IsNoResult=false;
      this.IsSearch=false; 
      this.IsReset=false;
      
    this.searchLoader=false;
    }
  }, 500);
}
Clear(){
  this.searchList=[];
  this.IsNoResult=true;
}
MobileSearch(){
 let size= window.innerWidth;
  if(size < 1080 ){
    this.ls.setItem('CatId','0');
    this.ls.setItem('CatName','');
    this.route.navigate([search-service']);
  }
}
GetNearestSalon(){
  this.sharedService.AddLog('home','GetNearestSalon');
  navigator.geolocation.getCurrentPosition((position) => {
    
    localStorage.setItem('currentLatitude', position.coords.latitude.toString()) 
    localStorage.setItem('currentLongitude', position.coords.longitude.toString()) 
    this.NearestCity(localStorage.getItem('currentLatitude'),localStorage.getItem('currentLongitude'))

});

}

NearestCity(latitude:any, longitude:any) {
  var minDif = 99999;
  let closest:any;
  let closestName:any;

  for (let index = 0; index < this.locationList.length; ++index) {
    this.locationList[index].IsClose=0;
    var dif = this.PythagorasEquirectangular(latitude, longitude,  this.locationList[index].latitude,  this.locationList[index].longitude);
    if (dif < minDif) {
      closest = index;
      closestName = this.locationList[index].location_name;
      minDif = dif;
    }
  }
  

this.ls.setItem('LocationId',this.locationList[closest].id);
this.ls.setItem('LocationName',this.locationList[closest].location_name);
this.ls.setItem('LocationAddress',this.locationList[closest].address);
this.locationName=this.locationList[closest].location_name;
this.locationAdd=this.locationList[closest].address;
this.locationList[closest].IsClose=1;

this.locationList = this.locationList.reduce((acc:any, element:any) => {
  if (element.IsClose==1) {
    return [element, ...acc];
  }
  return [...acc, element];
}, []);
 
}

// Convert Degress to Radians
Deg2Rad(deg:any) {
  return deg * Math.PI / 180;
}
 PythagorasEquirectangular(lat1:any, lon1:any, lat2:any, lon2:any) {
  lat1 = this.Deg2Rad(lat1);
  lat2 = this.Deg2Rad(lat2);
  lon1 = this.Deg2Rad(lon1);
  lon2 = this.Deg2Rad(lon2);
  var R = 6371; // km
  var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
  var y = (lat2 - lat1);
  var d = Math.sqrt(x * x + y * y) * R;
  return d;
}
Notify(val:any){
  this.sharedService.AddLog('home','Notify');
  let model={
    p_mobile:val
  }
  this.categoryService.Notify(model).subscribe((data:any)=>{
    this.txtMobileNo='';
  

    this.sharedService.Message(data[0].msg,'success');
    this.btnClosemobileapp.nativeElement.click();

  });
}
GetLocationRedirection(){
 
  if(this.ls.getItem('LocationId')){
    
    this.route.navigate([category']);
   }
    else{
      this.route.navigate([location']);
    } 
  


  }
  GetSaloon(){
    if(this.ls.getItem('LocationId')){
if(this.ls.getItem('LocationId')=='3'){
  
  this.btnLocation.nativeElement.click();
}
else{
  this.GetCategory();
  this.btnCategory.nativeElement.click();
}
    }
    else{
      this.btnLocation.nativeElement.click();
    }
  }
  GetCategory(){
    let IsHomeCate=0;
    if(this.ls.getItem('LocationId')){
      if(this.ls.getItem('LocationId')=='3'){
        IsHomeCate=1;
        let model={PageName:'Category',Title:'Salon at home',IsSearch:false}
        this.sharedService.setPageName(model);
      }
    }
    else{
      let model={PageName:'Category',Title:'Salon Service',IsSearch:false}
      this.sharedService.setPageName(model);
      this.btnLocation.nativeElement.click();
    }
    if(IsHomeCate==0){
        this.categoryService.GetCategory().subscribe((data:any)=>{
          
          
          this.catList=data.filter((x:any)=>x.status == 1&& x.id!=48);
          this.loading=false;
          
    });
    }
    else{
      
      this.categoryService.GetHomeCategory().subscribe((data:any)=>{
        
        
        this.catList=data.filter((x:any)=>x.status == 1 && x.id!=50);
        this.loading=false;
        
  });
    }
  }
  GetHomeCategory(){
    this.ls.setItem('LocationId',3);
    this.ls.setItem('LocationName','Home Service');
    this.ls.setItem('LocationAddress','Home Service');
    this.locationName=this.ls.getItem('LocationName');
this.locationAdd=this.ls.getItem('LocationAddress');
    this.GetCategory();
  }
  GetSubCategory(id:any,name:any)
  {
    
       if(this.ls.getItem('LocationId')=='3'){
         if(id==35 || id==46){
           this.route.navigate([expert-consultation']);
         }
         else{
         this.route.navigate([service-detail']);
         }
   }
   else{
    
     if(id==30 || id==3){
       this.route.navigate([expert-consultation']);
     }
     else{
     this.route.navigate([service-detail']);
     }
   }
   this.ls.setItem('CatName',name);
   this.ls.setItem('CatId',id);
   
   }
   ComingSoon(img:any){
    debugger
    this.txtMobileNo='';
    this.comingSoonImg=img;
   }
}