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
import { Meta, Title } from '@angular/platform-browser';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
}) 
export class HomeComponent implements OnInit {
  firstList:any;  
  homeBannerList:any;  
  IsLoggedIn=false;
  SignUpClick=false;
  secondList:any;
  thirdList:any;
  fourthList:any;
  fifthList:any;
  sixthList:any;
  seventhList:any;
  eightthList:any;
  Is1Loader=true;
  Is2Loader=true;
  Is3Loader=true;
  Is4Loader=true;
  Is5Loader=true;
  Is6Loader=true;
  locationList:any; 
  catList:any=[];
  searchList:any=[];
  locationName='';
  locationAdd='';
  locationBannerImage='';
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
  currentYear=0;
  salonforwomenList=[2,6,3,9,28]
  offerList=[1,2,3,4,5,6,7,8,9,10,11]
  locationTitle='Best Salon & Home services in Dubai';
  @ViewChild('btnLocation') btnLocation:any;
  @ViewChild('btnCategory') btnCategory:any;
  @ViewChild('btnClosemobileapp') btnClosemobileapp:any;
  @ViewChild('btnCloseMobileNo') btnCloseMobileNo:any;
  @ViewChild('btnCloseLaunchingSoon') btnCloseLaunchingSoon:any;
  @ViewChild('btnLogin') btnLogin:any;
  @ViewChild('btntermsncondition') btntermsncondition:any;
  @ViewChild('btnprivacypolicy') btnprivacypolicy:any;
  @ViewChild('btncancellationpolicy') btncancellationpolicy:any;
  @ViewChild('btnsafety') btnsafety:any;
  @ViewChild('btnmarina') btnmarina:any;
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
  IsMobile=false; 
  firstCatId=10;
  secondCatId=0;
  thirsdCatId=30;
  fourthCatId=3;
  fifthCatId=2;
  sixthCatId=9;
  seventhCatId=6;
  eightCatId=22;
  nineCatId=1;
  
  constructor(private title: Title,private meta: Meta,private activatedRoute: ActivatedRoute,private eRef: ElementRef,private route: Router,private categoryService:CategoryService,private sharedService:SharedService,private locationService:LocationService,private ls:LocalStoreService) { }

  ngOnInit(): void {
    this.currentYear=(new Date()).getFullYear();
  
  
    if(this.activatedRoute.snapshot.url.length>0){
      if(this.activatedRoute.snapshot.url[0].path=='home-service'){
        this.RedirectToLocation('Home Service')
      }
    }
    
    this.GetLocation();
    this.sharedService.AddLog('home','home');
    this.title.setTitle(" Mirrors Beauty Lounge | Home"); // <-- Update the title
    this.GetHomePageOfferBanner();
   if(window.innerWidth>=1080){
    this.IsMobile=false;
   }
   else{
    this.IsMobile=true;
   }
   
    if(this.ls.getItem('LocationId'))
    {
      this.IsLocationExist=true;
      if(this.ls.getItem('LocationId')=='3')
      {
        this.firstCatId=36;
        this.fifthCatId=33;
        this.thirsdCatId=46;
        this.sixthCatId=29;
        this.seventhCatId=37;
        this.fourthCatId=35;
        this.eightCatId=44;
        this.nineCatId=48;
        this.meta.updateTag({ 
          name: 'description',
          content: 'Best Salon Beauty Services at home in Dubai For Ladies Only - we provide professional hair, facial, eyelash, threading, nail, wax, massage, henna, Moroccan bath and makeup services.'
      });
      this.meta.updateTag({ 
        name: 'keywords',
        content: 'beauty services at home, beauty parlour services at home, beauty salon home services, home service salon near me, beauty treatments at home Dubai, salon at home, salon services at home, facial at home, at home eyelash extensions, nails home service, manicure and pedicure at home service Dubai, at home nail service, keratin treatment at home, waxing service at home,  home hairdresser, home massage in Dubai, hair and makeup home service, home spa, massage home service Dubai, home service nail salon spa,'
    });
      }
      else{
        this.meta.updateTag({ 
          name: 'description',
          content: 'Mirrors Beauty Lounge is the best Ladies Salon in Dubai, We are Dubai based ladies beauty salon providing broad range of beauty services.'
      });
      this.meta.updateTag({ 
        name: 'keywords',
        content: 'beauty services at home, beauty parlour services at home, beauty salon home services, home service salon near me, beauty treatments at home Dubai, salon at home, salon services at home, facial at home, at home eyelash extensions, nails home service, manicure and pedicure at home service Dubai, at home nail service, keratin treatment at home, waxing service at home,  home hairdresser, home massage in Dubai, hair and makeup home service, home spa, massage home service Dubai, home service nail salon spa,'
    });
      }
    }
    if(this.ls.getItem('customer')){
      this.IsLoggedIn = true;
    }
    else{

      this.IsLoggedIn = false;
      
    //this.SignUpClick=false;
      
      
    }

    this.firstSubCategory(this.firstCatId,0);
    this.thirdSubCategory(this.thirsdCatId,0);
    this.fifthSubCategory(this.fifthCatId,0);
    this.seventhSubCategory(this.seventhCatId,0);
    this.seventhSubCategory(this.seventhCatId,0);
    this.eightSubCategory(50,0);
    

  let id=this.activatedRoute.snapshot.queryParams['ref'];
if(id){
  this.ls.setItem('ReferId',id);
}

    
this.closeSearch();
  }
  RedirectToLocation(name:any){
    this.locationService.GetLocation().subscribe((data:any)=>{
      debugger
      this.locationList=data; 
let loc=this.locationList.filter((x:any)=>x.location_name==name);
this.SelectedLocation(loc[0].id);
});
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
 this.Is1Loader=true;
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
       this.firstList=this.firstList.sort((a:any,b:any)=> a['position'] - b['position']).slice(0, 4);
       this.Is1Loader=false;
         
 });
}
eightSubCategory(p_category_id:any,p_sub_category_id:any){
let location=1;
this.Is1Loader=true;
if(this.ls.getItem('LocationId')){
location=this.ls.getItem('LocationId');
}
  let model={
   p_category_id:p_category_id,
   p_sub_category_id:p_sub_category_id,
   p_location:location

  }
   this.categoryService.SubCategory(model).subscribe((data:any)=>{
   
     this.eightthList=data;
     this.eightthList=this.eightthList.sort((a:any,b:any)=> a['position'] - b['position']).slice(0, 4);
     this.Is1Loader=false;
       
});
}

GetHomePageOfferBanner(){
this.Is2Loader=true;
  if(this.ls.getItem('LocationId')){

     let model={
      p_location_id:this.ls.getItem('LocationId')
     }
      this.categoryService.GetHomePageOfferBanner(model).subscribe((data:any)=>{
     
        this.homeBannerList=data;
        this.Is2Loader=false;
        
          
  });
}
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
        this.secondList=this.secondList.sort((a:any,b:any)=> a['position'] - b['position']).slice(0, 4);;
        
          
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
         this.thirdList=this.thirdList.sort((a:any,b:any)=> a['position'] - b['position']).slice(0, 4);
         
           
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
          this.fourthList=this.fourthList.sort((a:any,b:any)=> a['position'] - b['position']).slice(0, 4);
          
            
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
           this.fifthList=this.fifthList.sort((a:any,b:any)=> a['position'] - b['position']).slice(0, 4);
           
             
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
          this.sixthList=this.sixthList.sort((a:any,b:any)=> a['position'] - b['position']).slice(0, 4);
          
            
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
          this.seventhList=this.seventhList.sort((a:any,b:any)=> a['position'] - b['position']).slice(0, 4);
          
            
    });
   }
GetServiceId(serviceId:any){
  
  this.categoryService.SetServiceId(serviceId);
  this.route.navigate(['/service-detail'], { fragment: serviceId });
  }
  
SelectService(catId:any,serviceId:any){
  this.ls.setItem('CatId',catId)
  this.categoryService.SetServiceId(serviceId);
  this.route.navigate(['/service-detail'], { fragment: serviceId });
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
      this.locationBannerImage=this.locationList.filter((x:any)=>x.id==3).map((y:any)=>y.banner)
      this.route.navigate(['/category']);
    }
    if(type=='retail'){
      this.route.navigate(['/retail']);
    }
    
    if(type=='package'){

      this.ls.setItem('CatName','Packages');
      this.ls.setItem('CatId',11);
      this.route.navigate(['/service-detail/package']);
      
    }
    if(type=='33'){

      this.ls.setItem('CatName','Hair');
      this.ls.setItem('CatId',33);
      this.route.navigate(['/service-detail/Hair']);
      
    }
  }
  HomeSubCategory(catId:any,subCatId:any,name:any){
    this.ls.setItem('LocationId',3);
  this.ls.setItem('LocationName','Home');  
  this.locationBannerImage=this.locationList.filter((x:any)=>x.id==3).map((y:any)=>y.banner)
this.getSubCategory(catId,subCatId,name,'');
  }
getSubCategory(catId:any,subCatId:any,name:any,slug:any)
{
  
  this.categoryService.SetSubCategoryValue(subCatId);
  let location='1';
  if(this.ls.getItem('LocationId')){
   location=this.ls.getItem('LocationId');
  }
     if(location=='3'){
       if(catId==35 || catId==46){
         this.route.navigate(['/expert-consultation/'+slug]);
       }
       else{
       this.route.navigate(['/service-detail/'+slug]);
       }
 }
 else{
  
   if(catId==30 || catId==3){
     this.route.navigate(['/expert-consultation/'+slug]);
   }
   else{
   
  this.route.navigate(['/service-detail/'+slug]);
   }
 }
 this.ls.setItem('CatName',name);
 this.ls.setItem('CatId',catId);
 
 }
 getSubCategoryForHomeService(catId:any,subCatId:any,name:any,slug:any)
{
  if(this.ls.getItem('LocationId')){
  
    if(this.ls.getItem('LocationId')=='3'){
  
      this.btnLocation.nativeElement.click();
    }
    else{
      
  this.categoryService.SetSubCategoryValue(subCatId);
  let location='1';
  if(this.ls.getItem('LocationId')){
   location=this.ls.getItem('LocationId');
  }
     if(location=='3'){
       if(catId==35 || catId==46){
         this.route.navigate(['/expert-consultation/'+slug]);
       }
       else{
       this.route.navigate(['/service-detail/'+slug]);
       }
 }
 else{
  
   if(catId==30 || catId==3){
     this.route.navigate(['/expert-consultation/'+slug]);
   }
   else{
   
  this.route.navigate(['/service-detail/'+slug]);
   }
 }
 this.ls.setItem('CatName',name);
 this.ls.setItem('CatId',catId);
    }
  }
 
 }
 GetLocation(){
  if(this.ls.getItem('LocationId'))
  {
this.locationName=this.ls.getItem('LocationName');
this.locationAdd=this.ls.getItem('LocationAddress');
  }  
      this.locationService.GetLocation().subscribe((data:any)=>{
        this.locationList=data; 
        this.locationBannerImage=this.locationList.filter((x:any)=>x.id==this.ls.getItem('LocationId')).map((y:any)=>y.banner)
        this.locationTitle=this.locationList.filter((x:any)=>x.id==this.ls.getItem('LocationId')).map((y:any)=>y.heading)
       
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
  
  let LocationName=this.locationList.filter((x:any)=>x.id==Id).map((y:any)=>y.location_name)
  this.ls.setItem('LocationId',Id);
  this.ls.setItem('LocationName',LocationName);
  this.locationBannerImage=this.locationList.filter((x:any)=>x.id==Id).map((y:any)=>y.banner)
  this.locationName=LocationName;
  this.locationTitle=this.locationList.filter((x:any)=>x.id==Id).map((y:any)=>y.heading)
  this.locationAdd=this.locationList.filter((x:any)=>x.id==Id).map((y:any)=>y.address);
  this.sharedService.AddLog('home','change location');
  this.ls.setItem('LocationAddress',this.locationAdd);
  if(this.ls.getItem('LocationId')=='3'){
    this.firstCatId=36;
    this.fifthCatId=33;
    this.thirsdCatId=46;
    this.sixthCatId=29;
    this.seventhCatId=37;
    this.fourthCatId=35;
    this.eightCatId=44;
    this.nineCatId=48;
  
    this.meta.updateTag({ 
      name: 'description',
      content: 'Best Salon Beauty Services at home in Dubai For Ladies Only - we provide professional hair, facial, eyelash, threading, nail, wax, massage, henna, Moroccan bath and makeup services.'
  });
  this.meta.updateTag({ 
    name: 'keywords',
    content: 'beauty services at home, beauty parlour services at home, beauty salon home services, home service salon near me, beauty treatments at home Dubai, salon at home, salon services at home, facial at home, at home eyelash extensions, nails home service, manicure and pedicure at home service Dubai, at home nail service, keratin treatment at home, waxing service at home,  home hairdresser, home massage in Dubai, hair and makeup home service, home spa, massage home service Dubai, home service nail salon spa,'
});
  }
  else{
    this.meta.updateTag({ 
      name: 'description',
      content: 'Mirrors Beauty Lounge is the best Ladies Salon in Dubai, We are Dubai based ladies beauty salon providing broad range of beauty services.'
  });
  this.meta.updateTag({ 
    name: 'keywords',
    content: 'beauty services at home, beauty parlour services at home, beauty salon home services, home service salon near me, beauty treatments at home Dubai, salon at home, salon services at home, facial at home, at home eyelash extensions, nails home service, manicure and pedicure at home service Dubai, at home nail service, keratin treatment at home, waxing service at home,  home hairdresser, home massage in Dubai, hair and makeup home service, home spa, massage home service Dubai, home service nail salon spa,'
});
  
    this.firstCatId=10;
    this.secondCatId=0;
    this.thirsdCatId=30;
    this.fourthCatId=3;
    this.fifthCatId=2;
    this.sixthCatId=9;
    this.seventhCatId=6;
    this.eightCatId=22;
    this.nineCatId=1;
  }
  this.GetHomePageOfferBanner();
  this.firstSubCategory(this.firstCatId,0);
  this.thirdSubCategory(this.thirsdCatId,0);
  this.fifthSubCategory(this.fifthCatId,0);
  this.seventhSubCategory(this.seventhCatId,0);
  }
  SearchService(){
   
    clearTimeout(parseInt(this.timeout));
    this.timeout = setTimeout(() => {
      
  this.sharedService.AddLog('home','search text '+this.txtSearch);
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
    this.route.navigate(['/search-service']);
  }
}
GetNearestSalon(){
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
this.locationBannerImage=this.locationList.filter((x:any)=>x.id==this.locationList[closest].id).map((y:any)=>y.banner)
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
  
  if(val==''){
    
    this.sharedService.Message('Please enter value','error');
   return;
  }
  else{
    let model={
      p_mobile:val
    }
  this.categoryService.Notify(model).subscribe((data:any)=>{
    this.txtMobileNo='';
  

    this.sharedService.Message(data[0].msg,'success');
    this.btnClosemobileapp.nativeElement.click();
    this.btnCloseMobileNo.nativeElement.click();
    this.btnCloseLaunchingSoon.nativeElement.click();

  });
}
}
GetLocationRedirection(){
 
  if(this.ls.getItem('LocationId')){
    
    this.route.navigate(['/category']);
   }
    else{
      this.route.navigate(['/location']);
    } 
  


  }
  GetSaloon(){
    debugger
    if(this.ls.getItem('LocationId')){
if(this.IsMobile){

  this.route.navigate(['/category']);
}
else{
  if(this.ls.getItem('LocationId')=='3'){
  
    this.btnLocation.nativeElement.click();
  }
  else{
    this.GetCategory('F');
    this.btnCategory.nativeElement.click();
  }
}
    }
    else{
      this.btnLocation.nativeElement.click();
    }
  }
  GetCategory(gender:any){
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
          
          
          this.catList=data.filter((x:any)=>x.status == 1&& x.id!=48 && x.gender==gender);
          this.loading=false;
          
    });
    }
    else{
      
      this.categoryService.GetHomeCategory().subscribe((data:any)=>{
        
        
        this.catList=data.filter((x:any)=>x.status == 1 && x.id!=50 );
        this.loading=false;
        
  });
    }
  }
  GetHomeCategory(){
    this.ls.setItem('LocationId',3);
    this.locationBannerImage=this.locationList.filter((x:any)=>x.id==3).map((y:any)=>y.banner)

    this.ls.setItem('LocationName','Home Service');
    this.ls.setItem('LocationAddress','Home Service');
    this.locationName=this.ls.getItem('LocationName');
this.locationAdd=this.ls.getItem('LocationAddress');
if(this.IsMobile){

  this.route.navigate(['/category']);
}
    this.GetCategory('F');
  }
  GetSubCategory(id:any,name:any,slug:any)
  {
    
       if(this.ls.getItem('LocationId')=='3'){
         if(id==35 || id==46){
           this.route.navigate(['/expert-consultation/'+slug]);
         }
         else{
         this.route.navigate(['/service-detail/'+slug]);
         }
   }
   else{
    
     if(id==30 || id==3){
       this.route.navigate(['/expert-consultation/'+slug]);
     }
     else{
     this.route.navigate(['/service-detail/'+slug]);
     }
   }
   this.ls.setItem('CatName',name);
   this.ls.setItem('CatId',id);
   
   }
   ComingSoon(img:any){
    
    this.txtMobileNo='';
    this.comingSoonImg=img;
   }
   getlogin(pageName:any){
    debugger
    this.sharedService.setLoginRedirect(pageName);
    if(this.SignUpClick){
      this.SignUpClick=false;
    }
    else{
      this.SignUpClick=true;
    }
    if(this.ls.getItem('customer')){
      this.route.navigate(['/account']); 
      this.IsLoggedIn = true;
    }
    else{

      this.IsLoggedIn = false;
      
    //this.SignUpClick=false;
      
      
    }
   }
   
   GetTermAndCondition(val:any){
    if(val=='term'){
      this.btntermsncondition.nativeElement.click();
    }
    if(val=='privacy'){
      this.btnprivacypolicy.nativeElement.click();
    }
    if(val=='cancellation'){
      this.btncancellationpolicy.nativeElement.click();
    }
    if(val=='safety'){
      this.btnsafety.nativeElement.click();
    }
  }
  SetLoginPage(pageName:any){
    debugger
    this.sharedService.setLoginRedirect(pageName);
  }
  SetMenSalon(){
    this.ls.setItem('LocationId',9);
    this.GetMenSalon();
  }
  GetMenSalon(){
if(this.ls.getItem('LocationId'))
    {
      if(this.ls.getItem('LocationId')=='9'){
        if(this.locationList.length>0){
          let location=   this.locationList.filter((x:any)=>x.id==9);
          this.locationBannerImage=location.map((y:any)=>y.banner)
         this.locationName=location.map((y:any)=>y.location_name);
         this.locationAdd=location.map((y:any)=>y.address);
         this.ls.setItem('LocationAddress',this.locationAdd);
         this.ls.setItem('LocationName', this.locationName);
           }
        let model={PageName:'Category',Title:'Salon for Men',IsSearch:false}
        this.sharedService.setPageName(model);
        this.categoryService.GetCategory().subscribe((data:any)=>{
              
              
          this.catList=data.filter((x:any)=>(x.status == 1)&& x.gender=='M');
          this.loading=false;
          
        this.btnCategory.nativeElement.click();
    });
      }
      else{
        this.btnmarina.nativeElement.click();
      }
    }
  }
  getSalonMenCategory(catId:any,subCatId:any,name:any,slug:any){
    debugger
    this.ls.setItem('LocationId',9);
    if(this.locationList.length>0){
   let location=   this.locationList.filter((x:any)=>x.id==9);
   this.locationBannerImage=location.map((y:any)=>y.banner)
  this.locationName=location.map((y:any)=>y.location_name);
  this.locationAdd=location.map((y:any)=>y.address);
  this.ls.setItem('LocationAddress',this.locationAdd);
  this.ls.setItem('LocationName', this.locationName);
    }
    this.getSubCategory(catId,subCatId,name,slug)
  }
  GetReview(){
    debugger
    if(this.locationList.length>0){
      let loct=this.locationList.filter((x:any)=>x.id==this.ls.getItem('LocationId')).map((y:any)=>y.google_review);
      window.location.href=loct[0];
    }
  }
  GetLog(val:any){
    this.sharedService.AddLog('home',val);
  }
}